import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import withHandler from '@libs/server/withHandler';
import { MutationResponseType } from 'types';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutationResponseType>
) {
  if (req.method === 'POST') {
    try {
      await req.session.destroy();
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, error: 'Logout Error' });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
