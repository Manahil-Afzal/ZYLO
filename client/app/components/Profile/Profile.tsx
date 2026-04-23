"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import "../../globals.css";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ProfileInfo from "../Profile/ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState<string | null>(null);
  const [logOut] = useLogOutMutation();
  const router = useRouter();
  const [Courses, setCourses] = useState<any[]>([]);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    try {
      await signOut({ redirect: false });
      await logOut().unwrap();
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: any) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data?.courses && user?.courses && user.courses.length > 0) {
      const filteredCourses = user.courses
        .map((userCourse: any) => {
          const userCourseId =
            typeof userCourse === "string"
              ? userCourse
              : userCourse.courseId || userCourse._id;
          return data.courses.find(
            (course: any) => String(course._id) === String(userCourseId),
          );
        })
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    } else {
      setCourses([]);
    }
  }, [data, user]);

  return (
    <div className="w-full flex flex-row justify-center mx-auto gap-4 800px:gap-10 pb-10 min-h-screen">
      <div className="w-[98%] 800px:w-[95%] max-w-[1200px] flex flex-row gap-4 800px:gap-10">
        
        {/* Sidebar Container */}
        <div
          className={`transition-all duration-300 z-[999] h-max 
            sticky top-[100px] /* Kept at 100px to avoid hitting the top of the browser */
            
            /* Specific height/margin for Courses tab */
            ${active === 3 ? "mt-40" : "mt-30"}
            
            /* FIX: Desktop width is now STATIC (390px for courses, 310px others) */
            /* It NO LONGER changes based on the 'scroll' variable on desktop */
            ${active === 3 
                ? "w-[160px] 800px:w-[390px]" 
                : "w-[160px] 800px:w-[310px]"
            }

            bg-white dark:bg-[#111c43] 800px:bg-transparent
            rounded-[10px] border dark:border-[#ffffff1d] 800px:border-none
          `}
          style={{ touchAction: "pan-y" }}
        >
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
            /* Pass scroll only for internal UI states, not for container layout */
            isScrolling={scroll}
          />
        </div>

        {/* Content Area */}
        <div className={`flex-1 transition-all duration-200 ${active === 3 ? "mt-32" : "mt-20"}`}>
          {active === 1 && (
            <div className="w-full">
              <ProfileInfo avatar={avatar} user={user} />
            </div>
          )}

          {active === 2 && (
            <div className="w-full">
              <ChangePassword avatar={avatar} user={user} />
            </div>
          )}

          {active === 3 && (
            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center items-center h-[200px]">
                  <p className="dark:text-white">Loading...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {Courses.length > 0 ? (
                    Courses.map((item: any, index: number) => (
                      <CourseCard
                        item={item}
                        key={index}
                        user={user}
                        isProfile={true}
                      />
                    ))
                  ) : (
                    <h1 className="text-center text-[18px] font-Poppins col-span-full mt-10 dark:text-white">
                      No enrolled courses found.
                    </h1>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;