"use client";

import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LogInForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function LoginPage() {
  return (
    <AuthContainer bgColor="black" className="animate-bounce-to-center">
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Back to Landing Button in Top-Right */}
        <Link
          href="/"
          className="absolute -top-3 -left-2 xs:top-4 xs:left-4 inline-flex items-center text-sm text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>

        {/* Centered Login Form */}
        <div className="w-full flex flex-col gap-6 px-6 sm:gap-4 items-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            Login
          </h1>
          <p className="text-xs xs:text-sm text-gray-600 text-center">
            Welcome back! Please log in to your account.
          </p>

          <LoginForm />

          <p className="text-center text-black text-xs xs:text-base mt-6">
            Don’t have an account?{" "}
            <Link href="/signup">
              <span className="font-bold hover:underline">Sign Up.</span>
            </Link>
          </p>
        </div>
      </div>
    </AuthContainer>
  );
}
