import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", updateAccessToken, isAuthenticated, authorizeRoles("admin"), uploadCourse);

courseRouter.put("/edit-course/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id",  getSingleCourse);

courseRouter.get("/get-course",  getAllCourses);

courseRouter.get("/get-admin-Courses", isAuthenticated, authorizeRoles("admin"),  getAdminAllCourses);

courseRouter.get("/get-course-content/:id", updateAccessToken, isAuthenticated,  getCourseByUser);

courseRouter.put("/add-question", updateAccessToken, isAuthenticated,  addQuestion);

courseRouter.put("/add-answer", updateAccessToken, isAuthenticated,  addAnswer);

courseRouter.put("/add-review/:id", updateAccessToken, isAuthenticated,  addReview);

courseRouter.put("/add-reply", updateAccessToken, isAuthenticated, addReplyToReview);

courseRouter.get("/get-courses", isAuthenticated, authorizeRoles("admin"), getAllCourses);

courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

courseRouter.delete("/delete-course/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteCourse);




export default courseRouter;                                   