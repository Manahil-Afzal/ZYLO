"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  isMobile: boolean;
  setOpen?: (open: boolean) => void;
};

const NavItems: React.FC<Props> = ({ isMobile, setOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {!isMobile && (
        <div className="hidden md:flex items-center gap-2">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`${
                  pathname === item.url
                    ? "text-[crimson] dark:text-[#37a39a]"
                    : "text-black dark:text-white"
                } text-[18px] px-6 font-Poppins font-medium cursor-pointer hover:text-[#37a39a] transition`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="w-full">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                onClick={() => setOpen && setOpen(false)}
                className={`${
                  pathname === item.url
                    ? "text-[crimson] dark:text-[#37a39a]"
                    : "text-black dark:text-white"
                } block py-5 px-6 text-[18px] font-Poppins font-medium`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;