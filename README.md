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

- [x] Wrting Box Refactoring
- [x] Tweet 작성창 모달창 만들기
  - [x] X 버튼 만들기
- [x] 사진 확대 기능
- [x] Upload 시 like count NaN Bug Fix
- [x] hashtag 섹션 만들기
- [x] 전체 폰트 spoqa 로 변경 CDN
- [ ] tweet 작성시 hashtag 도 mutation
- [ ] db planet scale 로 연동하기
- [x] framer 로 animation 만들기
- [ ] Comment 기능
- [ ] Edit 기능
- [x] log-out broken function fix : route error fix
