import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import { MutationResponseType } from 'types';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'POST') {
    try {
      const {
        body: { keyword },
      } = req;
      if (!keyword)
        return res.json({
          ok: false,
          error: 'keyword is missing',
        });
      const searchedTweets = await client.tweet.findMany({
        where: {
          OR: [
            {
              tweetText: {
                startsWith: keyword,
              },
            },
            {
              tweetText: {
                contains: keyword,
              },
            },
            {
              tweetText: {
                endsWith: keyword,
              },
            },
            {
              user: {
                username: {
                  startsWith: keyword,
                },
              },
            },
            {
              user: {
                username: {
                  endsWith: keyword,
                },
              },
            },
            {
              user: {
                username: {
                  contains: keyword,
                },
              },
            },
          ],
        },
        include: {
          user: true,
        },
      });
      return res.json({ ok: true, searchedTweets });
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
