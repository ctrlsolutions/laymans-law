"use client";

import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LogInForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthContainer bgColor="black">
      <div className="h-fit w-full flex flex-col gap-6 my-8 px-6 sm:gap-4 items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
          Login
        </h1>
        <p className="text-gray-600 sm:text-xl text-center">
          Welcome back! Please log in to your account.
        </p>

        <LoginForm />

        <p className="text-center text-black text-base mt-6">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="font-bold hover:underline">Sign Up.</span>
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}
