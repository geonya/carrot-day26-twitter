import Layout from '@components/Layout';
import TweetBox from '@components/TweetBox';
import { Tweet } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface GetTweetProps {
  ok: boolean;
  tweet: Tweet;
  isLiked: boolean;
}

export default function TweetPage() {
  const router = useRouter();
  const { data } = useSWR<GetTweetProps>(`/api/tweets/${router.query.id}`);
  return (
    <Layout pageTitle='Tweet'>{data && <TweetBox {...data.tweet} />}</Layout>
  );
}
