"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";

type CourseItem = {
  _id: string;
  name: string;
  categories?: string;
  thumbnail: { url: string };
  ratings?: number;
  purchased?: number;
  price: number;
  estimatedPrice?: number;
  courseData?: Array<unknown>;
};

type CategoryItem = {
  _id?: string;
  title?: string;
};

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title")?.trim() || "";
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const courses = useMemo(() => {
    const allCourses: CourseItem[] = data?.courses ?? [];

    let filteredCourses = allCourses;

    if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (item) => (item.categories || "").toLowerCase() === category.toLowerCase(),
      );
    }

    if (search) {
      filteredCourses = filteredCourses.filter((item) =>
        (item.name || "").toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filteredCourses;
  }, [data, category, search]);

  const categories: CategoryItem[] = categoriesData?.layout?.categories ?? [];

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[90%] 800px:w-[80%] m-auto min-h-[70vh]">
            <Heading
              title={"All Courses - ZyLO learning"}
              description={"ZyLO Learning is Learning Plateform"}
              keywords={
                "programming community, coding skills, expert insightes, collaboration, Growth"
              }
            />
            <br />
            <div className="w-full flex flex-nowrap overflow-x-auto pb-2 gap-2 px-2 sm:flex-wrap sm:pb-0 sm:gap-3 sm:px-4 md:gap-4 md:px-6 scrollbar-thin scrollbar-thumb-gray-400/50 dark:scrollbar-thumb-gray-500/50 hover:scrollbar-thumb-gray-500/70 dark:hover:scrollbar-thumb-gray-400/70">
              <div
                className={`flex-shrink-0 h-8 px-2 text-xs rounded-full flex items-center justify-center font-Poppins font-medium cursor-pointer shadow-sm transition-all duration-200 sm:h-9 sm:px-3 sm:text-sm md:h-[35px] md:px-4 md:text-base ${
                  category === "All"
                    ? "bg-purple-400 text-white shadow-md !border-2 !border-purple-400"
                    : "bg-gray-100/80 hover:bg-gray-200 text-gray-800 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300 hover:shadow-sm dark:bg-white/10 dark:border-white/20 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-white dark:hover:border-white/30"
                }`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: CategoryItem, index: number) => (
                  <div key={item._id || index}>
                    <div
                      className={`flex-shrink-0 h-8 px-2 text-xs rounded-full flex items-center justify-center font-Poppins font-medium cursor-pointer shadow-sm transition-all duration-200 sm:h-9 sm:px-3 sm:text-sm md:h-[35px] md:px-4 md:text-base ${
                        category === item.title
                          ? "bg-purple-400 text-white shadow-md !border-2 !border-purple-400"
                          : "bg-gray-100/80 hover:bg-gray-200 text-gray-800 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300 hover:shadow-sm dark:bg-white/10 dark:border-white/20 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-white dark:hover:border-white/30"
                      }`}
                      onClick={() => setCategory(item.title || "All")}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
               {
                courses && courses.length === 0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                      {search ? "No Course Found" : "No course found in this category. please try another one"}
                    </p>
                )
               }
               <br />
               <br />
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {
                        courses && 
                    courses.map((item: CourseItem, index:number) => (
                            <CourseCard item={item} key={index} />
                        ))
                    }
               </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
