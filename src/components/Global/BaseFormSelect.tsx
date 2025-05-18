// "use client";

// import { FC, useMemo } from "react";
// import { FormSelectProps } from "@/interface/ComponentTypes";
// import { iconMapping } from "@/utils/IconMapping";

// const BaseFormSelect: FC<FormSelectProps> = ({
//   label,
//   name,
//   color = "black",
//   width,
//   height,
//   textSize,
//   value,
//   choices = [],
//   onChange,
// }) => {
//   return (
//     <label
//       htmlFor={name}
//       className={`flex flex-col space-y-1 mt-4 text-${color}`}
//     >
//       <span
//         className={`font-extrabold ${
//           textSize || "text-sm"
//         } sm:text-sm md:text-base lg:text-lg xl:text-xl`}
//       >
//         {label}
//       </span>

//       <div
//         className={`relative flex items-center ${width || ""}`}
//         style={{ width, height }}
//       >
//         <select
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className={`text-${color} border-${color}
//                         p-2 w-full text-ellipsis
//                         border border-gray-300
//                         font-semibold
//                         focus:outline-none
//                         focus:ring-0
//                         h-[1rem] text-sm rounded-[0.375rem] pl-4 pr-10
//                         sm:h-[1.5rem] sm:text-sm sm:rounded-[0.4375rem] sm:pl-3 sm:pr-10
//                         md:h-[2.0rem] md:text-base md:rounded-[0.5rem] md:pl-4 md:pr-12
//                         lg:h-[2.5rem] lg:text-lg lg:rounded-[0.5625rem] lg:pl-6 lg:pr-14
//                         xl:h-[3rem] xl:text-xl xl:rounded-[1rem] xl:pl-5 xl:pr-16`}
//         >
//           {choices.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </label>
//   );
// };

// export default BaseFormSelect;

"use client";

import { FC, useMemo } from "react";
import { FormSelectProps } from "@/interface/ComponentTypes";
import { iconMapping } from "@/utils/IconMapping";

const BaseFormSelect: FC<FormSelectProps> = ({
  label,
  name,
  color = "black",
  width,
  height,
  textSize,
  value,
  choices = [],
  onChange,
}) => {
  return (
    <label
      htmlFor={name}
      className={`flex flex-col space-y-1 mt-4 text-${color}`}
    >
      <span
        className={`font-extrabold ${
          textSize || "text-sm"
        } sm:text-sm md:text-sm lg:text-sm xl:text-sm`}
      >
        {label}
      </span>

      <div
        className={`relative flex items-center ${width || ""}`}
        style={{ width, height }}
      >
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`text-${color} ${textSize || "text-sm"} border-${color}
            p-2 w-full text-ellipsis
            border border-gray-300
            font-semibold 
            focus:outline-none 
            focus:ring-0
            h-[1rem] rounded-[0.375rem] pl-4 pr-10
            sm:h-[1.5rem] sm:rounded-[0.4375rem] sm:pl-3 sm:pr-10
            md:h-[2.0rem] md:rounded-[0.5rem] md:pl-4 md:pr-12
            lg:h-[2.5rem] lg:rounded-[0.5625rem] lg:pl-6 lg:pr-14
            xl:h-[3rem] xl:rounded-[1rem] xl:pl-5 xl:pr-16`}
        >
          {choices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};

export default BaseFormSelect;
