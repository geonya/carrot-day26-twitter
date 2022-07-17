import TweetBox from '@components/TweetBox';
import { motion, type Variants } from 'framer-motion';
import { ITweet } from 'types';

interface TweetsListContainerProps {
  tweets: ITweet[];
}

export default function TweetsListContainer({
  tweets,
}: TweetsListContainerProps) {
  const containerVariants: Variants = {
    start: {
      opacity: 0,
      scale: 0,
    },
    end: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3,
        delayChildren: 0.3,
        staggerChildren: 0.5,
      },
    },
  };

  const tweetVariants: Variants = {
    start: {
      opacity: 0,
      y: 30,
    },
    end: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      className='divide-zinc-700 divide-y-[1px]'
      variants={containerVariants}
      initial='start'
      animate='end'
    >
      {tweets &&
        tweets.map((tweet, i) => (
          <motion.div key={i} variants={tweetVariants}>
            <TweetBox {...tweet} />
          </motion.div>
        ))}
    </motion.div>
  );
}
