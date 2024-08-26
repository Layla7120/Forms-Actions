import { uploadTweet } from "../actions";
import Input from "./input";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Button from "./button";

export default function AddTweet() {
  // const [preview, setPreview] = useState("");
  // const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { files },
  //   } = event;
  //   if (!files) {
  //     return;
  //   }
  //   const file = files[0];
  //   const url = URL.createObjectURL(file);
  //   setPreview(url);
  // };
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div className="rounded-md border border-gray-400 p-5 min-w-44 flex flex-col">
      <h1 className="font-bold text-center text-lg">Add Tweet</h1>
      <form action={action} className="p-5 grid gap-5 w-full">
        <Input name="title" required placeholder="제목" type="text" />
        <textarea
          className="w-full h-full p-4 rounded-md ring-2 focus:ring-4 focus:outline-none transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 text-wrap"
          name="description"
          required
          placeholder="내용"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
