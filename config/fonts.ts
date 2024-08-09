import { Nunito_Sans, Roboto_Mono } from "next/font/google";

export const MontserratFont = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const RobotoMonoFont = Roboto_Mono({
  weight: "300",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});