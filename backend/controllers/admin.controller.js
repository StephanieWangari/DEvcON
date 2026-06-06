import express from "express";
import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//login
export const loginAdmin = async(req,res)=>{
    try
    {
    const {userEmail, userPassword} = req.body;

    //form validation
    if(!userEmail || !userPassword)
    {
        return res.status(400).json({
            success: false,
            message: "Must Fill in Email and Password!"
        });
    }
    const user = await User.findOne({userEmail}).select("+userPassword");
    if(!user)
    {
        return res.status(409).json({
            success: false,
            message: "Wrong Email or Password! "
        });
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if(!isMatch)
    {
        return res.status(409).json({
            success: false,
            message: "Wrong Email or Password! "
        });
    }

    //set token
    const token = jwt.sign(
        {
            id: user._id,
            userRole: user.userRole
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d" 
        }
    );
    //set cookie
    res.cookie("devconCookie", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
        path: "/",
    });

    res.status(201).json({
        success: true,
        message: `Welcome Back ${userEmail}` 
    });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while trying to LogIn!"
        });
    }
}

//create blog
export const createBlog = async(req, res)=>{
    try 
    {
        const {user} = req;

        const { blogTitle, blogDescription, blogContent, blogCategory} = req.body;

        //form validation
        if(!blogTitle || !blogDescription || !blogContent || !blogCategory)
        {
            return res.status(400).json({
                success: false,
                message: "Must Fill in Fields of Blog Details!"
            });
        }
        if(!req.file)
        {
            return res.status(400).json({
                success: false,
                message: "Must Select an Image!"
            });
        }

        const newBlog = new Blog({
            blogTitle,
            blogDescription,
            blogContent,
            blogCategory,
            blogImage: req.file.path
        });

        await newBlog.save();   

            return res.status(200).json({
                success: true,
                message: "Blog Created Succefully!"
            });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong While Creating Blog!"
        });
    }
}

