"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const cloudinary_1 = __importDefault(require("cloudinary"));
const layout_model_1 = __importDefault(require("../models/layout.model"));
//create Layout
// export const createLayout = (async (req:Request, res:Response, next:NextFunction)=>{
//     try {
//         const {type} = req.body;
//         if(type === "Banner"){
//             const {image, title, subtitle} = req.body;
//             const myCloud = await cloudinary.v2.uploader.upload(image, {
//                 folder: "layout",
//             });
//             const banner ={
//                 type: "Banner",
//                 banner: {
//                 image:{
//                     public_id: myCloud.public_id,
//                     url: myCloud.secure_url,
//                 },
//                 title,
//                 subtitle
//             }
//         };
//             await LayoutModel.create(banner);
//         }
//         if(type === "FAQ"){
//             const {faq} = req.body;
//             const faqItems = await Promise.all(
//                 faq.map(async(item:any) => {
//                     return {
//                         question: item.question,
//                         answer: item.answer,
//                     };
//                 })
//             );
//             await LayoutModel.create({type: "FAQ", faq:faqItems});
//         }
//         if (type === "FAQ") {
//     const { faq } = req.body;
//     const faqItems = faq.map((item: any) => ({
//         question: item.Question, // Note the capital Q
//         answer: item.Answer,     // Note the capital A
//     }));
//     await LayoutModel.create({ type: "FAQ", faq: faqItems });
// }
//         res.status(200).json({
//             success: true,
//             message: "Layout created Successfully",
//         });
//     } catch (error:any) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// });
exports.createLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exist`, 400));
        }
        if (type === "Banner") {
            const { image, title, subtitle, subTitle, tagline, tagLine } = req.body;
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                type: "Banner",
                banner: {
                    image: { public_id: myCloud.public_id, url: myCloud.secure_url },
                    title,
                    subtitle: subtitle ?? subTitle,
                    tagline: tagline ?? tagLine,
                }
            };
            // Use findOneAndUpdate with upsert: true to prevent duplicates
            await layout_model_1.default.findOneAndUpdate({ type: "Banner" }, banner, { upsert: true });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = faq.map((item) => ({
                // This fix handles both "Question" and "question"
                question: item.question || item.Question,
                answer: item.answer || item.Answer,
            }));
            await layout_model_1.default.findOneAndUpdate({ type: "FAQ" }, { type: "FAQ", faq: faqItems }, { upsert: true });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesItems = categories.map((category) => ({
                title: category.title || category.Title,
            }));
            await layout_model_1.default.findOneAndUpdate({ type: "Categories" }, { type: "Categories", categories: categoriesItems }, { upsert: true });
        }
        res.status(200).json({
            success: true,
            message: "Layout processed successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// edit layout
exports.editLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData = await layout_model_1.default.findOne({ type: "Banner" });
            const { image, title, subtitle, subTitle, tagline, tagLine } = req.body;
            if (bannerData) {
                await cloudinary_1.default.v2.uploader.destroy(bannerData.banner.image.public_id);
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                type: "Banner",
                banner: {
                    image: { public_id: myCloud.public_id, url: myCloud.secure_url },
                    title,
                    subtitle: subtitle ?? subTitle,
                    tagline: tagline ?? tagLine,
                }
            };
            await layout_model_1.default.findOneAndUpdate({ type: "Banner" }, banner, { upsert: true, new: true });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = faq.map((item) => ({
                question: item.question || item.Question,
                answer: item.answer || item.Answer,
            }));
            await layout_model_1.default.findOneAndUpdate({ type: "FAQ" }, { type: "FAQ", faq: faqItems }, { upsert: true, new: true });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesItems = categories.map((category) => ({
                title: category.title || category.Title,
            }));
            await layout_model_1.default.findOneAndUpdate({ type: "Categories" }, { type: "Categories", categories: categoriesItems }, { upsert: true, new: true });
        }
        res.status(200).json({
            success: true,
            message: "Layout Updated successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get layout by type 
exports.getLayoutByType = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layout_model_1.default.findOne({
            type: { $regex: new RegExp(`^${type}$`, "i") },
        });
        if (!layout) {
            return next(new ErrorHandler_1.default(`Layout type ${type} not found`, 404));
        }
        res.status(201).json({
            success: true,
            layout,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
