import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import cloudinary  from "cloudinary";
import LayoutModel from "../models/layout.model.js";

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

export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        const isTypeExist = await LayoutModel.findOne({type});

        if(isTypeExist){
            return next(new ErrorHandler(`${type} already exist`, 400));
        }
        if (type === "Banner") {
            const { image, title, subtitle, subTitle, tagline, tagLine } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
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
            await LayoutModel.findOneAndUpdate({ type: "Banner" }, banner, { upsert: true });
        }

        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = faq.map((item: any) => ({
                // This fix handles both "Question" and "question"
                question: item.question || item.Question, 
                answer: item.answer || item.Answer,
            }));
            await LayoutModel.findOneAndUpdate({ type: "FAQ" }, { type: "FAQ", faq: faqItems }, { upsert: true });
        }

        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesItems = categories.map((category: any) => ({
                title: category.title || category.Title,
            }));
            await LayoutModel.findOneAndUpdate({ type: "Categories" }, { type: "Categories", categories: categoriesItems }, { upsert: true });
        }

        res.status(200).json({
            success: true,
            message: "Layout processed successfully",
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// edit layout
export const editLayout= CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
     try {
        const { type } = req.body;

        if (type === "Banner") {
            const bannerData:any = await LayoutModel.findOne({type: "Banner"});
            
            const { image, title, subtitle, subTitle, tagline, tagLine } = req.body;
            if(bannerData){
             await cloudinary.v2.uploader.destroy(bannerData.banner.image.public_id); 
            }

            const myCloud = await cloudinary.v2.uploader.upload(image, {
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
            await LayoutModel.findOneAndUpdate(
                { type: "Banner" },
                banner,
                { upsert: true, new: true }
            );
        }

       if (type === "FAQ") {
    const { faq } = req.body;

    const faqItems = faq.map((item: any) => ({
        question: item.question || item.Question,
        answer: item.answer || item.Answer,
    }));

    await LayoutModel.findOneAndUpdate(
        { type: "FAQ" },
        { type: "FAQ", faq: faqItems },
        { upsert: true, new: true }
    );
}

       if (type === "Categories") {
    const { categories } = req.body;

    const categoriesItems = categories.map((category: any) => ({
        title: category.title || category.Title,
    }));

    await LayoutModel.findOneAndUpdate(
        { type: "Categories" },
        { type: "Categories", categories: categoriesItems },
        { upsert: true, new: true }
    );
}
        res.status(200).json({
            success: true,
            message: "Layout Updated successfully",
        });

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// get layout by type 
export const getLayoutByType = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {type} = req.params;
        const layout = await LayoutModel.findOne({
            type: { $regex: new RegExp(`^${type}$`, "i") },
        });

        if (!layout) {
            return next(new ErrorHandler(`Layout type ${type} not found`, 404));
        }

        res.status(201).json({
            success: true,
            layout,
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});