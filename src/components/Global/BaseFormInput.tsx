baseforminput

import { IconType } from "react-icons";
import { useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

interface BaseFormInputProps {
  label: string;
  id: string;
  color?: string;
  icon?: IconType;
  type: string;
  options?: string[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface lawyerInfo {
  user_id: string;
  lawyer_acc_id: string;
  roll_number: string;
  roll_signed_date: string;
  verified: boolean;
  cases_taken: number;
}

export default function BaseFormInput({
  label,
  id,
  color,
  icon: Icon,
  type,
  options,
  value,
  onChange,
}: BaseFormInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateValue, setDateValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false); 
  const currentYear = new Date().getFullYear();

  const assignRollInfo = (lawyer: lawyerInfo) => {
    const rollNumber = `RN-${lawyer.lawyer_acc_id}-${new Date().getTime()}`;
    const rollSignedDate = new Date().toISOString().split('T')[0];
  
    return { rollNumber, rollSignedDate };
  }

  const handleIconClick = () => {
    if (type === "date" && inputRef.current) {
      inputRef.current.showPicker();
    }
    if (id === "password") {
      setShowPassword(!showPassword);
    }
    if (id === "retypePassword") {
      setShowRePassword(!showRePassword);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [year] = value.split("-").map(Number);
    if (year <= currentYear) {
      setDateValue(value);
    }
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(event.target.value)) {
      onChange?.(event);
    }
  };


  return (
    <label htmlFor={id} className="flex flex-col space-y-1 mt-4">
      <span className={`text-m font-bold text-${color}`}>{label}</span>
      <div className="relative text-black">
        {type === "select" && options ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="border border-stroke rounded-lg pl-3 h-10 w-full bg-white font-semibold focus:outline-none"
          >
            <option value="" hidden></option> 
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={inputRef}
            id={id}
            type={
              id === "password" && showPassword
                ? "text"
                : id === "retypePassword" && showRePassword
                ? "text"
                : type
            }
            value={type === "date" ? dateValue : value}
            onChange={type === "date" ? handleDateChange : type === "tel" ? handleContactChange : onChange}
            pattern={type === "date" ? "\\d{4}-\d{2}-\d{2}" : undefined}
            max={type === "date" ? `${currentYear}-12-31` : undefined}
            className={`no-calendar border border-stroke rounded-lg p-2 pl-3 pr-10 h-10 w-full bg-white font-semibold focus:outline-none focus:ring-0 text-${color}`}
          />
        )}
        
        {(id === "password" || id === "retypePassword") && (
          <div onClick={handleIconClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {((id === "password" && showPassword) || (id === "retypePassword" && showRePassword)) ? (
              <EyeOff className="text-red-600 fill-red-600" /> 
            ) : (
              <Eye className="text-red-600" /> 
            )}
          </div>
        )}
        
        {Icon && (
          <Icon 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer text-red-600"
            style={{ color }}
            onClick={handleIconClick}
          />
        )}
      </div>
    </label>
  );
}	
