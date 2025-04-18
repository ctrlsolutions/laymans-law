// import { FormButtonProps } from "@/interface/ComponentTypes";

// export default function Button({
//   children,
//   color = "red",
//   textColor = "white",
//   width,
//   onClick,
//   type = "button",
// }: FormButtonProps) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       style={width ? { width } : {}}
//       className={`
//         bg-${color} text-${textColor} font-semibold transition hover:opacity-80  
//         h-[1rem] rounded-[0.375rem]  
//         sm:h-[1.5rem] sm:text-xs sm:rounded-[0.4375rem] sm:p-2
//         md:h-[2.0rem] md:text-sm md:rounded-[0.5rem] md:p-2
//         lg:h-[2.5rem] lg:text-base lg:rounded-[0.5625rem] lg:p-2 
//         xl:h-[3rem] xl:text-lg xl:rounded-[0.625rem] xl:p-2
//       `}
//     >
//       {children}
//     </button>
//   );
// }
import { FormButtonProps } from "@/interface/ComponentTypes";

export default function Button({
  children,
  color = "red",
  textColor = "white",
  width,
  onClick,
  type = "button",
  disabled = false,
}: FormButtonProps) {
  const colorClasses: Record<string, string> = {
    red: "bg-red",
    violet: "bg-violet-950",
    blue: "bg-blue-700",
    gray: "bg-gray-500",
  };

  const textClasses: Record<string, string> = {
    white: "text-white",
    black: "text-black",
    gray: "text-gray-800",
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={width ? { width } : {}}
      className={`
        ${colorClasses[color] || "bg-red"} 
        ${textClasses[textColor] || "text-white"} 
        font-semibold transition  
        h-[1rem] rounded-[0.375rem]  
        sm:h-[1.5rem] sm:text-xs sm:rounded-[0.4375rem] sm:p-2
        md:h-[2.0rem] md:text-sm md:rounded-[0.5rem] md:p-2
        lg:h-[2.5rem] lg:text-base lg:rounded-[0.5625rem] lg:p-2 
        xl:h-[3rem] xl:text-lg xl:rounded-[0.625rem] xl:p-2

        ${disabled ? "opacity-50 cursor-not-allowed hover:opacity-50" : "hover:opacity-80"}
      `}
    >
      {children}
    </button>
  );
}
