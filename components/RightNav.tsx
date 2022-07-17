import { HashTag } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';

interface IHashTag extends HashTag {
  _count: {
    tweets: number;
  };
}

interface GetHashTagsResponse {
  ok: boolean;
  error?: string;
  hashtags?: IHashTag[];
}

export default function RightNav() {
  const { data } = useSWR<GetHashTagsResponse>('/api/hashtags');
  console.log(data);
  return (
    <nav className='w-full flex justify-start items-center h-full'>
      <ul className='flex flex-col items-center space-y-8 w-1/2'>
        {data &&
          data.hashtags &&
          data.hashtags.map((hashtag, i) => (
            <Link href={`/hashtags/${hashtag.tag}`} key={i}>
              <li className='px-5 py-2 justify-center flex items-center space-x-3 cursor-pointer border border-transparent hover:border hover:border-zinc-700 hover:rounded-full'>
                <span className='text-xl font-semibold'>
                  #{hashtag.tag} ({hashtag._count.tweets})
                </span>
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
}
