import mongoose from "mongoose";

const dbUrl: string = process.env.MONGO_URI || "";

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
