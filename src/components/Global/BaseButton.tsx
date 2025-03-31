import { FormButtonProps } from "@/interface/ComponentTypes";

export default function Button({
  children,
  color = "red",
  textColor = "white",
  width,
  onClick,
  type = "button",
}: FormButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={width ? { width } : {}}
      className={`
        bg-${color} text-${textColor} font-semibold transition hover:opacity-80  
        h-[1rem] rounded-[0.375rem]  
        sm:h-[1.5rem] sm:text-xs sm:rounded-[0.4375rem] sm:p-2
        md:h-[2.0rem] md:text-sm md:rounded-[0.5rem] md:p-2
        lg:h-[2.5rem] lg:text-base lg:rounded-[0.5625rem] lg:p-2 
        xl:h-[3rem] xl:text-lg xl:rounded-[0.625rem] xl:p-2
      `}
    >
      {children}
    </button>
  );
}
