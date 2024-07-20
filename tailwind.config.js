import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-poppins)"],
      mono: ["var(--font-roboto-mono)"],
    },
    extend: {  // Move 'extend' here
      colors: {
        // General colors
        background: "#fffffe",
        button: {
          DEFAULT: "#6246ea",
          text: "#fffffe",
        },

        // Card colors
        cardBackground: "#d1d1e9",
        
        // You can also add these colors with more descriptive names
        primary: "#2b2c34",
        secondary: "#6246ea",
        tertiary: "#d1d1e9",
      },
    },
  },
  plugins: [nextui()],
};
