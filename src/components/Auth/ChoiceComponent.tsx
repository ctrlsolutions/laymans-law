"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
interface SignUpPageProps {
  onChoose: (type: "lawyer" | "layman") => void;
}
const SignUpPage: React.FC<SignUpPageProps> = ({ onChoose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const handleChoose = (type: "lawyer" | "layman") => {
    setIsExiting(true);
    setTimeout(() => {
      onChoose(type);
    }, 300);
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover animate-bounce-to-center bg-center ${
        isExiting ? "animate-slide-to-left" : ""
      }`}
    >
      <div
        className="
          bg-white rounded-2xl shadow-lg 
          p-4 xs:p-6 md:p-8 
          w-[95vw] xs:w-[70vw] sm:w-[50vw] md:w-[80vw] lg:w-[50vw] xl:w-[50vw]
          min-h-[60vh] xs:min-h-[55vh] md:min-h-[40vh] lg:min-h-[45vh] xl:min-h-[40vh]
          text-black
        "
      >
        <Link
          href="/"
          className="top-6 left-6 inline-flex items-center text-sm text-gray-700 hover:text-black transition"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:mb-3 font-black tracking-tight mt-1">
          Sign Up
        </h1>
        <p className="mb-6">
          Before proceeding, please choose between the two options below.
        </p>
        <div className="space-y-4 text-white">
          <button
            onClick={() => handleChoose("lawyer")}
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
            onClick={() => handleChoose("layman")}
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
