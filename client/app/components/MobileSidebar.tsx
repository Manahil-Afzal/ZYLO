'use client'
import React, { FC } from 'react';
import Link from 'next/link';
import { navItemsData } from '../utils/NavItems';
import { MdOutlineCancel } from 'react-icons/md';
import { useTheme } from 'next-themes';

type Props = {
    activeItem: number;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const MobileSidebar: FC<Props> = ({ activeItem, open, setOpen }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <>
            {/* Backdrop overlay */}
            {open && (
                <div
                    className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
                        isDark ? 'bg-gray-900/50' : 'bg-black/30'
                    }`}
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 z-50 shadow-lg transform transition-transform duration-300 md:hidden ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                } ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <Link
                        href="/"
                        className={`${isDark ? 'text-white' : 'text-black'} text-[22px] font-Poppins font-medium`}
                        onClick={() => setOpen(false)}
                    >
                        ZyLO Learning
                    </Link>
                    <MdOutlineCancel
                        size={28}
                        className="cursor-pointer text-gray-500 dark:text-gray-400"
                        onClick={() => setOpen(false)}
                    />
                </div>

                {/* Nav items */}
                <div className="flex flex-col">
                    {navItemsData && navItemsData.map((i, index) => (
                        <Link href={i.url} key={index} passHref>
                            <span
                                className={`${
                                    activeItem === index
                                        ? isDark
                                            ? 'text-[crimson] bg-gray-700'
                                            : 'text-[crimson] bg-gray-100'
                                        : isDark
                                            ? 'text-white'
                                            : 'text-black'
                                } block py-5 px-6 text-[18px] font-Poppins font-normal cursor-pointer transition-colors border-b ${
                                    isDark
                                        ? 'hover:bg-gray-700 border-gray-700'
                                        : 'hover:bg-gray-100 border-gray-200'
                                }`}
                                onClick={() => setOpen(false)}
                            >
                                {i.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Footer of Sidebar */}
          <div className="absolute bottom-5 left-5">
            <p className="text-[14px] text-gray-500 dark:text-gray-400">
              Copyright © 2026 ZyLO
            </p>
          </div>
            </div>
        </>
    );
};

export default MobileSidebar;
