import Image from 'next/image';

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
        <div className="text-6xl font-[900] mb-2 text-left">
          Sign Up
        </div>
        <p className="text-gray-600 mb-6 text-left">
          Before proceeding, please choose between the two options below.
        </p>
        
        {/* Temporary Placeholder for Buttons */}
        <div className="space-y-6 w-full">
          <div className="w-full h-20 bg-[#540007] rounded-xl flex items-center justify-center text-white font-bold">
            I am a lawyer
          </div>
          <div className="w-full h-20 bg-[#1A1047] rounded-xl flex items-center justify-center text-white font-bold">
            I am not a lawyer (layman)
          </div>
        </div>
      </div>
    </div>
  );
}
