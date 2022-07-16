import { Tweet, User } from '@prisma/client';
import { NextPage } from 'next';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import Layout from '@components/layout';
import Image from 'next/image';
import useMe from '@libs/client/useMe';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import client from '@libs/server/client';
import axios from 'axios';
import { BUCKET_URL } from 'constant';

interface ITweet extends Tweet {
  user?: User;
}

interface GetTweetsResponse {
  ok: boolean;
  tweets: ITweet[];
}
interface UploadTweetResponse {
  ok: boolean;
  error?: string;
  tweet?: ITweet;
}

interface TweetFormValue {
  file: FileList;
  tweetText: string;
}

const Main: NextPage = () => {
  const { mutate } = useSWRConfig();
  const { data } = useSWR<GetTweetsResponse>('/api/tweets');

  const { myProfile } = useMe();
  const { register, handleSubmit, reset, getValues, watch } =
    useForm<TweetFormValue>({
      mode: 'onChange',
    });
  const fileWatch = watch('file');

  const [uploadPhoto, setUploadPhoto] = useState('');

  useEffect(() => {
    if (fileWatch && fileWatch.length > 0) {
      const photoObj = fileWatch[0];
      setUploadPhoto(URL.createObjectURL(photoObj));
    }
  }, [fileWatch]);
  const [uploadTweet, { loading }] =
    useMutation<UploadTweetResponse>('/api/tweets');

  const onValid = async ({ tweetText }: TweetFormValue) => {
    if (loading) return;
    mutate(
      '/api/tweets',
      {
        ...data,
        tweets: [
          {
            tweetText,
            photo: uploadPhoto,
            user: {
              id: myProfile?.id,
              username: myProfile?.username,
              avatar: myProfile?.avatar,
            },
          },
          ...data?.tweets!,
        ],
      },
      false
    );
    if (fileWatch && fileWatch.length > 0) {
      const file = fileWatch[0];
      const {
        data: { url, objectName },
      } = await axios.post('/api/upload', {
        name: file.name,
        type: file.type,
      });
      await axios.put(url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      });
      const photoUrl = BUCKET_URL + objectName;
      uploadTweet({
        tweetText,
        photo: photoUrl,
      });
    } else {
      uploadTweet({
        tweetText,
      });
    }
    setUploadPhoto('');
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

  return (
    <Layout pageTitle='Home'>
      <div className='divide-zinc-700 divide-y-[1px] p-1'>
        <div className='min-h-[200px]'>
          <h1 className='font-bold text-xl p-5'>Home</h1>
          <form
            className='w-full grid grid-cols-[1fr_10fr] gap-4 p-6'
            onSubmit={handleSubmit(onValid)}
          >
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
            <div className='w-full'>
              <div className='flex items-center mb-5'>
                <textarea
                  {...rest}
                  className='text-xl bg-transparent w-[95%] placeholder:text-zinc-500 resize-none p-2 ml-1'
                  placeholder='무슨 일이 일어나고 있나요?'
                  rows={1}
                  maxLength={140}
                  onInput={handleResizeHeight}
                  ref={(e) => {
                    ref(e);
                    tweetTextAreaRef.current = e;
                  }}
                  onKeyDown={async (e) => {
                    if (e.code === 'Enter') {
                      e.preventDefault();
                      const tweetText = getValues('tweetText');
                      if (loading) return;
                      mutate(
                        '/api/tweets',
                        {
                          ...data,
                          tweets: [
                            {
                              tweetText,
                              photo: uploadPhoto,
                              user: {
                                id: myProfile?.id,
                                username: myProfile?.username,
                                avatar: myProfile?.avatar,
                              },
                            },
                            ...data?.tweets!,
                          ],
                        },
                        false
                      );
                      if (fileWatch && fileWatch.length > 0) {
                        const file = fileWatch[0];
                        const {
                          data: { url },
                        } = await axios.post('/api/upload', {
                          name: file.name,
                          type: file.type,
                        });
                        await axios.put(url, file, {
                          headers: {
                            'Content-type': file.type,
                            'Access-Control-Allow-Origin': '*',
                          },
                        });
                        uploadTweet({
                          tweetText,
                          photo: url,
                        });
                      } else {
                        uploadTweet({
                          tweetText,
                        });
                      }
                      setUploadPhoto('');
                      reset();
                    }
                  }}
                />
              </div>
              {uploadPhoto !== '' ? (
                <Image
                  src={uploadPhoto}
                  width={450}
                  height={300}
                  className='w-[90%] h-80 bg-blue-500 rounded-2xl'
                />
              ) : null}
              <div className='mt-1 w-full min-h-[50px] flex justify-between items-center '>
                <div className='space-x-3 text-blue-500 flex'>
                  <label>
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
                    <input
                      type='file'
                      accept='image/*'
                      {...register('file')}
                      className='hidden'
                    />
                  </label>
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
            </div>
          </form>
        </div>
        {/* Load All Tweets */}
        <div className='divide-zinc-700 divide-y-[1px]'>
          {data?.tweets.map((tweet, i) => (
            <div key={i} className='grid grid-cols-[1fr_10fr] p-6 gap-4'>
              <div>
                {!tweet.user?.avatar ? (
                  <div className='w-12 h-12 bg-slate-400 rounded-full' />
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src={tweet.user?.avatar}
                    className='w-12 h-12 bg-slate-400 rounded-full'
                  />
                )}
              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-2'>
                  <h4 className='font-bold text-lg'>@{tweet.user?.username}</h4>
                  <span className='font-thin text-zinc-400 text-sm'>
                    {tweet.createdAt
                      ? String(tweet.createdAt)?.substring(0, 10)
                      : 'Now'}
                  </span>
                </div>
                <div className='mb-5'>
                  <span className='text-md'>{tweet.tweetText}</span>
                </div>
                {tweet.photo ? (
                  <Image
                    width={450}
                    height={300}
                    src={tweet.photo}
                    className='rounded-2xl'
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

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

// export async function getServerSideProps() {
//   const tweets = await client.tweet.findMany({});
//   return {
//     props: {
//       tweets: JSON.parse(JSON.stringify(tweets)),
//     },
//   };
// }

export async function getStaticProps() {
  console.log('building statically');
  const tweets = await client.tweet.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
    revalidate: 10,
  };
}

export default Page;
