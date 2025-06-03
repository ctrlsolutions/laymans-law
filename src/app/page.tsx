"use client";
import { useState } from "react";
import Image from "next/image";
import LandingNavButton from "@/components/Global/LandingNavButton";
import Link from "next/link";
import Head from "next/head";
export default function Home() {
  const [animateNav, setAnimateNav] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handleLogin = () => {
    setAnimateNav(true);
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
    }, 10000);
  };
  const handleSignUp = () => {
    setAnimateNav(true);
    setIsSigningUp(true);
    setTimeout(() => {
      setIsSigningUp(false);
    }, 10000);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <nav
        className={`absolute top-6 right-12 flex flex-row gap-8 text-white font-semibold text-base p-8 z-50 ${
          animateNav ? "animate-nav-links" : ""
        }`}
      >
        <Link
          href="/forum"
          className={`hover:underline ${
            animateNav ? "animate-move-up animation-delay-0" : ""
          }`}
        >
          FORUM
        </Link>
        <Link
          href="/wiki"
          className={`hover:underline ${
            animateNav ? "animate-move-up animation-delay-100" : ""
          }`}
        >
          WIKI
        </Link>
        <Link
          href="/about"
          className={`hover:underline ${
            animateNav ? "animate-move-up animation-delay-200" : ""
          }`}
        >
          ABOUT
        </Link>
      </nav>
      <div
        className={`absolute inset-0 flex items-center bg-cover bg-center bg-fixed h-full bg-[url(/upperBG.png)] transition-transform duration-1000 ease-in-out ${
          isLoggingIn || isSigningUp ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="w-1/2 sm:w-1/3md:w-2/3 lg:w-1/2 xl:w-1/2 max-w-[50rem] flex flex-col p-10 sm:p-6 md:p-8 translate-x-20 sm:translate-x-0 md:translate-x-12">
          <Image
            src="/LLLogo.png"
            alt="Layman's Law Logo"
            width={540}
            height={120}
            className="w-50 sm:w-60 md:w-96 lg:w-96 xl:w-[30rem] md:text-l lg:text-l ml-0 sm:ml-10 md:ml-0 lg:ml-0 xl:ml-10 "
          />

          <div className="mt-4 leading-snug text-xs xs:text-sm sm:text-lg md:text-base lg:text-lg ml-0 xs:ml-10 sm:ml-20 md:ml-10 lg:ml-20 xl:ml-32 text-black font-semibold">
            Intindihin ang mga{" "}
            <span className="font-extrabold text-blue">BATAS</span>,<br />
            Alamin ang iyong mga{" "}
            <span className="font-extrabold text-red">KARAPATAN</span>.
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 ml-0 sm:ml-20 md:ml-32 lg:ml-20 xl:ml-32">
            <LandingNavButton
              text="LOG IN"
              route="/login"
              variant="red"
              className="
                  w-24 h-8 text-xs
                xs:w-[10rem] xs:h-[3rem] xs:text-[1.25rem] xs:-ml-10
                md:w-[23rem] md:h-[3.5rem] md:text-md md:-ml-20
                lg:w-[15rem] lg:h-[3rem] lg:text-xl lg:ml-0
                xl:w-[15rem] xl:h-[3rem] xl:text-xl
              "
              loading={isLoggingIn}
              onClick={handleLogin}
            />
            <LandingNavButton
              text="SIGN UP"
              route="/signup"
              variant="blue"
              className="
                  w-24 h-8 text-xs
                xs:w-[10rem] xs:h-[3rem] xs:text-[1.25rem] xs:-ml-10
                md:w-[23rem] md:h-[3.5rem] md:text-md md:-ml-5
                lg:w-[15rem] lg:h-[3rem] lg:text-xl lg:ml-0
                xl:w-[15rem] xl:h-[3rem] xl:text-xl
              "
              loading={isSigningUp}
              onClick={handleSignUp}
            />
          </div>
        </div>
      </div>
    </>
  );
}
