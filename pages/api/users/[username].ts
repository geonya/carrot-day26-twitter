import { NextApiRequest, NextApiResponse } from 'next';
import { MutationResponseType } from 'types';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';
import bcrypt from 'bcrypt';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'GET') {
    const {
      query: { username },
    } = req;
    try {
      if (!username) return res.json({ ok: false, error: 'path error' });
      const user = await client.user.findUnique({
        where: { username: username.toString() },
      });
      return res.json({ ok: true, user });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error: 'User not found' });
    }
  }
  if (req.method === 'POST') {
    const {
      body: { password, bio, avatar },
      session: { user },
    } = req;
    try {
      if (!user) {
        return res.json({ ok: false, error: 'Not authorized' });
      }
      const foundUser = await client.user.findUnique({
        where: { id: +user.id.toString() },
      });
      if (!foundUser) {
        return res.json({ ok: false, error: 'User not found' });
      }
      if (avatar) {
        await client.user.update({
          where: {
            id: +user.id.toString(),
          },
          data: {
            avatar,
          },
        });
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.update({
          where: {
            id: +user.id.toString(),
          },
          data: {
            password: hashedPassword,
          },
        });
      }
      if (bio) {
        await client.user.update({
          where: {
            id: +user.id.toString(),
          },
          data: {
            bio,
          },
        });
      }
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error: 'User not found' });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
