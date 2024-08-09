import { Montserrat, Roboto_Mono } from "next/font/google";

export const MontserratFont = Montserrat({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const RobotoMonoFont = Roboto_Mono({
  weight: "300",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});