import { NextApiRequest, NextApiResponse } from 'next';
import { MutationResponseType } from 'types';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'POST') {
    try {
      const {
        query: { id },
        session: { user },
      } = req;
      const existingLike = await client.like.findFirst({
        where: {
          userId: user?.id,
          tweetId: +id,
        },
      });
      if (existingLike) {
        await client.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return res.json({ ok: true });
      }
      await client.like.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          tweet: {
            connect: {
              id: +id,
            },
          },
        },
      });
      const likeCount = await client.like.count({
        where: {
          tweetId: +id,
        },
      });
      await client.tweet.update({
        where: {
          id: +id,
        },
        data: {
          likeCount,
        },
      });
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
