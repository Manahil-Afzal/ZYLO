import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel,{IOrder} from "../models/orderModel";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { newOrder } from "../services/order.service";


// create order
export const createOrder = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {courseId, payment_info} = req.body as IOrder;

        const user = await userModel.findById(req.user?._id);

        const course = await CourseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("Course not found", 404));
        }

        const data:any = {
            courseId: course._id,
            userId: user?._id,
            payment_info,
        };
        

        const mailData = {
            order: {
                // _id: course._id.slice(0,6),
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {year:'numeric', month: 'long', day: 'numeric'}),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), {order:mailData});

        try {
            if(user){
                await sendMail({
                    email: user.email,
                    subject: "Order confirmation",
                    template: "order-confirmation.ejs",         
                    data: mailData,
                });
            }
        } catch (error:any) {
            return next(new ErrorHandler(error.message, 500));
        }

        user?.courses.push(course?._id as any);

        await user?.save();

        const notification= await NotificationModel.create({
            userId: String(user?._id),
            title: "New Order",
            message: `you have a new order from ${course?.name}`,
        });

       
        //   course.purchased ?  course.purchased += 1 : course.purchased;
        course.purchased = (course.purchased || 0) + 1;
        

          await course.save();


         newOrder(data,res,next);           
       
    } catch (error:any) {
       return next(new ErrorHandler(error.message, 500));
    }
})