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
    extend: {
      colors: {
        background: "#fffffe",
        cardbg: "#eff0f3",
        headline: "#0d0d0d",
        paragraph: "#2a2a2a",
        primary: "#ff8e3c",
        secondary: "#d9376e",
        // Semantic colors
        text: {
          DEFAULT: "#0d0d0d",
          light: "#2a2a2a",
          dark: "#fffffe", // Add this line for dark mode text color
        },
        surface: {
          DEFAULT: "#fffffe",
          card: "#eff0f3",
        },
        accent: {
          primary: "#ff8e3c",
          secondary: "#d9376e",
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#fffffe",
            foreground: "#0d0d0d",
            primary: {
              DEFAULT: "#ff8e3c",
              foreground: "#fffffe",
            },
            secondary: {
              DEFAULT: "#d9376e",
              foreground: "#fffffe",
            },
          },
        },
      },
    }),
  ],
};
