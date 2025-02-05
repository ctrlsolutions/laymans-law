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
        <h1 className="text-6xl font-extrabold mb-2 text-left">Sign Up</h1>
        <p className="text-gray-600 mb-6 text-left">
          Before proceeding, please choose between the two options below.
        </p>
        
        {/* Buttons */}
        <div className="space-y-6 w-full">
          <div className="bg-[#540007] text-white py-4 px-8 rounded-lg cursor-pointer text-lg w-full text-left">
            <p className="text-2xl font-bold leading-tight">I am a lawyer</p>
            <p className="italic mt-2 text-sm leading-tight">I want to help people with regards to legal matters.</p>
          </div>
          
          <div className="bg-[#1A1047] text-white py-4 px-8 rounded-lg cursor-pointer text-lg w-full text-left">
            <p className="text-2xl font-bold leading-tight">I am not a lawyer (layman)</p>
            <p className="italic mt-2 text-sm leading-tight">I would like to seek guidance/advice from lawyers <br />
            regarding concerns and problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
