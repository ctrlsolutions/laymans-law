import { IconType } from "react-icons";

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
  return (
    <label htmlFor={id} className="flex flex-col space-y-1 mt-4">
      <span className={`text-m font-bold text-${color}`}>{label}</span>
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`border border-stroke rounded-lg p-2 pl-3 pr-10 w-full bg-white font-semibold focus:outline-none focus:ring-0 text-${color}`}
        />
        {Icon && (
          <Icon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg"
            style={{ color }}
          />
        )}
      </div>
    </label>
  );
}
