import Layout from '@components/Layout';
import NotFound from '@components/NotFound';
import TweetsListContainer from '@components/TweetsListContainer';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ITweet } from 'types';

interface GetHastagResponse {
  ok: boolean;
  error?: string;
  tweets?: ITweet[];
}

const HashTagPage: NextPage = () => {
  const router = useRouter();
  const tag = router.query?.tag as string;
  const { data } = useSWR<GetHastagResponse>(`/api/hashtags/${tag}`);
  return tag ? (
    <Layout pageTitle={tag}>
      {data && data.tweets && <TweetsListContainer tweets={data.tweets} />}
    </Layout>
  ) : (
    <NotFound />
  );
};

export default HashTagPage;
