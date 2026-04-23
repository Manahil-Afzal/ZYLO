'use client'
import { useMemo } from "react";
import { useTheme } from "./theme-provider";
import {BiMoon, BiSun} from "react-icons/bi";

export const ThemeSwitcher = () =>{
    const {theme, setTheme} = useTheme();
    const isClient = useMemo(() => typeof window !== "undefined", []);

    if(!isClient){return null}

    return (
        <div className="flex items-center justify-center mx-4">
             {
                theme === "light" ? (
                    <BiMoon
                    className="cursor-pointer text-black dark:text-white"
                    size={25}
                    onClick={() => setTheme("dark")} />
                ) : (
                    <BiSun 
                    size={25}
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => setTheme("light")}
                    />
                )
             }
        </div>
    );
};


