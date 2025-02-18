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
          <div className="w-1/2 sm:w-1/2 m:w-1/2 lg:2/3 flex flex-col">
            

            <Image
              src="/LLLogo.png"
              alt="Layman's Law Logo"
              width={600}
              height={200}
              className="w-25 sm:w-25 m:w-25 lg:w-25 pl-14 sm:pl-14 lg:pl-32 "
            />


              <div className="mt-6 text-sm sm:text-sm m:text-m lg:text-lg pl-28 sm:pl-28 md:pl-32 lg:pl-52" >
                Intindihin ang mga <span className="font-bold text-blue">BATAS</span><br />
                Alamin ang iyong mga <span className="font-bold text-red">KARAPATAN</span>
              </div>


              <div className="mt-12 flex sm:flex-row m:flex-row gap-5 lg:gap-7  text-sm sm:text-sm m:text-m lg:text-lg pl-28 sm:pl-28 md:pl-32 lg:pl-52 pr-2 sm:pr-2 md:pr-2 lg:pr-1 xl:pr-28">
                <LandingNavButton text="LOG IN" route="/auth/login" variant="red" width="8rem" height="3rem" fontSize="1rem" />
                <LandingNavButton text="SIGN UP" route="/auth/signup" variant="blue" width="8rem" height="3rem" fontSize="1rem" />
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
