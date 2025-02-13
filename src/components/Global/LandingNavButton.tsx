'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface NavButtonProps {
  text?: string;
  opacity?: number;
  borderRadius?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  replace?: boolean;
  variant?: 'red' | 'blue' | 'black';
}

export default function NavButton({
  text = 'Placeholder',
  opacity = 1,
  borderRadius = '2rem',
  onClick,
  type = 'button',
  route,
  replace = false,
  variant = 'red',
}: NavButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== 'submit') {
      e.preventDefault();
    }

    if (route) {
      replace ? router.replace(route) : router.push(route);
    }

    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      style={{ opacity, borderRadius }}
      className={`
        font-bold transition duration-200 ease-in-out hover:opacity-80
        w-[15.625rem] h-[1.75rem] text-xs rounded-[0.375rem] px-4
        sm:w-[18.75rem] sm:h-[2.125rem] sm:text-sm sm:rounded-[0.4375rem] sm:px-5
        md:w-[21.875rem] md:h-[2.5rem] md:text-base md:rounded-[0.5rem] md:px-6
        lg:w-[25rem] lg:h-[2.8125rem] lg:text-lg lg:rounded-[0.5625rem] lg:px-7
        xl:w-[28.1875rem] xl:h-[3.1875rem] xl:text-xl xl:rounded-[0.625rem] xl:px-8
        bg-${variant} text-white
      `}
    >
      {text}
    </button>
  );
}
