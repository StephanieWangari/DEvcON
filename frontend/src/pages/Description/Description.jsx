import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsChatRightQuote } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";



const Description = () => {
    const [description, setDescription] = useState([]);

    const backendUrl = useSelector((state)=>state.prod.link);
    const { id } = useParams();

    const fetchBlogDescription = async()=>{
        try {
            const res = await axios.get(`${backendUrl}/api/blogs/blogDescription/${id}`, {
                withCredentials: true
            });
            setDescription(res.data.blog);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchBlogDescription();
    }, [id]);
    return ( 
        <div className="container my-5">
            <div className="text-center mb-5">
                <p className="lead text-muted">Insights, stories, and ideas from our experts</p>
            </div>
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-3 text-center p-3">
                                <img 
                                    src={description.blogImage} 
                                    alt="Author"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h5 className="card-title mb-1">Simiyu Vic (DeadPool .lol:)</h5>
                                    <p className="text-muted mb-2">Developer & Tech Enthusiast</p>
                                    <p className="card-text">
                                        <i className="me-2">
                                            <FaXTwitter />
                                        </i> @SimiyuVic
                                        <span className="mx-2">•</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 bg-light">
                        <div className="card-body p-4">
                            <h3 className="mb-3">
                                {description.blogTitle}
                            </h3>
                            <p>
                                {description.blogDescription}
                            </p>
                            <p>
                                {description.blogContent}
                            </p>
                            <hr className="my-4" />
                            <p className="fst-italic text-muted">
                                <i className="me-2">
                                    <BsChatRightQuote />
                                </i>
                                "I do not have anything to say , just thought it is cute being here!"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Description;