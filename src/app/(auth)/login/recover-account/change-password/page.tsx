"use client";

import AuthContainer from "@/components/Auth/AuthContainer";
import ChangePasswordForm from "@/components/Auth/ChangePasswordForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"; 

export default function ChangePasswordPage() {
  return (
    <AuthContainer bgColor="black">
      <div className="relative h-full w-full flex items-center justify-center pb-16">
        <Link
          href="/login/recover-account"
          className="absolute top-6 left-6 inline-flex items-center text-sm text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        
        <div className="w-full flex flex-col gap-6 px-6 sm:gap-4 items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            Reset Password
          </h1>
          <p className="text-gray-600 sm:text-xl text-center">
            Yey! You can create a new password.
          </p>

          <ChangePasswordForm />
        </div>
      </div>
    </AuthContainer>
  );
}



