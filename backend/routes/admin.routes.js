import express from "express";
import { createBlog, loginAdmin } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

//login
router.post("/admin-login", loginAdmin);

//create blog
router.post("/create-blog",
    authMiddleware.verifyToken, 
    authMiddleware.authorizeRole("admin"),
    upload.single("blogImage"),
    createBlog);

export default router; 