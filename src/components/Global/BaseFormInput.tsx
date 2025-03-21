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
  width = "w-full",
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
          className={`text-${color}
                        p-2 w-full text-ellipsis
                        border border-gray-300
                        font-semibold 
                        focus:outline-none 
                        focus:ring-0
                        h-[2rem] text-sm rounded-[0.375rem] pl-4 pr-10
                        sm:h-[2.5rem] sm:text-sm sm:rounded-[0.4375rem] sm:pl-3 sm:pr-10
                        md:h-[3.0rem] md:text-base md:rounded-[0.5rem] md:pl-4 md:pr-12
                        lg:h-[3.5rem] lg:text-lg lg:rounded-[0.5625rem] lg:pl-6 lg:pr-14
                        xl:h-[4rem] xl:text-xl xl:rounded-[1rem] xl:pl-5 xl:pr-16
                    `}
          {...props}
        />

        {IconComponent && (
          <IconComponent
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              icon === "pass" || icon === "passhide"
                ? "text-gray-500"
                : "text-gray-900"
            }`}
            onClick={onIconClick}
            style={{
              cursor: onIconClick ? "pointer" : "default",
              fontSize: "1.3rem",
            }}
          />
        )}
      </div>
    </label>
  );
};

export default BaseFormInput;
