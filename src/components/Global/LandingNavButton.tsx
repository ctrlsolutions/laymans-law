import React from "react";

const NavButton = ({
  text = "Placeholder",
  bgColor = "#540007",
  textColor = "#ffffff",
  opacity = 1,
  borderRadius = "2rem",
}) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        opacity: opacity,
        borderRadius: borderRadius,
      }}
      className="
        w-32 h-8 text-sm px-4
        sm:w-40 sm:h-10 sm:text-base sm:px-5
        md:w-48 md:h-12 md:text-lg md:px-6
        lg:w-52 lg:h-14 lg:text-xl lg:px-8
        font-bold transition duration-200 ease-in-out hover:opacity-80
      "
    >
      {text}
    </button>
  );
};

export default NavButton;