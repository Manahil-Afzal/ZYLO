import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
    override: true,
});

const dbUrl:string = process.env.MONGO_URI || '';

const connectDB = async () => {
    if (!dbUrl) {
        throw new Error("MONGO_URI is missing in environment variables");
    }

    const connection = await mongoose.connect(dbUrl, {
        serverSelectionTimeoutMS: 5000,
    });

    console.log(`Database connected with ${connection.connection.host}`);
}

export default connectDB;