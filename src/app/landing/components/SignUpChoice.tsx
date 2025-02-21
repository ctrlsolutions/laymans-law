import Image from "next/image";
import SignUpChoiceButton from "@/app/auth/signup/choice/SignUpChoiceButton";

export default function SignUpChoice() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-black">
      {/* Background Image */}
      <Image 
        src="/LLBG.png" 
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
        priority
        className="absolute inset-0 z-0 opacity-100"
      />
      
      {/* Modal with Manually Adjustable Size */}
      <div className="relative z-10 bg-white p-8 sm:p-10 md:p-10 rounded-2xl shadow-lg 
        w-[21rem] sm:w-[26rem] md:w-[30rem] lg: w-[30rem] xl: w-[40rem]
        h-[21rem] sm:h-[25rem] md:h-[26rem] lg: h-[26rem] xl: h-[32rem]
        
        flex flex-col items-start">
        
        {/* Title */}
        <div className="
        text-[2rem] 
        sm:text-[3.5rem]
        m:text-[4rem]

        font-extrabold mb-2 text-left">
          Sign Up
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-[.75rem] sm:text-[.75rem] md:text-[1rem] mb-8 text-left">
          Before proceeding, please choose between <br /> the two options below.
        </p>
        
        {/* Integrated Buttons */}
        <div className="flex flex-col gap-4 w-full items-center">
          <SignUpChoiceButton 
            title="I am a Lawyer" 
            description="For legal professionals looking to join our platform." 
            userType="lawyer" 
          />
          <SignUpChoiceButton 
            title="I am not a Lawyer (Layman)" 
            description="For individuals seeking legal resources and guidance." 
            userType="layman" 
          />
        </div>

      </div>
    </div>
  );
}
