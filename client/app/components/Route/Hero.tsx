"use client";
import React from "react";
import Image from "next/image";
import { HiOutlineSearch } from "react-icons/hi";

const Hero = () => {
    return (
        // We use bg-transparent to let your globals.css background take control
        <section className="w-full bg-transparent transition-colors duration-300">
            <div className="w-[95%] md:w-[90%] mx-auto py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                    
                    {/* Image Section */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <Image
                                src="/assests/banner1.png"
                                alt="Learning illustration"
                                fill
                                className="object-cover transition duration-300 dark:brightness-75"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Content Section */}
                    <div className="flex flex-col justify-center md:pl-2">
                        {/* Title: Using Slate colors to ensure visibility on both white and dark backgrounds */}
                        <h1 className="text-[32px] md:text-[54px] font-Poppins font-bold leading-tight text-slate-800 dark:text-slate-100">
                            <span className="text-purple-700 dark:text-purple-400"> 𝐿𝑒𝑎𝑟𝑛 𝑠𝑚𝑎𝑟𝑡𝑒𝑟 𝑤𝑖𝑡ℎ 𝑍𝑦𝐿𝑂</span>
                        </h1>

                        {/* Description: Josefin font + Light Gray color */}
                        <p className="mt-4 text-[16px] md:text-[19px] font-Josefin font-medium text-gray-500 dark:text-gray-400 max-w-[600px] leading-relaxed">
                            Find the right course, track your progress, and grow your skills with simple search and personalized learning support.
                        </p>

                        {/* Search Bar Container */}
                        <div className="mt-8 flex w-full max-w-[650px] items-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white-300 shadow-lg">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full bg-transparent px-5 py-4 outline-none text-black dark:text-gray-600 placeholder:text-gray-500"
                            />
                            <button className="m-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-black via-purple-950 to-purple-700 text-white transition hover:opacity-90">
                                <HiOutlineSearch size={22} />
                            </button>
                        </div>

                        {/* Bottom Tagline: Simple light gray */}
                        <p className="mt-5 text-[14px] md:text-[16px] text-gray-500 dark:text-gray-400 font-Josefin">
                            Explore courses in programming, design, business, and more.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;