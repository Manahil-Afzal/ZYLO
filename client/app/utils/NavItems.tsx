'use client'
import Link from 'next/link';
import React from 'react';


export const navItemsData = [
    { name: "Home", url: "/", },
    { name: "Courses", url: "/courses", },
    { name: "About", url: "/about", },
    { name: "Policy", url: "/policy", },
    { name: "FAQ", url: "/faq", },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
}
 
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            {/* Desktop Navigation */}
            <div className="flex flex-wrap items-center gap-2">
                {navItemsData && navItemsData.map((i, index) => (
                    <Link href={`${i.url}`} key={index} passHref>
                        <span 
                            className={`${
                                activeItem === index
                                ? "text-[crimson]"
                                : "text-black dark:text-white"
                            } text-[18px] px-6 font-Poppins font-[400] cursor-pointer hover:text-[#37a39a] transition-colors`}
                        >
                            {i.name}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Mobile Navigation */}
            {isMobile && (
                <div className="800px:hidden mt-5">
                    {navItemsData && navItemsData.map((i, index) => (
                        <Link href={i.url} key={index} passHref>
                            <span
                                className={`${
                                    activeItem === index
                                    ? "text-[crimson]"
                                    : "text-black dark:text-white"
                                } block py-5 text-[18px] px-6 font-Poppins font-normal hover:text-[#37a39a] transition-colors`}
                            >
                                {i.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default NavItems;