"use client";
import React from "react";

interface SignUpPageProps {
  onChoose: (type: "lawyer" | "layman") => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onChoose }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[40vw] text-black">
        <h1 className="text-[50px] font-black tracking-tight mt-1">Sign Up</h1>
        <p className="mb-6">
          Before proceeding, please choose between the two options below.
        </p>

        <div className="space-y-4 text-white">
          <button
            onClick={() => onChoose("lawyer")}
            className="w-full bg-indigo-900 py-4 rounded-lg flex items-center justify-between px-6"
          >
            <div className="flex flex-col items-start text-[3vh]">
              <span className="font-semibold">I am a lawyer</span>
              <p className="text-[1.5vh] italic text-left">
                I want to help people with regards to legal matters.
              </p>
            </div>
            <span className="text-xl text-[5vh]">→</span>
          </button>

          <button
            onClick={() => onChoose("layman")}
            className="w-full bg-red py-4 rounded-lg flex items-center justify-between px-6"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-[3vh]">
                I am not a lawyer (layman)
              </span>
              <p className="text-[1.5vh] italic text-left">
                I would like to seek guidance/advice from lawyers regarding
                various concerns and problems.
              </p>
            </div>

            <span className="text-xl text-[5vh]">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
