import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  pageTitle?: string;
  children: React.ReactNode;
}

export default function Layout({ pageTitle, children }: LayoutProps) {
  return (
    <div className='text-zinc-200 grid sm:grid-cols-[1fr_1fr_1fr] divide-zinc-700 divide-x-[1px] '>
      <Head>
        <title>
          {pageTitle ? `${pageTitle} | 당근 트위터` : '당근 트위터'}
        </title>
      </Head>
      <div className='sm:block hidden shrink px-16'>
        <nav className='w-full flex justify-end items-center h-full'>
          <ul className='flex flex-col space-y-8'>
            <Link href={'/'}>
              <a>
                <li className='flex items-center space-x-3'>
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
              </a>
            </Link>
            <Link href={'/search'}>
              <a>
                <li className='flex items-center space-x-3'>
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
              </a>
            </Link>
            <Link href={'/profile'}>
              <a>
                <li className='flex items-center space-x-3'>
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
              </a>
            </Link>
            <Link href={'/'}>
              <a>
                <li className='px-7 py-2 bg-blue-500 text-whiter rounded-full text-center'>
                  <span className='text-lg font-semibold'>Log Out</span>
                </li>
              </a>
            </Link>
          </ul>
        </nav>
      </div>
      <div className=' min-w-[640px] shrink-0 h-screen overflow-scroll'>
        {children}
      </div>
      <div className='sm:block hidden shrink'></div>
      <div></div>
    </div>
  );
}
