import express from "express";
import {  
    changeAvatar,
    changePassword,
    checkCookie, 
    getProfileData, 
    loginUser, 
    logoutUser,
    signUpUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

//sign-up
router.post("/sign-up", signUpUser);

//login
router.post("/login", loginUser);

//cookie check
router.get("/check-cookie", checkCookie);

//logout user
router.post("/logout", logoutUser);

router.get("/getProfileData",
    authMiddleware.verifyToken, 
    authMiddleware.authorizeRole("user"),
    getProfileData);

//change password
router.put("/change-password",
    authMiddleware.verifyToken, 
    authMiddleware.authorizeRole("user"),
    changePassword);

//change Avatar
router.put("/change-avatar",
    authMiddleware.verifyToken, 
    upload.single("avatar"),
    authMiddleware.authorizeRole("user"),
    changeAvatar);




export default router; 