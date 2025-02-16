import Image from "next/image";
import LandingNavButton from "@/components/Global/LandingNavButton";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/lowerBG.png)" }}
      >
     
        <div
          className="absolute inset-0 flex items-center bg-cover bg-center bg-fixed h-full"
          style={{ backgroundImage: "url(/upperBG.png)" }}
        >
          <div className="w-1/2 sm:w-1/3md:w-2/3 lg:w-1/2 xl:w-1/3 max-w-[50rem] flex flex-col p-10 sm:p-6 md:p-8 translate-x-20 sm:translate-x-0 md:translate-x-12">
            

            <Image
              src="/LLLogo.png"
              alt="Layman's Law Logo"
              width={540}
              height={120}
              className="w-50 sm:w-60 md:w-96 lg:w-96 xl:w-[64rem] md:text-l lg:text-l ml-0 sm:ml-10 md:ml-0 lg:ml-0 xl:ml-10 "
            />


              <div className="mt-6 leading-snug text-sm sm:text-lg md:text-m lg:text-l ml-0 sm:ml-20 md:ml-0 lg:ml-20 xl:ml-32">
                Intindihin ang mga <span className="font-bold text-blue">BATAS</span><br />
                Alamin ang iyong mga <span className="font-bold text-red">KARAPATAN</span>
              </div>


              <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 ml-0 sm:ml-20 md:ml-32 lg:ml-20 xl:ml-32">
                <LandingNavButton text="LOG IN" route="/auth/login" variant="red" width="10rem" height="3rem" fontSize="1.25rem" />
                <LandingNavButton text="SIGN UP" route="/auth/signup" variant="blue" width="10rem" height="3rem" fontSize="1.25rem" />
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
