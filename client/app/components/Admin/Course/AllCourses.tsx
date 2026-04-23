"use client";

import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from '@/app/utils/theme-provider';
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FiEdit2 } from 'react-icons/fi';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import { toast } from 'react-hot-toast';

type CourseItem = {
  _id: string;
  name: string;
  ratings: number;
  purchased: number;
  createdAt?: string;
  created_at?: string;
};

type CoursesResponse = {
  courses?: CourseItem[];
};

type CourseRow = {
  id: string;
  title: string;
  ratings: number;
  purchased: number;
  created_at: string;
};

type ApiError = {
  data?: {
    message?: string;
  };
};

const Courses = () => {
  const { theme } = useTheme();

  const { isLoading, data, refetch } = useGetAllCoursesQuery({}) as {
    isLoading: boolean;
    data?: CoursesResponse;
    refetch: () => void;
  };

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const [deleteTarget, setDeleteTarget] = useState<CourseRow | null>(null);

  const rows: CourseRow[] = (data?.courses || []).map((item: CourseItem) => ({
    id: item._id,
    title: item.name,
    ratings: item.ratings,
    purchased: item.purchased,
    created_at: format(item.createdAt || item.created_at || new Date().toISOString()),
  }));

  const handleDeleteCourse = async () => {
    if (!deleteTarget) return;

    try {
      await deleteCourse(deleteTarget.id).unwrap();
      toast.success("Course deleted successfully");
      setDeleteTarget(null);
      refetch();
    } catch (error) {
      const errorMessage = (error as ApiError)?.data?.message || "Failed to delete course";
      toast.error(errorMessage);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      sortable: false,
      filterable: false,
      renderCell: (params: { row: CourseRow }) => (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            window.location.href = `/admin/edit-course/${params.row.id}`;
          }}
        >
          <FiEdit2 className='dark:text-white text-black' size={20} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      sortable: false,
      filterable: false,
      renderCell: (params: { row: CourseRow }) => (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            setDeleteTarget(params.row);
          }}
        >
          <AiOutlineDelete className='dark:text-white text-black' size={20} />
        </Button>
      ),
    },
  ];

  return (
    <div className='mt-[120px]'>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ m: "20px" }}>

          {/* Modal */}
          <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 380,
                backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
                borderRadius: "8px",
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2 style={{ marginBottom: "10px", color: theme === "dark" ? "#fff" : "#000" }}>
                Do you want to delete this course?
              </h2>

              <p style={{ marginBottom: "20px", color: theme === "dark" ? "#d1d5db" : "#4b5563" }}>
                {deleteTarget?.title}
              </p>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  onClick={() => setDeleteTarget(null)}
                  sx={{
                    color: theme === "dark" ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    textTransform: "none",
                  }}
                >
                  No
                </Button>

                <Button
                  onClick={handleDeleteCourse}
                  disabled={isDeleting}
                  sx={{
                    backgroundColor: "#a855f7",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#9333ea",
                    },
                  }}
                >
                  {isDeleting ? "Deleting..." : "Yes"}
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* MOBILE RESPONSIVE WRAPPER (UNCHANGED LOGIC) */}
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box
              sx={{
                minWidth: {
                  xs: "900px",
                  md: "100%",
                },
              }}
            >
              <Box
                sx={{
                  m: "40px 0 0 0",
                  height: "80vh",

                  "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                  },

                  "& .MuiDataGrid-row": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderBottom:
                      theme === "dark"
                        ? "1px solid #ffffff30!important"
                        : "1px solid #ccc!important",
                  },

                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "transparent !important",
                  },

                  /* ✅ HEADER */
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#c084fc !important",
                    color: "#000",
                  },

                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#c084fc !important",
                  },

                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#000 !important",
                  },

                  /* ❗ FIXED FOOTER */
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "#c084fc !important",
                    color: "#000",
                  },

                  "& .MuiTablePagination-root": {
                    color: "#000",
                  },

                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor:
                      theme === "dark" ? "#1F2A40" : "#F2F0F0",
                  },
                }}
              >
                <DataGrid
                  checkboxSelection
                  disableRowSelectionOnClick
                  rows={rows}
                  columns={columns}
                />
              </Box>
            </Box>
          </Box>

        </Box>
      )}
    </div>
  );
};

export default Courses;