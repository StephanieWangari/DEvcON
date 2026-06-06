import express from "express";
import { fetchAllBlogs, fetchById, recentBlogs } from "../controllers/blogs.controller.js";


const router = express.Router();

//get all blogs
router.get("/fetchAllBlogs", fetchAllBlogs);

//recent blogs
router.get("/recentBlogs", recentBlogs);

//blog description
router.get("/blogDescription/:id", fetchById);

export default router; 

