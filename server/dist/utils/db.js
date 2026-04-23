"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
    override: true,
});
const dbUrl = process.env.MONGO_URI || '';
const connectDB = async () => {
    if (!dbUrl) {
        throw new Error("MONGO_URI is missing in environment variables");
    }
    const connection = await mongoose_1.default.connect(dbUrl, {
        serverSelectionTimeoutMS: 5000,
    });
    console.log(`Database connected with ${connection.connection.host}`);
};
exports.default = connectDB;
