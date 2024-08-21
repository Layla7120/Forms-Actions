"use client";
import "@/lib/db";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Login from "./log-in/page";
import Link from "next/link";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Login />
      <div className="border border-gray-400 w-96 m-10" />
      <Link
        className="px-10 py-2 rounded-full bg-slate-200 font-bold"
        href={"/create-account "}
      >
        Create Account
      </Link>
    </main>
  );
}
