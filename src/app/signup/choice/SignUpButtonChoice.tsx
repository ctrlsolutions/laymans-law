import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SignUpChoiceButtonProps {
  title: string;
  description: string;
  bgColor: string;
  variant?: 'lawyer' | 'layman';
}

const SignUpChoiceButton: React.FC<SignUpChoiceButtonProps> = ({ title, description, variant = 'lawyer' }) => {
  const bgColor = variant === 'lawyer' ? 'bg-[#540007]' : 'bg-[#1A1047]';

  return (
    <div className={`${bgColor} text-white py-4 px-8 rounded-lg cursor-pointer text-lg w-full flex justify-between items-center transition duration-300 hover:brightness-125`}>
      <div>
        <p className="text-2xl font-bold leading-tight">{title}</p>
        <p className="italic mt-2 text-sm leading-tight">{description}</p>
      </div>
      <ArrowRight size={24} />
    </div>
  );
};

export default SignUpChoiceButton;
