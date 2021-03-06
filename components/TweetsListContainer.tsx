import TweetBox from '@components/TweetBox';
import {
  childrenVariants,
  containerVariants,
} from '@libs/client/animataionVariants';
import { motion } from 'framer-motion';
import { ITweet } from 'types';

interface TweetsListContainerProps {
  tweets: ITweet[];
}

export default function TweetsListContainer({
  tweets,
}: TweetsListContainerProps) {
  return (
    <motion.div
      className='divide-zinc-700 divide-y-[1px]'
      variants={containerVariants}
      initial='start'
      animate='end'
    >
      {tweets &&
        tweets.map((tweet, i) => (
          <motion.div key={i} variants={childrenVariants}>
            <TweetBox {...tweet} />
          </motion.div>
        ))}
    </motion.div>
  );
}
