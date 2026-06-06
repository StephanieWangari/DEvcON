import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState("");

  const [blogCategory, setBlogCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const backendURL = useSelector((state) => state.prod.link);

  //create blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("blogContent", blogContent);
    formData.append("blogImage", blogImage);
    formData.append("blogCategory", blogCategory); 

    try {
      const res = await axios.post(
        `${backendURL}/api/admin/create-blog`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // reset form
        setBlogTitle("");
        setBlogDescription("");
        setBlogContent("");
        setBlogImage("");
        setBlogCategory("");
      }
    } catch (error) {
      if (error.response?.data?.success === false) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server is unreachable. Please try again later!");
      }
    }
  };

  //create category
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendURL}/api/category/add-category`,
        { categoryTitle },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setCategoryTitle("");

        // refresh categories after adding
        fetchCategories();
      }
    } catch (error) {
      if (error.response?.data?.success === false) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server is unreachable. Please try again later!");
      }
    }
  };

 //fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/category/getCategories`,
        { withCredentials: true }
      );

      setCategories(res.data.allCategories);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold">Create New Blog</h2>
        <p className="text-muted">
          Fill in the details below to publish a new blog post.
        </p>
      </div>

      {/* BLOG FORM */}
      <form
        className="card border-0 shadow-sm rounded-4 p-4"
        onSubmit={handleCreateBlog}
      >

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Blog Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <label>Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
          />
          <label>Description</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            style={{ height: "150px" }}
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <label>Content</label>
        </div>

        {/* CATEGORY SELECT */}
        <select
          className="form-select mb-3"
          value={blogCategory}
          onChange={(e) => setBlogCategory(e.target.value)}
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.categoryTitle}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Upload Image</label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary btn-sm">
          Publish Blog
        </button>
      </form>

      {/* CATEGORY FORM */}
      <div className="mt-5 border-top pt-3">
        <h5>Add New Category</h5>

        <form onSubmit={handleCreateCategory}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
            />
            <label>Category Name</label>
          </div>

          <button className="btn btn-outline-primary">
            Add Category
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddBlog;