import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type LessonItem = {
  _id: string;
  title: string;
  videoSection: string;
  videoLength: number | string;
};

type Props = {
  data?: LessonItem[];
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const getSafeMinutes = (value: unknown): number => {
    if (typeof value === "number") {
      return Number.isFinite(value) && value >= 0 ? value : 0;
    }

    if (typeof value !== "string") {
      return 0;
    }

    const raw = value.trim().toLowerCase();
    if (!raw) {
      return 0;
    }

    const normalized = raw.replace(";", ":");

    const colonMatch = normalized.match(/(\d+)\s*:\s*(\d{1,2})(?:\s*:\s*(\d{1,2}))?/);
    if (colonMatch) {
      const first = Number(colonMatch[1]);
      const second = Number(colonMatch[2]);
      const third = colonMatch[3] ? Number(colonMatch[3]) : 0;

      if (colonMatch[3]) {
        return first * 60 + second + third / 60;
      }

      return first * 60 + second;
    }

    const hourPart = normalized.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)\b/);
    const minutePart = normalized.match(/(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes|mint|mints)\b/);
    if (hourPart || minutePart) {
      const hours = hourPart ? Number(hourPart[1]) : 0;
      const minutes = minutePart ? Number(minutePart[1]) : 0;
      const total = hours * 60 + minutes;
      return Number.isFinite(total) && total >= 0 ? total : 0;
    }

    const numeric = Number(normalized);
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
  };

  const formatDuration = (minutesInput: number): string => {
    const totalMinutes = Math.round(minutesInput);
    if (totalMinutes <= 0) {
      return "0 minutes";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) { 
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }

    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  const courseData = props.data ?? [];

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(courseData.map((item: LessonItem) => item.videoSection)),
  ];

  let totalCount: number = 0; 

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] sticky top-24 left-0 z-30'}`}>
      {videoSections.map((section: string) => {

        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideos: LessonItem[] = courseData.filter(
          (item: LessonItem) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; // Number of videos in the current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: LessonItem) =>
            totalLength + getSafeMinutes(item.videoLength),
          0
        );
        const sectionStartIndex: number = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos

        return (
          <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex justify-between items-center"
              >
                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons ·{" "}
              {formatDuration(sectionVideoLength)}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: LessonItem, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const lessonMinutes = getSafeMinutes(item.videoLength);
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() => props?.setActiveVideo?.(videoIndex)}
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px] inline-block wrap-break-word text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {formatDuration(lessonMinutes)}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;