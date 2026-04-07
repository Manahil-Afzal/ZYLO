import {app} from "./app";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

// require("dotenv").config();
dotenv.config();

const PORT = process.env.PORT || 3000;

// cloudinary config
cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,  
      api_secret: process.env.CLOUD_SECRET_KEY,
})

//create server
app.listen(PORT, () => {
      console.log(`Server is connected with port ${process.env.PORT}`);
      connectDB();
})
                 