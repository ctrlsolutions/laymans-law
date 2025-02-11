import { IconType } from "react-icons";
import { useRef, useState } from "react";

interface BaseFormInputProps {
  label: string;
  id: string;
  color?: string;
  icon?: IconType;
  type: string;
}

export default function BaseFormInput({
  label,
  id,
  color,
  icon: Icon,
  type,
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
    const [year, month, day] = value.split("-").map(Number);
    if (year <= currentYear) {
      setDateValue(value);
    }
  };

  return (
    <label htmlFor={id} className="flex flex-col space-y-1 mt-4">
      <span className={`text-m font-bold text-${color}`}>{label}</span>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={dateValue}
          onChange={handleDateChange}
          pattern="\d{4}-\d{2}-\d{2}"
          max={`${currentYear}-12-31`}
          className={`no-calendar border border-stroke rounded-lg p-2 pl-3 pr-10 h-7 w-full bg-white font-semibold focus:outline-none focus:ring-0 text-${color}`}
        />
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
