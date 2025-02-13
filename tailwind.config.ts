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
        xxs: "10px", // Extra extra small
        xxxs: "8px", // Super small text
      },
    },
  },
  plugins: [],
} satisfies Config;
