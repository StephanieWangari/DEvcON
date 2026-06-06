import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";

const BlogList = () => {
    const backendUrl = useSelector((state) => state.prod.link);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/blogs/fetchAllBlogs`, {
                withCredentials: true
            });
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error(error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                All Blogs
            </h2>

            {loading ? (
                <p className="text-center">Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <div className="text-center text-muted py-5">
                    <h5>No blogs yet</h5>
                    <p>Visit Later when we have something to show!</p>
                </div>
            ) : (
                <div className="row g-4">
                    {blogs.map((blog, index) => (
                        <div key={index} className="col-12 col-md-4">
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default BlogList;