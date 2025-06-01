import { FormButtonProps } from "@/interface/ComponentTypes";
import { FaSpinner } from "react-icons/fa";

export default function BaseButton({
  children,
  color = "red",
  textColor = "white",
  textSize = "text-xs",
  width,
  onClick,
  type = "button",
  loading = false,
  className,
}: FormButtonProps & { loading?: boolean }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={width ? { width } : {}}
      className={`
        bg-${color} text-${textColor} ${textSize} font-semibold transition hover:opacity-80  
        h-[1rem] rounded-[0.375rem]  
        sm:h-[1.5rem] sm:text-xs sm:rounded-[0.4375rem] sm:p-2
        md:h-[2.0rem] md:text-xs md:rounded-[0.5rem] md:p-2
        lg:h-[2.5rem] lg:text-sm lg:rounded-[0.5625rem] lg:p-2 
        xl:h-[3rem] xl:text-sm xl:rounded-[0.625rem] xl:p-2
        flex items-center justify-center
        ${loading ? "bg-gray-400 cursor-not-allowed" : ""}
        ${className || ""}
      `}
    >
      {loading ? <FaSpinner className="animate-spin" /> : children}
    </button>
  );
}
