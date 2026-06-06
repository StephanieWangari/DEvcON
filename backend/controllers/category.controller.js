import express from "express";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";

//create category
export const createCategory = async(req, res)=>{
    const { categoryTitle } = req.body;

    if(!categoryTitle)
    {
        return res.status(400).json({
            success: false,
            message: "Category Name required!"
        });
    }

    //check if category exists
    const checkCategory = await Category.findOne({ categoryTitle });
    if(checkCategory)
    {
        return res.status(400).json({
            success: false,
            message: "Category Already exists!"
        });
    }
    //save category now
    const newcategory = new Category({
        categoryTitle
    });

    await newcategory.save();

    return res.status(201).json({
        success: true,
        message: "New Category Added!"
    });
}

//fetch categories
export const getCategories = async(req,res)=>{
    try
    {
        const allCategories = await Category.find();
        return res.status(200).json({
            success: true,
            allCategories
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching Categories!"
        });
    }
}

//fetch blogs by categories
export const fetchByCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const blogs = await Blog.find({ blogCategory: id })
            .populate("blogCategory");

        return res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot find blogs for this category!"
        });
    }
};