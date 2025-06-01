import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-red",
    "text-blue",
    "text-black",
    "bg-red",
    "bg-blue",
    "bg-black",
    "animate-move-up",
    "animation-delay-0",
    "animation-delay-100",
    "animation-delay-200",
    "animate-bounce-to-center",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-teal-400",
    "bg-fuchsia-600",
    "bg-pink-600",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#101010",
        red: "#540007",
        blue: "#1A1047",
        stroke: "#D9D9D9",
      },
      fontSize: {
        xxs: "10px",
        xxxs: "8px",
      },
      keyframes: {
        moveUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100px)" },
        },
        bounceToCenter: {
          "0%": { transform: "translateX(100%)" },
          "60%": { transform: "translateX(-4%)" },
          "80%": { transform: "translateX(0.5%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideToLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
      },
      animation: {
        "move-up": "moveUp 0.5s ease-in-out forwards",
        "slide-left": "slideLeft 0.5s ease-in-out forwards",
        "bounce-to-center": "bounceToCenter 0.8s ease-out",
        "slide-to-left": "slideToLeft 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".animation-delay-0": { "animation-delay": "0ms" },
        ".animation-delay-100": { "animation-delay": "100ms" },
        ".animation-delay-200": { "animation-delay": "200ms" },
        ".animation-delay-300": { "animation-delay": "300ms" },
        ".animation-delay-400": { "animation-delay": "400ms" },
        ".animation-delay-500": { "animation-delay": "500ms" },
      });
    },
  ],
} satisfies Config;
