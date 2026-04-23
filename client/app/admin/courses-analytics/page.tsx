'use client'
import React from 'react';
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar';
import Heading from '../../../app/utils/Heading';
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';
import CourseAnalytics from '../../components/Admin/Analytics/CourseAnalytics';

const Page = () => {
  return (
    <div>
      <Heading
        title='ZyLO Learning - Admin'
        description='Edit your course details in ZyLO Learning'
        keywords='Programming, MERN, Redux, Machine Learning'
      />
      <div className="flex">
        <div className="1500px:w-[20%] w-[22%]">
          <AdminSidebar />
        </div>
        <div className="w-[78%]">
          <DashboardHeader />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Page;
