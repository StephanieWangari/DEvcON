import BlogTable from "../../BlogCard/BlogTable";

const EditBlog = () => {

    const blogs = [
        {
            id: 1,
            title: "Understanding JavaScript Closures",
            excerpt: "Learn how closures work in JavaScript and why they are important in modern development.",
            to: "/blogs/js-closures",
            date: "May 2026",
        },
        {
            id: 2,
            title: "Getting Started with React Hooks",
            excerpt: "A beginner-friendly guide to useState, useEffect and custom hooks.",
            to: "/blogs/react-hooks",
            date: "April 2026",
        },
        {
            id: 3,
            title: "Building REST APIs with Node.js",
            excerpt: "Step-by-step guide to building scalable APIs using Express and Node.js.",
            to: "/blogs/node-api",
            date: "March 2026",
        },
    ];

    return (
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                Manage Blogs
            </h2>

            <BlogTable blogs={blogs} />

        </div>
    );
}

export default EditBlog;