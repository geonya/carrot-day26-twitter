import Image from 'next/image';

interface AvatarProps {
  url: string;
}

export default function Avatar({ url }: AvatarProps) {
  return (
    <Image
      width={50}
      height={50}
      src={url}
      className='w-12 h-12 bg-slate-400 rounded-full'
    />
  );
}
