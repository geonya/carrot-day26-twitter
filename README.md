# carrot-day26-twitter

After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.

/tweet/[id]:
The user should be able to see the tweet + a Like button.

When the Like button is pressed, save the like on the database and reflect the update using mutate from useSWR.

참고사항
Prisma is configured in the blueprint with SQLite.
When you modify your prisma.schema run npm run db-sync.
SWR and Tailwind are also configured in the blueprint.
