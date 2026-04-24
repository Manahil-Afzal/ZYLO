"use client";
import Link from "next/link";
import "../globals.css";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import MobileSidebar from "./MobileSidebar";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({
  activeItem,
  route,
  setOpen,
  open,
  setRoute,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user } = useSelector((state: any) => state.auth);
  const pathname = usePathname();
  const { data } = useSession();

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  // Social auth (Google login)
  useEffect(() => {
    if (!user && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
    }

    if (data === null && isSuccess) {
      toast.success("Login Successfully");
    }

    if (data === null) {
      setLogout(true);
    }
  }, [data, user]);

  // mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // scroll header effect
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full relative">
      {/* HEADER */}
      <div
        className={`${
          active
            ? "bg-white dark:bg-gray-800 fixed top-0 left-0 w-full h-20 z-50 border-b dark:border-purple-900 shadow-lg"
            : "w-full bg-white dark:bg-gray-800 h-20 border-b dark:border-purple-900"
        }`}
      >
        <div className="w-[95%] m-auto h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            href="/"
            className="text-[22px] font-Poppins font-medium dark:text-white"
          >
            ZyLO Learning
          </Link>

          {/* NAV ITEMS */}
          <div className="hidden md:flex">
            <NavItems activeItem={activeItem} isMobile={false} />
          </div>

          <div className="flex items-center gap-4">

            {/* THEME */}
            <ThemeSwitcher />

            {/* MOBILE MENU */}
            <div className="md:hidden">
              <HiOutlineMenuAlt3
                size={26}
                className="cursor-pointer dark:text-white"
                onClick={() => setOpenSidebar(true)}
              />
            </div>

            {/* USER / LOGIN */}
            {user ? (
              <Link href="/profile">
                <Image
                  src={user.avatar ? user.avatar.url : avatar}
                  alt="user"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-full object-cover cursor-pointer"
                  style={{
                    border:
                      pathname === "/profile"
                        ? "2px solid #8B5CF6"
                        : "none",
                  }}
                />
              </Link>
            ) : (
              <HiOutlineUserCircle
                size={26}
                className="cursor-pointer dark:text-white"
                onClick={() => {
                  setOpen?.(true);
                  setRoute("Login");
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen!}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}

      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen!}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen!}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        activeItem={activeItem}
        open={openSidebar}
        setOpen={setOpenSidebar}
        user={user}
      />
    </div>
  );
};

export default Header;