"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

type ApiError = {
  data?: {
    message?: string;
  };
};

type CourseContentItem = {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength?: string;
  links: { title: string; url: string }[];
  suggestion: string;
};

type CourseItem = {
  _id: string;
  name: string;
  description: string;
  price: string | number;
  estimatedPrice?: string | number;
  tags: string;
  level: string;
  categories?: string;
  demoUrl: string;
  thumbnail?: { url?: string };
  benefits?: { title: string }[];
  prerequisites?: { title: string }[];
  courseData?: CourseContentItem[];
};

type CoursesResponse = {
  courses?: CourseItem[];
};

type CourseInfoState = {
  name: string;
  description: string;
  price: string | number;
  estimatedPrice: string | number;
  tags: string;
  level: string;
  categories: string;
  demoUrl: string;
  thumbnail: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, isLoading } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  ) as { data?: CoursesResponse; isLoading: boolean };

  const selectedCourseId = String(id || "");

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfoState>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState<{ title: string }[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<{ title: string }[]>([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState<CourseContentItem[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<Record<string, unknown>>({});

  const editCourseData = (data?.courses || []).find((item) => String(item._id) === selectedCourseId);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      router.push("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as ApiError;
        toast.error(errorMessage.data?.message || "Failed to update course");
      }
    }
  }, [isSuccess, error, router]);

  useEffect(() => {
    if (editCourseData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice || "",
        tags: editCourseData.tags,
        level: editCourseData.level,
        categories: editCourseData.categories || "",
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url || "",
      });
      setBenefits(Array.isArray(editCourseData.benefits) && editCourseData.benefits.length ? editCourseData.benefits : [{ title: "" }]);
      setPrerequisites(Array.isArray(editCourseData.prerequisites) && editCourseData.prerequisites.length ? editCourseData.prerequisites : [{ title: "" }]);
      setCourseContentData(
        Array.isArray(editCourseData.courseData) && editCourseData.courseData.length
          ? editCourseData.courseData.map((item) => ({
              ...item,
              links:
                Array.isArray(item.links) && item.links.length
                  ? item.links
                  : [{ title: "", url: "" }],
            }))
          : [
              {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: "Untitled Section",
                videoLength: "",
                links: [{ title: "", url: "" }],
                suggestion: "",
              },
            ]
      );
    }
  }, [editCourseData]);

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        videoLength: courseContent.videoLength,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    //   prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,              
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    const data = courseData;
    if (!editCourseData?._id) {
      toast.error("Course not found for editing");
      return;
    }
    await editCourse({ id: editCourseData._id, data });
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading course data...</div>
      </div>
    );
  }

  if (!isLoading && !editCourseData) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-xl">Course not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={Array.isArray(courseContentData) ? courseContentData : []}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;