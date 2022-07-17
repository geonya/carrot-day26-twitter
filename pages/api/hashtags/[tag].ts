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
        query: { tag },
        session: { user },
      } = req;
      if (typeof tag !== 'string') return;
      if (!user) return res.json({ ok: false, error: 'not authrized' });
      const hashtag = await client.hashTag.findUnique({
        where: {
          hashtag: tag,
        },
      });
      if (!hashtag)
        return res.json({
          ok: false,
          error: 'not found hashtag',
        });
      const tweets = await client.tweet.findMany({
        where: {
          hashtags: {
            some: {
              tag,
            },
          },
        },
        include: {
          user: true,
        },
      });
      if (tweets && tweets.length === 0) {
        return res.json({ ok: false, error: 'tweets not found' });
      }
      return res.json({ ok: true, tweets });
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
