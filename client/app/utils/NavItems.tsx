'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  isMobile: boolean;
  activeItem?: number;
};

const NavItems: React.FC<Props> = ({ isMobile }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex items-center gap-2">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  pathname === item.url
                    ? "text-[crimson] dark:text-[#37a39a]" // Active link color
                    : "text-black dark:text-white"         // Inactive link color
                } text-[18px] px-6 font-Poppins font-medium cursor-pointer hover:text-[#37a39a] transition-all duration-300`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="w-full">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  pathname === item.url
                    ? "text-[crimson] dark:text-[#37a39a]"
                    : "text-black dark:text-white"
                } block py-5 text-[18px] px-6 font-Poppins font-medium hover:text-[#37a39a] transition-all`}
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