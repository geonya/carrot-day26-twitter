import { Tweet } from '@prisma/client';

export interface MutationResponseType {
  ok: boolean;
  [key: string]: any;
}
export interface ITweet extends Tweet {
  user?: User;
}
