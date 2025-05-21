"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface NavButtonProps {
  text?: string;
  opacity?: number;
  borderRadius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  route?: string;
  replace?: boolean;
  variant?: "red" | "blue" | "black";
  className?: string;
  loading?: boolean;
}

export default function NavButton({
  text = "Placeholder",
  opacity = 1,
  borderRadius = "2rem",
  width = "8rem",
  height = "1.5rem",
  onClick,
  type = "button",
  route,
  replace = false,
  variant = "red",
  className = "",
  loading = false,
}: NavButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") {
      e.preventDefault();
    }

    if (!loading) {
      onClick?.();

      if (route) {
        setTimeout(() => {
          replace ? router.replace(route) : router.push(route);
        }, 700);
      }
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={loading}
      style={{ opacity, borderRadius, width, height }}
      className={`
        font-bold transition duration-200 ease-in-out hover:opacity-80
      flex items-center justify-center
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : `bg-${variant} text-white`
        }
        ${className}
      `}
    >
      {loading ? <FaSpinner className="animate-spin text-lg" /> : text}
    </button>
  );
}
