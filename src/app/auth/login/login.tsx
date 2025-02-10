"use client";

import Button from "@/components/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Handle authentication logic here
  };

  return (
    <div className="">
      <h1 className="text-8xl font-extrabold text-center text-black">Login</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col mt-4 gap-5 justify-center items-center"
      >
        <BaseFormInput
          label="Email"
          id="email-login"
          color="black"
          type="email"
        />
        <BaseFormInput
          label="Password"
          id="pw-login"
          color="black"
          type="password"
        />
        <Button text="LOGIN" type="submit" color="black" textColor="white" />
      </form>
    </div>
  );
}
