-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tweetText" TEXT NOT NULL,
    "photo" TEXT,
    "userId" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "reTweetCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HashTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "tweetId" INTEGER NOT NULL,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FollowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FollowRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FollowRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_HashTagToTweet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HashTagToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "HashTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HashTagToTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "HashTag_tag_key" ON "HashTag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRelation_AB_unique" ON "_FollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRelation_B_index" ON "_FollowRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashTagToTweet_AB_unique" ON "_HashTagToTweet"("A", "B");

-- CreateIndex
CREATE INDEX "_HashTagToTweet_B_index" ON "_HashTagToTweet"("B");
