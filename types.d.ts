import { Tweet } from '@prisma/client';

export interface MutationResponseType {
  ok: boolean;
  [key: string]: any;
}
export interface ITweet extends Tweet {
  user?: User;
}
export interface TweetFormValue {
  file?: FileList;
  tweetText: string;
}

export interface GetTweetsResponse {
  ok: boolean;
  tweets: ITweet[];
}
