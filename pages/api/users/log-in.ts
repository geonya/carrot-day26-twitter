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
  if (req.method === 'POST') {
    try {
      const {
        body: { username, password },
      } = req;
      console.log(username, password);
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return res.json({ ok: false, error: 'User not found' });
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return res.json({ ok: false, error: 'Wrong Passwrod' });
      }
      req.session.user = {
        id: user.id,
      };
      await req.session.save();
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error: 'Login Error' });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
