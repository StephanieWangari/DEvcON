import express from "express";
import Blog from "../models/blog.model.js";


//all blogs
export const fetchAllBlogs =  async(req, res)=>{
    try
    {
        const blogs = await Blog.find().sort({createdAt: -1});
        return res.status(200).json({
            sucess: true,
            blogs
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Could not fetch blogs!"
        });
    }
}

//recent blogs
export const recentBlogs =  async(req, res)=>{
    try
    {
        const blogs = await Blog.find().sort({createdAt: -1}).limit(3);
        return res.status(200).json({
            sucess: true,
            blogs
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Could not fetch blogs!"
        });
    }
}

//fetch blog description
export const fetchById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found!"
      });
    }

    return res.status(200).json({
      success: true,
      blog
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch Blog Description!",
      error: error.message
    });
  }
};
