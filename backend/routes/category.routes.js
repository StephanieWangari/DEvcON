import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCategory, fetchByCategory, getCategories } from "../controllers/category.controller.js";

const router = express.Router();

//create category
router.post("/add-category",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    createCategory);
    
//get categories
router.get("/getCategories",getCategories);

//blogs in categories
router.get("/categoryBlogs/:id", fetchByCategory);

export default router;