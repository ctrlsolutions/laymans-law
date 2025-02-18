'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface NavButtonProps {
  text?: string;
  opacity?: number;
  borderRadius?: string;
  width?: string;  // Added width
  height?: string; // Added height
  fontSize?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  replace?: boolean;
  variant?: 'red' | 'blue' | 'black';
  className?: string;
}

export default function NavButton({
  text = 'Placeholder',
  opacity = 1,
  borderRadius = '2rem',
  width = '8rem',  
  height = '1.5rem', 
  onClick,
  type = 'button',
  route,
  replace = false,
  variant = 'red',
  className = '',
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
      style={{ opacity, borderRadius, width, height }}
      className={`
        font-bold transition duration-200 ease-in-out hover:opacity-80
        bg-${variant} text-white  ${className}
      `}
    >
      {text}
    </button>
  );
}
