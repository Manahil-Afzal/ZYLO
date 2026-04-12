
import React from "react";
import "./globals.css"; 
import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
    subsets: ["latin"],
    weight : ["400", "500", "600", "700"],
    variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
       subsets: ["latin"],
       weight: ["400", "500", "600", "700"],
       variable: "--font-Josefin",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-[#0a0a0a] text-black dark:text-white bg-no-repeat duration-300 transition-colors`}>
              <ThemeProvider attribute="class" defaultTheme="light">
                  {children}
                  <Toaster position='top-center' reverseOrder={false}/>
            </ThemeProvider>
       </body>
    </html>
  );
}