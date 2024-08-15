"use server";

import { Elsie_Swash_Caps } from "next/font/google";

export async function handleForm(prevState: any, formData: FormData) {
  "use server";
  console.log(formData.get("email"));
  const password = formData.get("password");
  if (password == "12345") {
    return {
      result: "success",
    };
  } else {
    return {
      error: "Wrong Password",
    };
  }
}
