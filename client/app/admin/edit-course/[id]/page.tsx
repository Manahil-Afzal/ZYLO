'use client'
import React from 'react';
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '../../../../app/utils/Heading';
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from '../../../components/Admin/Course/EditCourses';
import { useParams } from 'next/navigation';

const Page = () => {
     const params = useParams<{ id: string }>();
     const id = params?.id || "";
  return (
    <div>
      <Heading 
        title='ZyLO Learning - Edit Course'
        description='Edit your course details in ZyLO Learning'
        keywords='Programming, MERN, Redux, Machine Learning'
      />
      <div className="flex">
        <div className="1500px:w-[20%] w-[22%]">
          <AdminSidebar />
        </div>
        <div className="w-[78%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
