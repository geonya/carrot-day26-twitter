import Head from 'next/head';

interface LayoutProps {
  pageTitle?: string;
  children: React.ReactNode;
}

export default function Layout({ pageTitle, children }: LayoutProps) {
  return (
    <div className='w-full h-screen bg-black text-white grid sm:grid-cols-[1fr_1.5fr_1fr] divide-zinc-700 divide-x-[1px]'>
      <Head>
        <title>당근 트위터</title>
      </Head>
      <div className=' sm:block hidden shrink h-screen'></div>
      <div className=' min-w-[640px] shrink-0 h-screen'>{children}</div>
      <div className='sm:block hidden shrink h-screen'></div>
      <div></div>
    </div>
  );
}
