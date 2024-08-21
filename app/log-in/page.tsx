"use client";
import "@/lib/db";

import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import KeyIcon from "@heroicons/react/20/solid/KeyIcon";
import { useFormState } from "react-dom";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import { logIn } from "./action";
import FormButton from "../_component/form-btn";

export default function Login() {
  const [state, action] = useFormState(logIn, null);
  return (
    <main className="flex flex-col items-center justify-between px-24">
      <div className="w-96 flex-col justify-center">
        <div className="flex justify-center">
          <LockClosedIcon className="h-10 w-10 text-gray-500 m-8" />
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
          <FormButton text="Log in" />
          {state?.success ? (
            <div className="bg-green-500 rounded-2xl p-4 w-full my-4 text-white flex flex-cols">
              <CheckCircleIcon className="h-6 w-6 text-white mx-3" />
              Success
            </div>
          ) : null}
        </form>
      </div>
    </main>
  );
}
