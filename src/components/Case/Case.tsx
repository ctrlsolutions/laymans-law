"use client"; // Only add this if it's a client component

import React from "react";

interface Props {
  title?: string;
  description?: string;
  status: boolean;
  tag: string;
}

const MyComponent: React.FC<Props> = ({ title = "Default Title" }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold">{title}</h1>
      <p>This is a Next.js function component.</p>
    </div>
  );
};

export default MyComponent;
