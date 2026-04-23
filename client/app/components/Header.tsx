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
import {useSelector} from "react-redux";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import {toast} from "react-hot-toast";


type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, route, setOpen, open, setRoute }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {user} = useSelector((state:any) => state.auth);
  const pathname = usePathname();
  const {data} = useSession();
  const [socialAuth, {isSuccess, error}] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  // const {} = useLogOutQuery(undefined,{
  //   skip: !logout ? true : false,
  // });
               
useEffect(() => {
  if(!user) {
    if(data){
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data.user?.image,
      });
    }
  }
    if(data === null ){
      if(isSuccess){
        toast.success("Login Successfully");
      }
    }
    if(data === null){
        setLogout(true);                                
    }
}, [data, user]);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CRITICAL: Early return MUST be after all Hooks (useEffect/useState)
  if (!mounted) return null;

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-linear-to-r dark:bg-gray-800 dark:via-purple-950 dark:to-purple-700 bg-white fixed top-0 left-0 w-full h-20 z-80 border-b dark:border-purple-900 border-gray-200 shadow-xl transition duration-500"
            : "w-full dark:bg-linear-to-r dark:bg-gray-800 dark:via-purple-950 dark:to-purple-700 bg-white border-b dark:border-purple-900 border-gray-200 h-20 z-80 shadow"
        }`}
      >
        <div className="w-[95%] m-auto py-2 h-full">
          <div className="w-full h-20 flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-medium text-black dark:text-white"
              >
                ZyLO Learning
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex">
                <NavItems activeItem={activeItem} isMobile={false} />
              </div>

              <ThemeSwitcher />

              {/* Mobile Sidebar Trigger */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* Login Modal Trigger */}
             {
              user ? (
                  <Link href={"/profile"}>
                 <Image
                 src={user.avatar ? user.avatar.url : avatar}
                 alt="User avatar"
                 width={30}
                 height={30}
                 className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"  
                 style={{ border: pathname === "/profile" ? "2px solid #8B5CF6" : "none" }}
                 />
                   </Link>
              ) : (
                 <HiOutlineUserCircle
                size={25}
                className="hidden md:block cursor-pointer dark:text-white text-black"
                onClick={() => {
                  if (setOpen) setOpen(true);
                  setRoute("Login");
                }}
              />
              )
             }
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal Logic */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen!}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
       {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen!}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      
       {route === "verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen!}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}

      {/* Mobile Sidebar */}
      <MobileSidebar
        activeItem={activeItem}
        open={openSidebar}
        setOpen={setOpenSidebar}
      />
    </div>
  );
};

export default Header;
