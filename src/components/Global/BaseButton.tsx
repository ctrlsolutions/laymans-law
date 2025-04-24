import { FormButtonProps } from "@/interface/ComponentTypes";

export default function Button({
  children,
  color = "red",
  textColor = "white",
  textSize = "text-base",
  width,
  height,
  onClick,
  type = "button",
}: FormButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...(width && { width }), ...(height && { height }) }}
      className={`
        bg-${color} text-${textColor} ${textSize} font-semibold transition hover:opacity-80  
        rounded-[0.375rem]  
        sm:rounded-[0.4375rem] sm:p-2
        md:rounded-[0.5rem] md:p-2
        lg:rounded-[0.5625rem] lg:p-2 
        xl:rounded-[0.625rem] xl:p-2
      `}
    >
      {children}
    </button>
  );
}