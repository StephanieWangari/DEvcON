import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    blogCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    blogLikes: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
