import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

dotenv.config();


export const app = express();


 
// body parser
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

//  cors => cross origin resource sharing               
app.use(cors({
    origin:  process.env.ORIGIN,
})); 

//routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter);


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

app.use(ErrorMiddleware);