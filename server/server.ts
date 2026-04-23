import {app} from "./app";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import http from "http";
import { initSocketServer } from "./socketServer";
const server = http.createServer(app);

// require("dotenv").config();
dotenv.config({
      path: path.resolve(__dirname, "../.env"),
      override: true,
});

const PORT = 8000;

// cloudinary config
cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,  
      api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

//create server
server.listen(PORT, () => {
      console.log(`Server is connected with port ${PORT}`);
      connectDB();
})
                 