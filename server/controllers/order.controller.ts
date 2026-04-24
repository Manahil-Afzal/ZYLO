import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { IOrder } from "../models/orderModel.js";
import OrderModel from "../models/orderModel.js";
import userModel from "../models/user.model.js";
import CourseModel from "../models/course.model.js";
import sendMail from "../utils/sendMail.js";
import NotificationModel from "../models/notificationModel.js";
import { getAllOrdersService } from "../services/order.service.js";
import { redis } from "../utils/redis.js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// create order
export const createOrder = CatchAsyncError(
    async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {courseId, payment_info} = req.body as IOrder;
        let resolvedPaymentInfo: Record<string, unknown> | undefined = payment_info as Record<string, unknown> | undefined;

        if(payment_info){
            if("id" in payment_info){
                const paymentIntentId = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    paymentIntentId
                );

                if(paymentIntent.status !== "succeeded"){
                    return next (new ErrorHandler("Payment not authorized!", 400));
                }

                resolvedPaymentInfo = paymentIntent;
            }
        }

        const user = await userModel.findById(req.user?._id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const course = await CourseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("Course not found", 404));
        }

        const data = {
            courseId: String(course._id),
            userId: String(user._id),
            payment_info: resolvedPaymentInfo,
        };
        

        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {year:'numeric', month: 'long', day: 'numeric'}),
            }
        }

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

        user.courses.push({ courseId: String(course._id) });

        await redis.set(String(req.user?._id), JSON.stringify(user));

        await user?.save();

        if (user?._id) { 
            await redis.set(String(user._id), JSON.stringify(user), "EX", 604800);
        }

        await NotificationModel.create({
            userId: String(user?._id),
            title: "New Order",
            message: `you have a new order from ${course?.name}`,
        });

       
                await CourseModel.updateOne(
                        { _id: course._id },
                        { $inc: { purchased: 1 } }
                );


        const order = await OrderModel.create(data);

        res.status(201).json({
            success: true,
            order,
        });
       
    } catch (error:any) {
       return next(new ErrorHandler(error.message, 500));
    }
});

// get All Orders -- only for admin
export const getAllOrders = CatchAsyncError(
    async(req: Request, res: Response, next: NextFunction)=>{
        try {
            getAllOrdersService(res);
        } catch (error:any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(async(req:Request,res:Response )=>{
    res.status(200).json({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});       

// new payment
export const newPayment = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return next(new ErrorHandler("Invalid amount provided", 400));
        }

        const myPayment = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Ensure amount is in cents and an integer
            currency: "usd",
            metadata:{
                company: "ZyLO Learning",
            },
            automatic_payment_methods:{
                enabled: true,
                allow_redirects: "always",
            }
        });

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
})
