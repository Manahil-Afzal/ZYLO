"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import { HiOutlineSearch } from "react-icons/hi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE = "/assests/banner1.png";
const FALLBACK_TITLE = "Learn smarter with ZyLO";
const FALLBACK_SUBTITLE =
  "Find the right course, track your progress, and grow your skills.";
const FALLBACK_TAGLINE =
  "Explore courses in programming, design, business, and more.";

const Hero: FC = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const banner = data?.layout?.banner;

  const title = banner?.title || banner?.currentTitle || FALLBACK_TITLE;
  const subtitle =
    banner?.subtitle ||
    banner?.subTitle ||
    banner?.currentSubtitle ||
    FALLBACK_SUBTITLE;
  const tagline =
    banner?.tagline ||
    banner?.tagLine ||
    banner?.bottomText ||
    FALLBACK_TAGLINE;

  const imageCandidate = banner?.image || banner?.currentImage;
  const imageFromApi =
    typeof imageCandidate === "string"
      ? imageCandidate.trim()
      : imageCandidate?.url?.trim() || "";
  const imageSrc = imageFromApi || FALLBACK_IMAGE;
  const hasImage = imageSrc.trim().length > 0;

  const handleSearch = () => {
    const query = search.trim();
    if (!query) {
      return;
    }
    router.push(`/courses?title=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="w-full bg-transparent transition-colors duration-300">
          <div className="mx-auto w-[94%] sm:w-[92%] md:w-[90%] py-8 sm:py-10 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center">
              {/* Image Section */}
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <div className="relative w-full max-w-[560px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  {hasImage ? (
                    <Image
                      src={imageSrc}
                      alt="Learning illustration"
                      fill
                      className="object-cover transition duration-300 dark:brightness-75"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 dark:bg-gray-800" />
                  )}
                </div>
              </div>

              {/* Text Content Section */}
              <div className="order-1 md:order-2 min-w-0 flex flex-col justify-center text-center md:text-left md:pl-2">
                {/* Title: Using Slate colors to ensure visibility on both white and dark backgrounds */}
                <h1 className="text-[28px] sm:text-[36px] md:text-[54px] font-Poppins font-bold leading-[1.2] text-slate-800 dark:text-slate-100">
                  <span className="text-purple-700 dark:text-purple-400">
                    {" "}
                    {title}
                  </span>
                </h1>

                {/* Description: Josefin font + Light Gray color */}
                <p className="mx-auto md:mx-0 mt-3 sm:mt-4 text-[15px] sm:text-[16px] md:text-[19px] font-Josefin font-medium text-gray-500 dark:text-gray-400 max-w-[600px] leading-relaxed">
                  {subtitle}
                </p>

                {/* Search Bar Container */}
                <div className="mx-auto md:mx-0 mt-6 sm:mt-8 flex w-full max-w-[650px] items-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-white-300 shadow-lg">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="w-full bg-transparent px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base text-black dark:text-gray-600 placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="m-1.5 sm:m-2 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-linear-to-r from-black via-purple-950 to-purple-700 text-white transition hover:opacity-90"
                  >
                    <HiOutlineSearch size={20} />
                  </button>
                </div>

                {/* Bottom Tagline: Simple light gray */}
                <p className="mx-auto md:mx-0 mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[16px] text-gray-500 dark:text-gray-400 font-Josefin">
                  {tagline}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
