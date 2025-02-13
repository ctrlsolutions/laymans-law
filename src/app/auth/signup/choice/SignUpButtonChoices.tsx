import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SignUpChoiceButtonProps {
  title: string;
  description: string;
  variant?: 'lawyer' | 'layman';
}

const SignUpChoiceButton: React.FC<SignUpChoiceButtonProps> = ({
  title,
  description,
  variant = 'lawyer',
}) => {
  const bgColor = variant === 'lawyer' ? 'bg-[#540007]' : 'bg-[#1A1047]';

  return (
    <div
      className={`${bgColor} text-white py-4 px-6 rounded-lg cursor-pointer text-lg flex justify-between items-center transition duration-300 hover:brightness-125
      w-[22rem] h-[5rem] 
      sm:w-[18rem] sm:h-[3.5rem] 
      md:w-[20rem] md:h-[4rem] 
      lg:w-[22rem] lg:h-[4.5rem] 
      xl:w-[24rem] xl:h-[5rem]`}
    >
      <div>
        <p className="text-lg sm:text-base md:text-lg font-bold leading-tight">{title}</p>
        <p className="italic mt-1 text-sm sm:text-xs md:text-sm leading-tight">{description}</p>
      </div>
      <ArrowRight size={24} className="flex-shrink-0" />
    </div>
  );
};

export default SignUpChoiceButton;
