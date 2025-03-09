"use client"; // Required for using hooks in Next.js App Router

import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("/auth_bg.png")` }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <p className="text-gray-600 mb-6">
          Before proceeding, please choose between the two options below.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/auth/signup/lawyer")}
            className="w-full bg-red text-white py-4 rounded-lg flex items-center justify-between px-6"
          >
            <span className="font-semibold">I am a lawyer</span>
            <span className="text-xl">→</span>
          </button>
          <p className="text-sm text-gray-500 italic">
            I want to help people with regards to legal matters.
          </p>

          <button
            onClick={() => router.push("/auth/signup/layman")}
            className="w-full bg-indigo-900 text-white py-4 rounded-lg flex items-center justify-between px-6"
          >
            <span className="font-semibold">I am not a lawyer (layman)</span>
            <span className="text-xl">→</span>
          </button>
          <p className="text-sm text-gray-500 italic">
            I would like to seek guidance/advice from lawyers regarding various concerns and problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
