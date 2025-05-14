"use client";

import AuthContainer from "@/components/Auth/AuthContainer";
import RecoverAccountForm from "@/components/Auth/RecoverAccountForm";
import Link from "next/link";

export default function RecoverAccountPage() {
  return (
    <AuthContainer bgColor="black">
      <div className="w-full h-full flex flex-col mt-8 px-6 pb-6 items-center">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            Find your account
          </h1>
          <p className="text-gray-600 sm:text-xl">
            Please enter your email to search for your account.
          </p>
        </div>

        <div className="w-full h-full flex flex-col">
          <RecoverAccountForm />
        </div>
      </div>
    </AuthContainer>
  );
}
