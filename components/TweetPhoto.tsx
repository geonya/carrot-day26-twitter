import Image from 'next/image';

interface TweetPhotoProps {
  url: string;
}

export default function TweetPhoto({ url }: TweetPhotoProps) {
  return (
    <div className='w-full flex justify-center items-center rounded-lg overflow-hidden'>
      <Image
        className='rounded-2xl cursor-pointer object-cover'
        width={450}
        height={300}
        alt={url}
        src={url}
      />
    </div>
  );
}
