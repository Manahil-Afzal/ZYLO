import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./utils/db.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { initSocketServer } from "./socketServer.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

// connect DB ONCE per cold start
connectDB();