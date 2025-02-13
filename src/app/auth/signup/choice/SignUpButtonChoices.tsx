"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { FaArrowRight } from "react-icons/fa";

interface SignUpChoiceButtonProps {
  title: string;
  description: string;
  variant?: 'lawyer' | 'layman';  
}

const SignUpChoiceButton: React.FC<SignUpChoiceButtonProps> = ({
  title,
  description,
  variant, 
}) => {
  const bgColor = variant === 'lawyer' ? 'bg-red' : 'bg-blue';  
  const router = useRouter();

  const handleClick = () => {
    router.push(`/signup?userType=${variant}`);
  };

  return (
    <div
      onClick={handleClick}  
      className={`${bgColor} text-white py-4 px-6 rounded-lg cursor-pointer text-lg flex justify-between items-center transition duration-300 hover:brightness-125
      sm:w-[18rem] sm:h-[3.5rem] 
      md:w-[20rem] md:h-[4.5rem] 
      lg:w-[22rem] lg:h-[5.5rem] 
      xl:w-[24rem] xl:h-[6rem]`} 
    >
      <div>
        <p className="text-lg sm:text-base md:text-lg font-bold leading-tight">{title}</p>
        <p className="italic mt-1 text-sm sm:text-xs md:text-sm leading-tight">{description}</p>
      </div>
      <FaArrowRight size={24} className="flex-shrink-0" />
    </div>
  );
};

export default SignUpChoiceButton;
