"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@zod.com/, "Only @zod.com is available"),
  username: z
    .string()
    .min(5)
    .refine(checkUniqueUsername, "Username already taken"),
  password: z
    .string()
    .min(10)
    .regex(/\d/, "At least 1 number should be included"),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getIronSession(cookies(), {
      cookieName: "delicious-carrot",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();
  }
}
export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  console.log("result", result);
  if (!result.success) {
    const formatted = result.error?.format();
    console.log(formatted, result.error);
    return {
      success: result.success,
      error: result.error.flatten(),
    };
  } else {
    return {
      success: result.success,
      error: undefined,
    };
  }
}
