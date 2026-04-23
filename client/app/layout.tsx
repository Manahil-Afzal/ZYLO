"use client";
import React, { FC, useEffect } from "react";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { Providers } from "./Provider";

import UserLoader from "./components/UserLoader";
import socketIO from "socket.io-client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-[#0a0a0a] text-black dark:text-white bg-no-repeat duration-300 transition-colors`}
      >
        <Providers>
          <Custom>{children}</Custom>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
    if (!ENDPOINT) return;

    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <UserLoader>
      {children}
    </UserLoader>
  );
};
