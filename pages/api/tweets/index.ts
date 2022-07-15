import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import { MutationResponseType } from 'types';
import client from '@libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'GET') {
    const tweets = await client.tweet.findMany({});
    return res.json({
      ok: true,
      tweets,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
