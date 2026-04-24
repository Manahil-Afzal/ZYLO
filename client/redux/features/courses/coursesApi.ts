import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getSingleCourse: builder.query({
      query: (id) => ({
        url: `courses/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `courses/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
     getCourseDetails: builder.query({
      query: (id) => ({
        url: `courses/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query:(id) =>({
        url: `courses/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      })
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
        url: "courses/add-question",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addAnswer: builder.mutation({
      query: (data) => ({
        url: "courses/add-answer",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ courseId, review, rating }) => ({
        url: `courses/add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReply: builder.mutation({
      query: (data) => ({
        url: "courses/add-reply",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useEditCourseMutation,
  useDeleteCourseMutation,
  useGetUserAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReplyMutation,
} = courseApi;
