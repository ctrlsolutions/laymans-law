"use client";

import { FC } from "react";
import { FormInputProps } from "@/interface/ComponentTypes";
import { iconMapping } from "@/utils/IconMapping";

const BaseFormInput: FC<
  FormInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  name,
  type,
  color = "black",
  icon,
  width,
  height,
  value,
  onChange,
  onIconClick,
  ...props
}) => {
  const IconComponent = icon ? iconMapping[icon] : null;

  return (
    <label
      htmlFor={name}
      className={`flex flex-col space-y-1 mt-4 text-${color}`}
    >
      <span className="text-sm font-extrabold sm:text-sm md:text-base lg:text-lg xl:text-xl">
        {label}
      </span>

      <div className={`relative flex items-center ${width}`}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`
            text-${color}
            p-4 w-full text-ellipsis
            border border-gray-300 rounded-3xl
            font-semibold 
            focus:outline-none 
            focus:ring-0
            ${height ?? `
              h-[1rem] text-xs rounded-[0.375rem] pl-4 pr-10
              sm:h-[1.5rem] sm:text-xs sm:rounded-[0.4375rem] sm:pl-3 sm:pr-10
              md:h-[2.0rem] md:text-sm md:rounded-[0.5rem] md:pl-4 md:pr-12
              lg:h-[2.5rem] lg:text-base lg:rounded-[0.5625rem] lg:pl-6 lg:pr-14
              xl:h-[3rem] xl:text-md xl:rounded-[1rem] xl:pl-5 xl:pr-16
            `}
          `}
          style={height ? { height } : undefined}
          {...props}
        />

        {IconComponent && (
          <IconComponent
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              icon === "pass" || icon === "passhide"
                ? "text-gray-500"
                : "text-gray-900"
            } cursor-pointer`}
            onClick={onIconClick}
            style={{
              fontSize: "1.3rem",
            }}
          />
        )}
      </div>
    </label>
  );
};

export default BaseFormInput;
