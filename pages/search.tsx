import Layout from '@components/Layout';
import TweetBox from '@components/TweetBox';
import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ITweet } from 'types';

interface SearchFormValue {
  keyword: string;
}

interface GetSearchResponse {
  ok: boolean;
  searchedTweets: ITweet[];
}

const Search: NextPage = () => {
  const [tweets, setTweets] = useState<ITweet[] | null>(null);
  const [searchMutate, { data }] =
    useMutation<GetSearchResponse>('/api/search');
  const { register, handleSubmit, reset } = useForm<SearchFormValue>();
  const onValid = async ({ keyword }: SearchFormValue) => {
    searchMutate({
      keyword,
    });
    reset();
  };
  useEffect(() => {
    if (data?.ok) {
      setTweets(data.searchedTweets);
    }
  }, [data]);
  return (
    <Layout pageTitle='Search'>
      <div className='divide-zinc-700 divide-y-[1px]'>
        <div className='min-h-[150px]'>
          <h1 className='font-bold text-xl p-5'>Search</h1>
          <form
            className='w-full flex justify-center'
            onSubmit={handleSubmit(onValid)}
          >
            <input
              type='text'
              className='text-xl bg-transparent w-[80%] placeholder:text-zinc-500 p-2 ml-1 border-[1px] border-zinc-700 rounded-full text-center'
              {...register('keyword', { required: '검색어를 입력해주세요.' })}
              placeholder='검색어를 입력해주세요'
            />
          </form>
        </div>
        <div className='divide-zinc-700 divide-y-[1px] '>
          {tweets && tweets.map((tweet, i) => <TweetBox key={i} {...tweet} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Search;