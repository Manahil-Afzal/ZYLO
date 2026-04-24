import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { getNotification, updateNotification } from "../controllers/notification.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";
const notificationRoute = express.Router();

notificationRoute.get("/get-all-notifications", updateAccessToken,  isAuthenticated, authorizeRoles("admin"), getNotification);

notificationRoute.put("/update-notification/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), updateNotification);


export default notificationRoute;          