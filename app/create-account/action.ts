"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .regex(/@zod.com/, "Only @zod.com is available"),
    username: z.string().min(USERNAME_MIN_LENGTH),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      success: result.success,
      error: result.error.flatten(),
    };
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
    console.log(user);
    const cookie = await getIronSession(cookies(), {
      cookieName: "delicious-carrot",
      password: process.env.COOKIE_PASSWORD!,
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
