import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import allBlogs from "./routes/blogs.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express(); //create express instance

app.use(express.json()); //parse the data

app.use(cookieParser());

//allow connection from frontend
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://d-evc-on.vercel.app/"
    ],
    credentials: true,
}));

//test api
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    status: "OK"
  });
});
//user routes
app.use("/api/auth", authRoutes);

//admin routes
app.use("/api/admin", adminRoutes);

//category routes
app.use("/api/category", categoryRoutes);

//all blogs
app.use("/api/blogs", allBlogs);

const PORT = process.env.PORT; //to avoided hardcoding the PORT

const startServer = async()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server Running on PORT ${PORT}`);
    });

    await connectDB();
}

startServer(); 