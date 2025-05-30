"use client";

import { FC } from "react";
import { FormSelectProps } from "@/interface/ComponentTypes";

const BaseFormSelect: FC<FormSelectProps> = ({
  label,
  name,
  color = "black",
  width,
  height,
  textSize,
  value,
  choices = [],
  onChange,
}) => {
  return (
    <label
      htmlFor={name}
      className={`flex flex-col space-y-1 mt-4 text-${color}`}
    >
      <span
        className={`font-extrabold ${
          textSize || "text-sm"
        } sm:text-sm md:text-sm lg:text-sm xl:text-sm`}
      >
        {label}
      </span>

      <div
        className={`relative flex items-center ${width || ""}`}
        style={{ width, height }}
      >
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`text-${color} ${textSize || "text-sm"} border-${color}
            p-2 w-full text-ellipsis
            border border-gray-300
            font-semibold 
            focus:outline-none 
            focus:ring-0
            h-[1rem] rounded-[0.375rem] pl-4 pr-6  
            sm:h-[1.5rem] sm:rounded-[0.4375rem] sm:pl-3 sm:pr-6 
            md:h-[2.0rem] md:rounded-[0.5rem] md:pl-4 md:pr-8  
            lg:h-[2.5rem] lg:rounded-[0.5625rem] lg:pl-6 lg:pr-10 
            xl:h-[3rem] xl:rounded-[1rem] xl:pl-5 xl:pr-12    
            appearance-none
          `}
        >
          {choices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </label>
  );
};

export default BaseFormSelect;
