import { IconType } from "react-icons";
import { useRef, useState } from "react";

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
  const currentYear = new Date().getFullYear();

  const handleIconClick = () => {
    if (inputRef.current && type === "date") {
      inputRef.current.showPicker();
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
            className="border border-stroke rounded-lg pl-3 h-7 w-full bg-white font-semibold focus:outline-none"
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
            type={type}
            value={type === "date" ? dateValue : value}
            onChange={type === "date" ? handleDateChange : type === "tel" ? handleContactChange : onChange}
            pattern={type === "date" ? "\\d{4}-\d{2}-\d{2}" : undefined}
            max={type === "date" ? `${currentYear}-12-31` : undefined}
            className={`no-calendar border border-stroke rounded-lg p-2 pl-3 pr-10 h-7 w-full bg-white font-semibold focus:outline-none focus:ring-0 text-${color}`}
          />
        )}
        {Icon && (
          <Icon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer"
            style={{ color }}
            onClick={handleIconClick}
          />
        )}
      </div>
    </label>
  );
}
