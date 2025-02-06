import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SignUpButtonChoiceProps {
  title: string;
  description: string;
  bgColor: string;
}

const SignUpButtonChoice: React.FC<SignUpButtonChoiceProps> = ({ title, description, bgColor }) => {
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

export default SignUpButtonChoice;
