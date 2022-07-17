# carrot-day26-twitter

이때까지 배운 것을 토대로, 미니 트위터 클론을 완성합니다.
NextJS, Prisma, Tailwind, API Routes 그리고 SWR 를 활용하여 아래 페이지를 완성합니다.
/: Logged In ? Home Page otherwise redirect to Create Account / Log in
/create-account: Create Account
/log-in: Log In
/tweet/[id]: See one Tweet
/:
After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.

/tweet/[id]:
The user should be able to see the tweet + a Like button.

When the Like button is pressed, save the like on the database and reflect the update using mutate from useSWR.

참고사항
Prisma is configured in the blueprint with SQLite.
When you modify your prisma.schema run npm run db-sync.
SWR and Tailwind are also configured in the blueprint.

- [x] like count bug fix cache data modify error
- [ ] Tweet 작성창 모달창 만들기
- [ ] 사진 확대 기능
- [ ] Upload 시 like count NaN Bug Fix
- [ ] 카테고리 섹션 만들기
- [ ] 전체 폰트 spoqa 로 변경
- [ ] 이모지 모달 기능
- [ ] framer 로 animation 만들기
- [ ] 댓글 기능 도입
