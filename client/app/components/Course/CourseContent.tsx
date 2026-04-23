import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import CourseContentList from './CourseContentList';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseContentMedia from "./CourseContentMedia";

type Props = {
    id: string;
}

const CourseContent = ({id}: Props) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, {refetchOnMountOrArgChange: true});
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  const data = contentData?.content;
  const user = userData?.user;

  const [activeVideo, setActiveVideo] = useState(0);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
        <div className="w-full py-10 text-center text-black dark:text-white">
          No course content available.
        </div>
      </>
    );
  }

  return (
      <>
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
          </div>
      </>
  )
}

export default CourseContent