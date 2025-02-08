import Image from 'next/image';
import SignUpButtonChoice from '@/app/signup/choice/SignUpButtonChoice';

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
      
      {/* Modal */}
      <div className="relative z-10 bg-white p-16 rounded-2xl shadow-lg w-[40rem] flex flex-col items-start">
        <h1 className="text-6xl font-extrabold mb-2 text-left">Sign Up</h1>
        <p className="text-gray-600 mb-6 text-left">
          Before proceeding, please choose between the two options below.
        </p>
        
        {/* Buttons */}
        <div className="space-y-2 w-full">
          <SignUpButtonChoice 
            title="I am a lawyer" 
            description="I want to help people with regards to legal matters."
            bgColor="bg-[#540007]"
            variant='lawyer'
          />
          <SignUpButtonChoice 
            title="I am not a lawyer (layman)" 
            description="I would like to seek guidance/advice from lawyers regarding concerns and problems."
            bgColor="bg-[#1A1047]"
            variant='layman'
          />
        </div>
      </div>
    </div>
  );
}