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
        } sm:text-sm md:text-base lg:text-base xl:text-lg`}
      >
        {label}
      </span>

      <div
        className={`relative flex items-center w-full`}
        style={{ width, height }}
      >
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            text-${color} ${textSize || "text-sm"}
            border border-gray-300 border-${color}
            font-semibold focus:outline-none focus:ring-0 appearance-none
            text-ellipsis w-full p-2
            h-8 rounded-md pl-3 pr-6

            sm:h-10 sm:rounded-md sm:pl-4 sm:pr-8
            md:h-11 md:rounded-lg md:pl-5 md:pr-10
            lg:h-12 lg:rounded-xl lg:pl-6 lg:pr-12
            xl:h-12 xl:rounded-2xl xl:pl-7 xl:pr-14
          `}
        >
          {choices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-700">
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
