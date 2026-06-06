import { useParams } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Categories = () => {
    const {id} = useParams();
    const [blogs, setBlogs] = useState([]);
    const backendUrl = useSelector((state)=>state.prod.link);

    const fetchBlogs = async()=>{
        try
        {
            const res = await axios.get(`${backendUrl}/api/category/categoryBlogs/${id}`, {
                withCredentials: true
            });

            setBlogs(res.data.blogs);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchBlogs();
    },[id])
    return ( 
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
               Read More and More. . . 
            </h2>

            <div className="row g-4">
                {blogs && blogs.map((blog, index) => (
                    <div key={index} className="col-12 col-md-4">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>

        </div>
     );
}
 
export default Categories;