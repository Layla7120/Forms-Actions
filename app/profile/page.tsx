import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  // user가 없을 경우
  notFound();
}
export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col p-24 items-center">
      <div className="border border-gray-600 rounded-md p-10 text-center grid gap-3">
        <h1 className="font-bold">Welcome!😊</h1>
        <p>Username : {user?.username}</p>
        <p>Email : {user?.email}</p>
      </div>
      <form className="rounded-full px-5 py-3 m-10 bg-gray-200" action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
