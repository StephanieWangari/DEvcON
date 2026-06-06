import User from "../models/user.model.js";

import jwt from "jsonwebtoken";


export const authMiddleware = {
    verifyToken: async(req, res, next)=>{
        const token = req.cookies.devconCookie;
        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "No token found to prove user logged In"
            });
        }
        //fetch user details
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);
            if(!user)
            {
                return res.status(404).json({
                    success: false,
                    message: "User Not Found!"
                });
            }

            req.user = user;
            
            next();
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Something Went Wrong While trying to fetch user!"
            })
        }
    },
    authorizeRole: (userRole)=>{
        return(req,res, next)=>{
            if(!req.user || req.user.userRole !== userRole)
            {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorised !"
                });
            }
            next();
        }
    }
}