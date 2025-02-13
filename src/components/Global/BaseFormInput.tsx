//NO POPPINS FONT!!!

import { FC } from "react";
import { IconType } from "react-icons";
import { FiMail, FiEye, FiPhone, FiUser, FiHash, FiCalendar } from "react-icons/fi";

const iconMapping: Record<string, IconType> = {
    "email": FiMail,
    "pass": FiEye,
    "tel": FiPhone,
    "user": FiUser,
    "hash": FiHash,
    "calendar": FiCalendar,
};

interface FormInputProps {
    label: string;
    id?: string;
    color: string;
    type: string;
    icon: string;
    width?: string;
    height?: string;
}

const BaseFormInput: FC<FormInputProps> = ({ 
    label, 
    id,
    type,
    color = "black", 
    icon,
    width = "null",
}) => {
    const IconComponent = icon ? iconMapping [icon] : null;

    return (
        <label htmlFor={id} className={`flex flex-col space-y-1 mt-4 text-${color}`}>
            <span 
                className={`
                    var(--font-poppins)
                    text-sm font-extrabold
                    sm:text-sm
                    md:text-base
                    lg:text-lg
                    xl:text-xl
                `}
            >
                {label}
            </span>
            <div className={`relative flex items-center ${width}`}>
                <input
                    id={id}
                    type={type}
                    className={`
                        text-${color}
                        font-poppins
                        p-2 w-full text-ellipsis
                        border border-gray-300
                        font-semibold 
                        focus:outline-none 
                        focus:ring-0
                        h-[2rem] text-sm rounded-[0.375rem] pl-4 pr-10
                        sm:h-[2.5rem] sm:text-sm sm:rounded-[0.4375rem] sm:pl-3 sm:pr-10
                        md:h-[3.0rem] md:text-base md:rounded-[0.5rem] md:pl-4 md:pr-12
                        lg:h-[3.5rem] lg:text-lg lg:rounded-[0.5625rem] lg:pl-6 lg:pr-14
                        xl:h-[4rem] xl:text-xl xl:rounded-[1rem] xl:pl-5 xl:pr-16
                    `}
                />  
                {IconComponent && <IconComponent 
                    className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${color}`}
                />}
            </div>
        </label>
    );
};

export default BaseFormInput;
