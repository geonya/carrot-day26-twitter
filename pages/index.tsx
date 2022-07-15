import { Tweet } from '@prisma/client';
import { NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import client from '../lib/server/client';

interface TweetResponse {
  ok: boolean;
  tweets: Tweet[];
}

const Main: NextPage = () => {
  const { data } = useSWR<TweetResponse>('/api/tweets');
  console.log(data);
  return <div>Main</div>;
};
// SSR + SWR
const Page: NextPage<{ tweets: Tweet[] }> = ({ tweets }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/tweets': {
            ok: true,
            tweets,
          },
        },
      }}
    >
      <Main />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const tweets = await client.tweet.findMany({});
  console.log('tweets', tweets);
  return {
    props: {
      tweets: [],
    },
  };
}

export default Page;
