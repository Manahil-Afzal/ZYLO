"use client";
import { FC, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/utils/theme-provider";
import Cookies from "js-cookie";

interface itemProps {
  title: string;
  to: string;
  icon: React.ReactElement;
  active: boolean;
  theme: string | undefined;
}

type SidebarUser = {
  name?: string;
  role?: string;
  avatar?: {
    url?: string;
  };
};

type RootState = {
  auth: {
    user?: SidebarUser;
  };
};

const Item: FC<itemProps> = ({ title, to, icon, active, theme }) => {
  const activeColor = theme === "dark" ? "#c084fc" : "#9333ea";
  const hoverBg = theme === "dark" ? "rgba(192,132,252,0.14)" : "rgba(168,85,247,0.12)";
  const activeBg = theme === "dark" ? "rgba(192,132,252,0.2)" : "rgba(168,85,247,0.18)";

  return (
    <MenuItem
      active={active}
      icon={icon}
      component={<Link href={to} />}
      rootStyles={{
        ".ps-menu-button": {
          borderRadius: "10px",
          color: theme === "dark" ? "#fff" : "#111827",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: `${hoverBg} !important`,
            color: `${activeColor} !important`,
          },
        },
        ".ps-menu-icon": {
          color: "inherit",
        },
        ".ps-active .ps-menu-button": {
          backgroundColor: `${activeBg} !important`,
          color: `${activeColor} !important`,
          fontWeight: 600,
        },
        ".ps-active .ps-menu-icon": {
          color: `${activeColor} !important`,
        },
      }}
    >
      <Typography className="text-[16px]! font-Poppins!">
        {title}
      </Typography>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const updateScreenState = () => {
const smallScreen = window.innerWidth <= 768;
      setIsSmallScreen(smallScreen);

      if (smallScreen) {
        setIsCollapsed(true);
      }
    };

    updateScreenState();
    window.addEventListener("resize", updateScreenState);

    return () => window.removeEventListener("resize", updateScreenState);
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  const logoutHandler = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.reload();
  };

  const isRouteActive = (route: string) => {
    if (!pathname) {
      return false;
    }
    if (route === "/admin") return pathname === "/admin";
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        "& .ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent",
        },
        "& .ps-menu-icon": {
          backgroundColor: "transparent !important",
          color: theme === "dark" ? "#fff" : "#111827",
        },
        "& .ps-menu-root": {
          color: theme === "dark" ? "#fff" : "#111827",
        },
      }}
      className="bg-white! dark:bg-[#111C43]"
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
width: isCollapsed ? (isSmallScreen ? "0px" : "80px") : isSmallScreen ? "320px" : "16%",
          // Prominent line for light mode, transparent for dark mode
          borderRight: theme === "dark" ? "none" : "1px solid #e5e7eb",
          borderTop: "none",
          borderBottom: "none",
          borderLeft: "none",
        }}
      >
        <Menu>
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
            }}
            rootStyles={{
              ".ps-menu-button": {
                backgroundColor: "transparent !important",
                "&:hover": {
                  backgroundColor: "transparent !important",
                },
              },
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
ml: isSmallScreen ? "10px" : "15px",
                  width: "100%",
                  pr: "6px",
                }}
              >
                <Link href="/" className="block">
                  <h3 className={`font-Poppins uppercase dark:text-white text-black leading-none ${isSmallScreen ? 'text-[20px]' : 'text-[26px]'}`}>
                    ZyLO Learning
                  </h3>
                </Link>
                <IconButton
                  type="button"
                  aria-label="Collapse sidebar"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                  sx={{ mr: "-14px" }}
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image
                  alt="profile-user"
width={isSmallScreen ? 60 : 80}
                  height={isSmallScreen ? 60 : 80}
                  src={user?.avatar?.url || avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
className={`!text-[${isSmallScreen ? '16px' : '20px'}] text-black dark:text-[#ffffffc1]`}
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ paddingLeft: isCollapsed ? undefined : "6%" }}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              active={isRouteActive("/admin")}
              theme={theme}
            />

            <Typography
              variant="h5"
              sx={{ m: "12px 0 5px 12px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/users")}
              theme={theme}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={
                <ReceiptOutlinedIcon className="text-black dark:text-white" />
              }
              active={isRouteActive("/admin/invoices")}
              theme={theme}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "12px 0 5px 12px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/create-course")}
              theme={theme}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={
                <OndemandVideoIcon className="text-black dark:text-white" />
              }
              active={isRouteActive("/admin/courses")}
              theme={theme}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "12px 0 5px 12px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/hero")}
              theme={theme}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/faq")}
              theme={theme}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/categories")}
              theme={theme}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "12px 0 5px 12px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={
                <PeopleOutlinedIcon className="text-black dark:text-white" />
              }
              active={isRouteActive("/admin/team")}
              theme={theme}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "12px 0 5px 12px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={
                <BarChartOutlinedIcon className="text-black dark:text-white" />
              }
              active={isRouteActive("/admin/courses-analytics")}
              theme={theme}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon className="text-black dark:text-white" />}
              active={isRouteActive("/admin/orders-analytics")}
              theme={theme}
            />

            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={
                <ManageHistoryIcon className="text-black dark:text-white" />
              }
              active={isRouteActive("/admin/users-analytics")}
              theme={theme}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "12px 0 5px 12px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon className="text-black dark:text-white" />}
                active={false}
                theme={theme}
              />
            </div>
          </Box>
        </Menu>
      </Sidebar>

      {isCollapsed && (
        <IconButton
          type="button"
          aria-label="Open sidebar"
          onClick={() => setIsCollapsed(false)}
          sx={{
            position: "fixed",
            left: isSmallScreen ? "12px" : "40px",
            transform: isSmallScreen ? "none" : "translateX(-50%)",
            top: isSmallScreen ? "12px" : "24px",
            zIndex: 100000000000000,
            width: isSmallScreen ? "36px" : "40px",
            height: isSmallScreen ? "36px" : "40px",
            borderRadius: "9999px",
            backgroundColor: theme === "dark" ? "#6870fa" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default AdminSidebar;