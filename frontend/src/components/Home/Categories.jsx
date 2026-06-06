import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Categories = () => {
    const backendUrl = useSelector((state) => state.prod.link);

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                `${backendUrl}/api/category/getCategories`,
                { withCredentials: true }
            );

            setCategories(res.data.allCategories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container my-5">

            <div className="text-center mb-5">
                <h2 className="fw-bold">Explore Categories</h2>
                <p className="text-muted">
                    Browse content organized by topics
                </p>
            </div>

            <div className="row g-4 justify-content-center">

                {categories.length === 0 ? (
                    <div className="text-center text-muted">
                        No categories available
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category._id}
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                        >
                            <Link
                                to={`/category/${category._id}`}
                                className="text-decoration-none"
                            >
                                <div className="category-card p-4 text-center h-100">

                                    <h5 className="category-title mb-0">
                                        {category.categoryTitle}
                                    </h5>

                                </div>
                            </Link>
                        </div>
                    ))
                )}

            </div>

            <style>
                {`
                    .category-card {
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 14px;
                        transition: all 0.25s ease;
                        cursor: pointer;
                        height: 100%;
                    }

                    .category-card:hover {
                        transform: translateY(-6px);
                        border-color: #2563eb;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                    }

                    .category-title {
                        font-weight: 600;
                        color: #1f2937;
                        transition: color 0.25s ease;
                    }

                    .category-card:hover .category-title {
                        color: #2563eb;
                    }

                    h2 {
                        color: #111827;
                    }

                    p {
                        font-size: 14px;
                    }
                `}
            </style>

        </div>
    );
};

export default Categories;