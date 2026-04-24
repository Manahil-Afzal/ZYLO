'use client'
import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import avatar from "../../public/assests/avatar.png";
import { MdOutlineCancel } from 'react-icons/md';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useTheme } from '../utils/theme-provider';
import NavItems from '../utils/NavItems';

type Props = {
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: any;
};

const MobileSidebar: FC<Props> = ({ open, setOpen, user }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className={`fixed inset-0 z-40 md:hidden ${
            isDark ? 'bg-gray-900/50' : 'bg-black/30'
          }`}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 z-50 transform transition-transform duration-300 md:hidden shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[20px] font-medium dark:text-white"
          >
            ZyLO Learning
          </Link>
          <MdOutlineCancel
            size={26}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        {/* 👤 USER SECTION */}
        <div className="p-4 border-b dark:border-gray-700">
          {user ? (
            <Link href="/profile" onClick={() => setOpen(false)}>
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar ? user.avatar.url : avatar}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="dark:text-white">{user.name}</span>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2 dark:text-white">
              <HiOutlineUserCircle size={26} />
              <span>Login</span>
            </div>
          )}
        </div>

        {/* 🔥 NAV ITEMS (IMPORTANT CHANGE) */}
        <NavItems isMobile={true} setOpen={setOpen} />

        {/* Footer */}
        <div className="absolute bottom-5 left-5">
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
            © 2026 ZyLO
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;