const Button: React.FC<{ 
    text: string; 
    color?: string; 
    textColor?: string; 
    onClick?: () => void;
}> = ({ 
    text, 
    color = "bg-blue-700", 
    textColor = "text-white", 
    onClick 
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                ${color} ${textColor} 
                w-full max-w-[250px] h-[28px] text-xxxs font-semibold rounded-[6px]  
                sm:w-[300px] sm:h-[34px] sm:text-xxs sm:font-semibold sm:rounded-[7px] //640px and up
                md:w-[350px] md:h-[40px] md:text-xs md:font-semibold md:rounded-[8px] // 768px and up
                lg:w-[490px] lg:h-[45px] lg:text-sm lg:font-semibold lg:rounded-[9px] //1024px and up
                xl:w-[451px] xl:h-[51px] xl:text-base xl:font-semibold xl:rounded-[10px] //1280px and up
                
                transition hover:opacity-80
            `}
        >
            {text}
        </button>
    );
};

export default Button;
