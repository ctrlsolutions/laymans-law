"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { FaArrowRight } from "react-icons/fa";

interface SignUpChoiceButtonProps {
  title: string;
  description: string;
  userType: 'lawyer' | 'layman';  
}

const SignUpChoiceButton: React.FC<SignUpChoiceButtonProps> = ({
  title,
  description,
  userType, 
}) => {
  const bgColor = userType === 'lawyer' ? 'bg-red' : 'bg-blue';  
  const router = useRouter();

  const handleClick = () => {
    router.push(`/auth/signup/${userType}`);
  };

  return (
    <div
      onClick={handleClick}  
      className={`${bgColor} text-white py-4 px-6 rounded-lg cursor-pointer text-lg flex justify-between items-center transition duration-300 hover:brightness-125
      w-[18rem] h-[4rem] 
      sm:w-[21rem] sm:h-[4.5rem]
      md:w-[25rem] md:h-[4.5rem]
      `} 
    >
      <div>
        <p className="text-[.75rem] sm:text-[1rem] font-bold leading-tight">{title}</p>
        <p className="italic mt-1 text-[.5rem] sm:text-[.65rem] leading-tight">{description}</p>
      </div>
      <FaArrowRight size={24} className="flex-shrink-0" />
    </div>
  );
};

export default SignUpChoiceButton;
