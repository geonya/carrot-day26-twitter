import { Tweet } from '@prisma/client';
import { NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import client from '@libs/server/client';
import Layout from '@components/layout';
import Image from 'next/image';
import useMe from '@libs/client/useMe';
import { useForm } from 'react-hook-form';
import { useCallback, useRef } from 'react';
import useMutation from '@libs/client/useMutation';

interface GetTweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}
interface UploadTweetResponse {
  ok: boolean;
  error?: string;
  tweet?: Tweet;
}

interface TweetFormValue {
  tweetText: string;
}

const Main: NextPage = () => {
  const { data } = useSWR<GetTweetsResponse>('/api/tweets');
  const { myProfile } = useMe();
  const { register, handleSubmit, reset } = useForm<TweetFormValue>({
    mode: 'onChange',
  });
  const [uploadTweet, { loading }] =
    useMutation<UploadTweetResponse>('/api/tweets/write');
  const onValid = ({ tweetText }: TweetFormValue) => {
    if (loading) return;
    uploadTweet({
      tweetText,
    });
    reset();
  };
  // Text Area Auth Height
  const { ref, ...rest } = register('tweetText', {
    required: 'Need to Write!',
    maxLength: { value: 140, message: '140자까지만 작성 가능' },
  });
  const tweetTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleResizeHeight = useCallback(() => {
    if (!tweetTextAreaRef.current) return;
    tweetTextAreaRef.current.style.height = 'auto';
    tweetTextAreaRef.current.style.height =
      tweetTextAreaRef.current.scrollHeight + 'px';
  }, [tweetTextAreaRef]);
  //
  return (
    <Layout pageTitle='Main'>
      <div className='divide-zinc-700 divide-y-[1px]'>
        <div className='min-h-[200px] p-5 space-y-4'>
          <h1 className='font-bold text-xl'>Home</h1>
          <form className='w-full' onSubmit={handleSubmit(onValid)}>
            <div className='flex items-center space-x-4 mb-5'>
              <div>
                {!myProfile?.avatar ? (
                  <div className='w-12 h-12 bg-slate-400 rounded-full' />
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src={myProfile?.avatar as string}
                    className='w-12 h-12 bg-slate-400 rounded-full'
                  />
                )}
              </div>
              <textarea
                {...rest}
                className='text-xl bg-transparent w-full placeholder:text-zinc-500 resize-none'
                placeholder='무슨 일이 일어나고 있나요?'
                rows={1}
                maxLength={140}
                onInput={handleResizeHeight}
                ref={(e) => {
                  ref(e);
                  tweetTextAreaRef.current = e;
                }}
              />
            </div>
            <div className='w-full min-h-[50px] flex justify-between items-center'>
              <div className='space-x-3 text-blue-500 flex'>
                <svg
                  className='w-7 h-7 cursor-pointer'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  ></path>
                </svg>
                <svg
                  className='w-7 h-7 cursor-pointer'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <input
                className='bg-blue-500 px-3 py-1 rounded-full cursor-pointer'
                type='submit'
                value='Tweet'
              />
            </div>
          </form>
        </div>
        <div className=''>
          {data?.tweets.map((tweet, i) => (
            <div key={i}>
              <span>{tweet.tweetText}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
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
  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
  };
}

export default Page;
