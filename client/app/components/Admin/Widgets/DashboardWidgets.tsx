"use client";
import React, { FC, useMemo } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
};

type CircularProgressWithLabelProps = {
  open?: boolean;
  value: number;
};

type CompareStat = {
  currentMonth: number;
  percentChange: number;
};

const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = ({
  open,
  value,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        thickness={4}
        sx={{ color: "#c084fc", zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c084fc",
          fontSize: "12px",
        }}
      >
        {value === 100 ? "100%" : "0%"}
      </Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const { data } = useGetUsersAnalyticsQuery({});
  const { data: ordersData } = useGetOrdersAnalyticsQuery({});

  const userComparePercentage = useMemo<CompareStat>(() => {
    const usersLastTwoMonths = data?.users?.last12Months?.slice(-2) ?? [];
    const usersCurrentMonth = usersLastTwoMonths[1]?.count ?? 0;
    const usersPreviousMonth = usersLastTwoMonths[0]?.count ?? 0;
    const usersPercentChange =
      usersPreviousMonth !== 0
        ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100
        : usersCurrentMonth > 0
          ? 100
          : 0;

    return {
      currentMonth: usersCurrentMonth,
      percentChange: usersPercentChange,
    };
  }, [data]);

  const ordersComparePercentage = useMemo<CompareStat>(() => {
    const ordersLastTwoMonths =
      ordersData?.orders?.last12Months?.slice(-2) ?? [];
    const ordersCurrentMonth = ordersLastTwoMonths[1]?.count ?? 0;
    const ordersPreviousMonth = ordersLastTwoMonths[0]?.count ?? 0;
    const ordersPercentChange =
      ordersPreviousMonth !== 0
        ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
          100
        : ordersCurrentMonth > 0
          ? 100
          : 0;

    return {
      currentMonth: ordersCurrentMonth,
      percentChange: ordersPercentChange,
    };
  }, [ordersData]);

  return (
  
 <div className="mt-[30px] min-h-screen px-4 1200px:px-10 pb-10">

  <div className="flex flex-row gap-8 items-start">
    
    {/* LEFT COLUMN: Both Charts (Stacked Vertically) */}
    <div className="w-[70%] flex flex-col gap-8">
      {/* User Analytics Chart */}
      <div className="w-full dark:bg-[#111c43] h-[45vh] shadow-sm rounded-md p-6 bg-white">
         <UserAnalytics isDashboard={true} />
      </div>

      {/* Orders Analytics Chart */}
      <div className="w-full dark:bg-[#111c43] h-[45vh] shadow-sm rounded-md p-6 bg-white">
        <OrdersAnalytics isDashboard={true} />
      </div>
    </div>

    {/* RIGHT COLUMN: Stats Cards + Transactions */}
    <div className="w-[30%] mt-20 flex flex-col gap-8">
      
      {/* Stats Section */}
      <div className="flex flex-col gap-5">
        {/* Sales Card */}
        <div className="w-full dark:bg-[#111C43] bg-white rounded-md shadow-lg p-5 flex items-center justify-between">
          <div className="flex flex-col">
            <BiBorderLeft className="dark:text-[#c084fc] text-black text-[28px]" />
            <h5 className="pt-2 font-Poppins dark:text-white text-black text-[18px] font-semibold">
              {ordersComparePercentage?.currentMonth}
            </h5>
            <h5 className="py-2 font-Poppins dark:text-[#c084fc] text-gray-500 text-[13px]">
              Sales Obtained
            </h5>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgressWithLabel
              value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
              open={open}
            />
            <h5 className="pt-1 dark:text-white text-[11px]">
              {ordersComparePercentage?.percentChange > 0 ? "+" : ""}
              {ordersComparePercentage?.percentChange?.toFixed(2)}%
            </h5>
          </div>
        </div>

        {/* New Users Card */}
        <div className="w-full dark:bg-[#111C43] bg-white rounded-md shadow-lg p-5 flex items-center justify-between">
          <div className="flex flex-col">
            <PiUsersFourLight className="dark:text-[#c084fc] text-black text-[28px]" />
            <h5 className="pt-2 font-Poppins dark:text-white text-black text-[18px] font-semibold">
              {userComparePercentage?.currentMonth}
            </h5>
            <h5 className="py-2 font-Poppins dark:text-[#c084fc] text-gray-500 text-[13px]">
              New Users
            </h5>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgressWithLabel
              value={userComparePercentage?.percentChange > 0 ? 100 : 0}
              open={open}
            />
            <h5 className="pt-1 dark:text-white text-[11px]">
              {userComparePercentage?.percentChange > 0 ? "+" : ""}
              {userComparePercentage?.percentChange?.toFixed(2)}%
            </h5>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="w-full">
        <h5 className="dark:text-white text-black text-[19px] font-medium font-Poppins pb-1 px-1">
          Recent Transactions
        </h5>
        <div className="dark:bg-[#111C43] rounded-md shadow-sm overflow-hidden h-[35vh]">
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default DashboardWidgets;
