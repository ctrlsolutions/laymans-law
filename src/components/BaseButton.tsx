interface ButtonProps {
  text: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  color = "red",
  textColor = "white",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
                  bg-${color} text-${textColor} font-semibold transition hover:opacity-80
                  w-full max-w-[250px] h-[28px] text-xxxs rounded-[6px]
                  sm:w-[300px] sm:h-[34px] sm:text-xxs sm:rounded-[7px]
                  md:w-[350px] md:h-[40px] md:text-xs md:rounded-[8px]
                  lg:w-[490px] lg:h-[45px] lg:text-sm lg:rounded-[9px]
                  xl:w-[451px] xl:h-[51px] xl:text-base xl:rounded-[10px]
              `}
    >
      {text}
    </button>
  );
}
