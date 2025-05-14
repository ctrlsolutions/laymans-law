import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;           // Optional custom classes
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={` p-0 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl  ${className}`}>
      {children}
    </div>
  );
};

export default Card;
