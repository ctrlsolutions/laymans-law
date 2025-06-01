"use client";

import * as React from "react";

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`px-4 py-5 border rounded-xl text-black w-full leading-none z-0 resize-none focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ${
          error ? "border-red-500" : "border-gray-500"
        } ${className || ""}`}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
