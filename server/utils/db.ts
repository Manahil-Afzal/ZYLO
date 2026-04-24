import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.MONGO_URI || "";


if(!dbUrl){
   throw new Error("db url not found");
}

const connectDB = async () => {
     try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        });
    } catch (error: any) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
