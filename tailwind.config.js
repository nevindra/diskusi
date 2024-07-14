import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
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
          light: "#2a2a2a"
        },
        surface: {
          DEFAULT: "#fffffe",
          card: "#eff0f3"
        },
        accent: {
          primary: "#ff8e3c",
          secondary: "#d9376e"
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}