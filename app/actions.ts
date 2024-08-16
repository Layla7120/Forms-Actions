"use server";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@zod.com/, "Only @zod.com is available"),
  username: z.string().min(5),
  password: z
    .string()
    .min(10)
    .regex(/\d/, "At least 1 number should be included"),
});
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
