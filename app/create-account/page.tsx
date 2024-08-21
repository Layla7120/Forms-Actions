"use client";

import "@/lib/db";

import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import UserIcon from "@heroicons/react/20/solid/UserIcon";
import KeyIcon from "@heroicons/react/20/solid/KeyIcon";
import { useFormState } from "react-dom";
import FormButton from "../_component/form-btn";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="w-96 flex-col justify-center">
        <div className="flex justify-center">
          <UserCircleIcon className="h-10 w-10 text-gray-500" />
        </div>
        <form action={action}>
          <div className="border border-gray-500 rounded-3xl px-5 py-3 my-4 flex flex-row">
            <EnvelopeIcon className="login-icon" />
            <input
              className="mx-2 bg-inherit text-left w-full px-1"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <span className="text-red-500 font-medium">
            {state?.error?.fieldErrors?.email
              ? state.error.fieldErrors.email.map(error => {
                  return <div key="{error}">{error}</div>;
                })
              : null}
          </span>
          <div className="border border-gray-500 rounded-3xl px-5 py-3 my-4 flex flex-row">
            <UserIcon className="login-icon" />
            <input
              className="mx-2 bg-inherit text-left w-full px-1"
              type="text"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <span className="text-red-500 font-medium">
            {state?.error?.fieldErrors.username
              ? state?.error?.fieldErrors.username.map(error => {
                  return <div key="{error}">{error}</div>;
                })
              : null}
          </span>
          <div className="border border-gray-500 rounded-3xl px-5 py-3 my-4 flex flex-row">
            <KeyIcon className="login-icon" />
            <input
              className="mx-2 bg-inherit text-left w-full px-1"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <span className="text-red-500 font-medium">
            {state?.error?.fieldErrors.password
              ? state?.error?.fieldErrors.password.map(error => {
                  return <div key="{error}">{error}</div>;
                })
              : null}
          </span>
          <FormButton text="Create!" />
        </form>
      </div>
    </main>
  );
}
