import { NextApiRequest, NextApiResponse } from 'next';
import { MutationResponseType } from 'types';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'GET') {
    try {
      const {
        query: { id },
        session: { user },
      } = req;
      const tweet = await client.tweet.findUnique({
        where: {
          id: parseInt(id.toString()),
        },
        include: {
          user: true,
        },
      });
      const isLiked = Boolean(
        await client.like.findFirst({
          where: {
            userId: user?.id,
            tweetId: parseInt(id.toString()),
          },
        })
      );
      return res.json({ ok: true, tweet, isLiked });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
