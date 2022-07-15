import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';
import { MutationResponseType } from 'types';
import bcrypt from 'bcrypt';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'GET') {
    const users = await client.user.findMany({});
    return res.json({ ok: true, users });
  }
  if (req.method === 'POST') {
    try {
      const {
        body: { username, password, email },
      } = req;
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username, email }],
        },
      });
      if (existingUser) {
        return res.json({ ok: false, error: 'User is Already Exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({
        ok: false,
        error: "Can't Create Account",
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: false })
);
