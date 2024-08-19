import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  // const user_add = await db.user.create({
  //   data: {
  //     username: "gidong",
  //   },
  // });
  // const tweet_add = await db.tweet.create({
  //   data: {
  //     tweet: 4,
  //   },
  // });

  const like_add = await db.like.create({
    data: {
      user: {
        connect: {
          id: 2,
        },
      },
      tweet: {
        connect: {
          tweet: 3,
        },
      },
    },
  });
  console.log(like_add);
}

test();
export default db;
