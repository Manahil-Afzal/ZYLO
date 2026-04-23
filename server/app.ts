import dotenv from "dotenv";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import {rateLimit} from 'express-rate-limit';
import { ErrorMiddleware } from "./middleware/error";
import * as userRouter from "./routes/user.route";
import * as courseRouter from "./routes/course.route";
import * as orderRouter from "./routes/order.route";
import * as notificationRouter from "./routes/notification.route";
import * as analyticsRouter from "./routes/analytics.route";
import * as layoutRouter from "./routes/layout.route";


dotenv.config({
    path: path.resolve(__dirname, "../.env"),
    override: true,
});


export const app = express();

 
// body parser
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

//  cors => cross origin resource sharing               
app.use(cors({
    origin:  ['http://localhost:3000'],
    credentials: true,
})); 

//api request limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

console.log('Router types:');
console.log('userRouter.default:', typeof userRouter.default);
console.log('courseRouter.default:', typeof courseRouter.default);
console.log('orderRouter.default:', typeof orderRouter.default);
console.log('notificationRouter.default:', typeof notificationRouter.default);
console.log('analyticsRouter.default:', typeof analyticsRouter.default);
console.log('layoutRouter.default:', typeof layoutRouter.default);

// routes
app.use("/api/v1/user", userRouter.default);
app.use("/api/v1/courses", courseRouter.default);
app.use("/api/v1/orders", orderRouter.default);
app.use("/api/v1/notifications", notificationRouter.default);
app.use("/api/v1/analytics", analyticsRouter.default);
app.use("/api/v1/layout", layoutRouter.default);

// Testing Api
app.get("/test", (req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working",
    });
});

//unknown route
app.use((req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});                 

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);

export default app;