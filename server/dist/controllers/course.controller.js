"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAdminAllCourses = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const node_path_1 = __importDefault(require("node:path"));
const ejs_1 = __importDefault(require("ejs"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const axios_1 = __importDefault(require("axios"));
const mongoose_2 = require("mongoose");
const getStringId = (id) => {
    return Array.isArray(id) ? id[0] : id;
};
// import { getAllUsersService } from "../services/user.service";
// upload course 
// export const uploadCourse = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
//     try {
//         const data = req.body;
//         const thumbnail = data.thumbnail;
//         if(thumbnail){
//             const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
//                 folder: "courses"
//             });
//             data.thumbnail ={
//                 public_id: myCloud.public_id,
//                 url:myCloud.Secure_url
//             }
//         }
//         createCourse(data,res, next);
//     } catch (error:any) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// })
//upload course
exports.uploadCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = { ...(req.body || {}) };
        const thumbnailInput = data.thumbnail;
        const thumbnail = typeof thumbnailInput === "string"
            ? thumbnailInput.trim()
            : typeof thumbnailInput?.url === "string"
                ? thumbnailInput.url.trim()
                : typeof thumbnailInput?.path === "string"
                    ? thumbnailInput.path.trim()
                    : "";
        if (thumbnail) {
            try {
                const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                    folder: "courses"
                });
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                };
            }
            catch (uploadError) {
                const isRemoteUrl = /^https?:\/\//i.test(thumbnail);
                if (isRemoteUrl) {
                    data.thumbnail = {
                        public_id: "external-thumbnail",
                        url: thumbnail,
                    };
                }
                else {
                    throw uploadError;
                }
            }
        }
        await (0, course_service_1.createCourse)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// edit course
// export const editCourse = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
//     try {
//         const data = req.body;
//         const thumbnail = data.thumbnail;
//         if(thumbnail){
//             await cloudinary.v2.uploader.destroy(thumbnail.public_id);
//             const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
//                 folder: "courses"
//             });
//             data.thumbnail ={
//                 public_id: myCloud.public_id,
//                 url: myCloud.secure_url
//             }
//         }
//         const courseId = req.params.id;
//         const course = await CourseModel.findByIdAndUpdate(courseId,{
//             $set: data},
//             {new: true
//         } );
//         res.status(201).json({
//             success : true,
//             course,
//         })
//     } catch (error:any) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// })
exports.editCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        // Find the existing course first to get the OLD public_id
        const courseData = await course_model_1.default.findById(courseId);
        if (thumbnail && typeof thumbnail === "string" && !thumbnail.startsWith("http")) {
            // Delete old image using the public_id from the DATABASE, not the request
            if (courseData?.thumbnail?.public_id) {
                await cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        const course = await course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data
        }, { new: true });
        res.status(201).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get single course === without purchasing
exports.getSingleCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = getStringId(req.params.id);
        const isCacheExist = await redis_1.redis.get(courseId);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const course = await course_model_1.default.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis_1.redis.set(courseId, JSON.stringify(course), 'EX', 604800);
            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get all courses -- without purchasing
exports.getAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await course_model_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        res.status(200).json({
            success: true,
            courses
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get course content -- only for valid user
exports.getCourseByUser = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const dbUser = await user_model_1.default.findById(req.user?._id).select("courses");
        if (!dbUser) {
            return next(new ErrorHandler_1.default("please login to access this resource", 400));
        }
        const userCourseList = Array.isArray(dbUser.courses) ? dbUser.courses : [];
        const courseExists = userCourseList.some((course) => {
            const purchasedId = course?.courseId ?? course?._id ?? course;
            return purchasedId?.toString?.() === courseId.toString();
        });
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You are not eligible to access this courses", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addQuestion = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { question, courseId, contentId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        if (!question || !question.trim()) {
            return next(new ErrorHandler_1.default("Question is required", 400));
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const courseContent = course.courseData?.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        // create a new question object
        const newQuestion = {
            user: req.user?._id,
            question: question.trim(),
            questionReplies: [],
        };
        // add this question to our course content
        courseContent.questions.push(newQuestion);
        course.markModified("courseData");
        await notificationModel_1.default.create({
            user: new mongoose_2.Types.ObjectId(req.user._id.toString()),
            title: "New Question Received",
            message: `you have a new question from ${courseContent.title}`,
        });
        // save the updated courses
        await course.save();
        const savedContent = course.courseData.find((item) => item._id.equals(contentId));
        const savedQuestion = savedContent?.questions?.[savedContent.questions.length - 1];
        res.status(200).json({
            success: true,
            question: savedQuestion,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addAnswer = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const courseContent = course?.courseData?.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const question = courseContent?.questions?.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid question id", 400));
        }
        // create a new answer object
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date(),
        };
        // add this answer to our course content
        question.questionReplies.push(newAnswer);
        await course?.save();
        if (req.user?._id === question.user._id) {
            // create a notification 
            await notificationModel_1.default.create({
                user: new mongoose_2.Types.ObjectId(req.user._id.toString()),
                title: "New Question Reply Received",
                message: `You have a new question reply in ${courseContent.title}`
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            };
            const html = await ejs_1.default.renderFile(node_path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data,
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addReview = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const dbUser = await user_model_1.default.findById(req.user?._id).select("courses");
        if (!dbUser) {
            return next(new ErrorHandler_1.default("please login to access this resource", 400));
        }
        const userCourseList = Array.isArray(dbUser.courses) ? dbUser.courses : [];
        const courseExists = userCourseList.some((course) => {
            const purchasedId = course?.courseId ?? course?._id ?? course;
            return purchasedId?.toString?.() === courseId.toString();
        });
        if (!courseExists) {
            return next(new ErrorHandler_1.default("you are not eligible to access this course", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            comment: review,
            rating,
        };
        course.reviews.push(reviewData);
        let avg = 0;
        course.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        course.ratings = avg / course.reviews.length; // 9/2 = 4.5 ratings
        await course.save();
        await redis_1.redis.del(courseId.toString());
        // const notification = {
        //     title: "New Review Received",
        //     message: `${req.user?.name} has given a review in ${course?.name}`,
        // }
        await notificationModel_1.default.create({
            user: new mongoose_2.Types.ObjectId(req.user._id.toString()),
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`,
        });
        // create Notification
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addReplyToReview = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = course?.reviews.find((rev) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
            user: req.user,
            comment,
            createdAt: new Date(),
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        review.commentReplies?.push(replyData);
        await course.save();
        await redis_1.redis.del(courseId.toString());
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get all courses ---only for admin
exports.getAdminAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        (0, course_service_1.getAllCoursesService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// Delete user --only for admin
exports.deleteCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const id = getStringId(req.params.id);
        const course = await course_model_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("User not Found", 404));
        }
        await course.deleteOne();
        await redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//generate video url
exports.generateVideoUrl = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.body;
        const response = await axios_1.default.post(
        // `https://www.vdocipher.com/dashboard/config/apikeys`,
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
