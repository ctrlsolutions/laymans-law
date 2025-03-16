import { FC } from "react";
import { IconType } from "react-icons";
import {
  FiMail,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiUser,
  FiHash,
  FiCalendar,
} from "react-icons/fi";

const iconMapping: Record<string, IconType> = {
  email: FiMail,
  pass: FiEye,
  passhide: FiEyeOff,
  tel: FiPhone,
  user: FiUser,
  hash: FiHash,
  calendar: FiCalendar,
};

interface FormInputProps {
  label: string;
  name: string;
  color: string;
  type: string;
  icon: string;
  width?: string;
  height?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

const BaseFormInput: FC<FormInputProps> = ({
  label,
  name,
  type,
  color = "black",
  icon,
  width = "null",
  value,
  onChange,
  onIconClick,
}) => {
  const IconComponent = icon ? iconMapping[icon] : null;

  return (
    <label
      htmlFor={name}
      className={`flex flex-col space-y-1 mt-4 text-${color}`}
    >
      <span
        className={`
                    text-sm font-extrabold
                    sm:text-sm
                    md:text-base
                    lg:text-lg
                    xl:text-xl
                `}
      >
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
        />
        {IconComponent && (
          <IconComponent
            className={`absolute right-5 sm:right-5 top-1/2 transform -translate-y-1/2 ${
              icon === "pass" || icon === "passhide"
                ? "text-gray-500"
                : "text-gray-900"
            }`}
            onClick={onIconClick}
            style={{
              cursor: onIconClick ? "pointer" : "default",
              fontSize: "1.3rem",
            }} // Adjust font size and color
          />
        )}
      </div>
    </label>
  );
};

export default BaseFormInput;
