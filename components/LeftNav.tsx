import useMe from '@libs/client/useMe';
import useMutation from '@libs/client/useMutation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetTweetsResponse } from 'types';
import { AnimatePresence, motion } from 'framer-motion';
import WritingBox from '@components/WritingBox';

interface LeftNavProps {
  data?: GetTweetsResponse;
}

export default function LeftNav({ data }: LeftNavProps) {
  const router = useRouter();
  const myData = useMe();
  const [logout, { data: logoutData }] = useMutation(`/api/users/log-out`);
  const [writingModal, setWritingModal] = useState(false);
  useEffect(() => {
    if (data?.ok) {
      router.push('/log-in');
    }
  }, [logoutData]);
  return (
    <nav className='w-full flex justify-end items-center h-full'>
      <ul className='flex flex-col items-center space-y-8 w-1/2'>
        <Link href={'/'}>
          <li className='px-5 py-2 justify-center flex items-center space-x-3 cursor-pointer border border-transparent hover:border hover:border-zinc-700 hover:rounded-full'>
            <svg
              className='w-9 h-9'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
            </svg>
            <span className='text-xl font-semibold'>Home</span>
          </li>
        </Link>
        <Link href={'/search'}>
          <li className='px-5 py-2 justify-center flex items-center space-x-3 cursor-pointer border border-transparent hover:border hover:border-zinc-700 hover:rounded-full'>
            <svg
              className='w-9 h-9'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
            <span className='text-xl font-semibold'>Search</span>
          </li>
        </Link>
        <Link href={`/users/${myData.myProfile?.username}`}>
          <li className='px-5 py-2 flex justify-center items-center space-x-3 cursor-pointer border border-transparent hover:border hover:border-zinc-700 hover:rounded-full'>
            <svg
              className='w-9 h-9'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span className='text-xl font-semibold'>Profile</span>
          </li>
        </Link>
        <li
          className='w-36 py-2 bg-blue-500 rounded-full text-center cursor-pointer'
          onClick={() => setWritingModal(true)}
        >
          <span className='text-md font-semibold'>Tweet</span>
        </li>
        <AnimatePresence>
          {writingModal && (
            <div className='absolute left-0 -top-10 w-full h-full z-10 flex items-center justify-center'>
              <motion.div
                onClick={() => setWritingModal(false)}
                className='absolute left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] z-20'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: 'tween' },
                }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className='absolute z-30 px-2 py-5 rounded-xl bg-zinc-900'
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: 'tween' },
                }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <WritingBox data={data} setWritingModal={setWritingModal} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <li
          className='w-36 py-2 border-2 border-blue-500 rounded-full text-center cursor-pointer'
          onClick={() => logout({})}
        >
          <span className='text-blue-500 text-md font-semibold'>Log Out</span>
        </li>
      </ul>
    </nav>
  );
}
