import LeftNav from '@components/LeftNav';
import RightNav from '@components/RightNav';
import Head from 'next/head';

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
      <div className='sm:block hidden px-16'>
        <LeftNav />
      </div>
      <div className='min-w-[375px] h-screen overflow-scroll'>{children}</div>
      <div className='sm:block hidden'>
        <RightNav />
      </div>
    </div>
  );
}
