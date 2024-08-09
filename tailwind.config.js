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
      sans: ["var(--font-montserrat)"],
      mono: ["var(--font-roboto-mono)"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/pattern.png')",
      },
      colors: {
        // General colors
        background: "#fffffe",

        // Card colors
        cardBackground: "#d1d1e9",

        // You can also add these colors with more descriptive names
        primary: {
          50: "#edbcff",
          100: "#d2a4ff",
          200: "#b68bff",
          300: "#9b74ff",
          400: "#7f5dff",
          DEFAULT: "#6246ea", // Primary color
          600: "#4330d0",
          700: "#1819b6",
          800: "#00009d",
          900: "#000085",
          950: "#00006e",
        },
        secondary: "#2b2c34",
        tertiary: "#d1d1e9",
      },
      screens: {
        "2xs": "375px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [nextui()],
};
