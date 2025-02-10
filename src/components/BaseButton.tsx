interface ButtonProps {
  text: string;
  color?: string;
  textColor?: string;
  width?: string; // Expecting values like "30rem"
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  color = "red",
  textColor = "white",
  width, // No default, width is optional
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={width ? { width } : {}} // Apply inline width if provided
      className={`
        bg-${color} text-${textColor} font-semibold transition hover:opacity-80  
        h-[2rem] text-sm rounded-[0.375rem]  
        sm:h-[2.5rem] sm:text-base sm:rounded-[0.4375rem]  
        md:h-[3rem] md:text-lg md:rounded-[0.5rem]  
        lg:h-[3.5rem] lg:text-xl lg:rounded-[0.5625rem]  
        xl:h-[4rem] xl:text-2xl xl:rounded-[0.625rem]  
      `}
    >
      {text}
    </button>
  );
}
