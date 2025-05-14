"use client";

import AuthContainer from "@/components/Auth/AuthContainer";
import SecurityCodeForm from "@/components/Auth/SecurityCodeForm";
import Link from "next/link";

export default function RecoverAccountPage() {
  return (
    <AuthContainer bgColor="black">
      <div className="w-full h-full flex flex-col justify-between my-8 px-6 items-center">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            Enter Security Code 
          </h1>
          <p className="text-gray-600 sm:text-xl">
          Please check your email for a message with your code. Your code is 6 characters long.
          </p>
        </div>

        <div className="w-full h-full flex-1">
          <SecurityCodeForm />
        </div>
      </div>
    </AuthContainer>
  );
}
