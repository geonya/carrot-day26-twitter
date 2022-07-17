import { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@components/Layout';
import { GetTweetsResponse } from 'types';
import WritingBox from '@components/WritingBox';
import TweetsListContainer from '@components/TweetsListContainer';

const Main: NextPage = () => {
  const { data } = useSWR<GetTweetsResponse>('/api/tweets');
  return (
    <Layout pageTitle='Home'>
      <div className='divide-zinc-700 divide-y-[1px]'>
        <div className='min-h-[200px]'>
          <h1 className='font-bold text-xl p-5'>Home</h1>
          {data && <WritingBox data={data} />}
        </div>
        {/* Load All Tweets */}
        {data && <TweetsListContainer tweets={data.tweets} />}
      </div>
    </Layout>
  );
};

// const Page: NextPage<{ tweets: Tweet[] }> = ({ tweets }) => {
//   return (
//     <SWRConfig
//       value={{
//         fallback: {
//           '/api/tweets': {
//             ok: true,
//             tweets,
//           },
//         },
//       }}
//     >
//       <Main />
//     </SWRConfig>
//   );
// };

// export async function getServerSideProps() {
//   const tweets = await client.tweet.findMany({});
//   return {
//     props: {
//       tweets: JSON.parse(JSON.stringify(tweets)),
//     },
//   };
// }

// export async function getStaticProps() {
//   console.log('building statically');
//   const tweets = await client.tweet.findMany({
//     include: { user: true },
//     orderBy: { createdAt: 'desc' },
//   });
//   return {
//     props: {
//       tweets: JSON.parse(JSON.stringify(tweets)),
//     },
//     revalidate: 10,
//   };
// }

export default Main;
