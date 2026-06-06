import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [Loading, setLoading] = useState("");
    const history = useNavigate();
    const backendURL = useSelector((state)=>state.prod.link);
    //console.log(backendURL);
    const [Inputs, setInputs] =useState({
                userEmail: "",
                userPassword: "",
            });
        
            const change = (e)=>{
                const {name,value} = e.target;
                setInputs({...Inputs, [name]: value});
            }

    const handleAdminLogin = async(e)=>{
        e.preventDefault();
        try 
        {
            const res = await axios.post(`${backendURL}/api/admin/admin-login`, 
                Inputs,{
                    withCredentials: true
                }
            );

            //redirect to Admin dashboard
            history("/admin-dashboard");

            if(res.data.success)
            {
                toast.success(res.data.message)
            }
        } catch (error) 
        {
            setLoading(false);
            //console.error(error);
            if (error.response && error.response.data) {
                if (error.response.data.success === false) {
                    toast.error(error.response.data.message);
                }
                
            } else {
                toast.error("Server is unreachable. Please try again later!");
            }
        }
        finally
        {
            setLoading(false);
            setInputs({
                userEmail: "",
                userPassword: "",
            });
        }

    }
    return ( 
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">
                                    Welcome Admin
                                </h2>
                                <p className="text-muted">
                                   Login to Continue!
                                </p>
                            </div>
                            <form onSubmit={handleAdminLogin}>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        value={Inputs.userEmail}
                                        name="userEmail"
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Email" 
                                        onChange={change}
                                        />
                                    <label htmlFor="floatingInput">Enter Your Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        value={Inputs.userPassword}
                                        name="userPassword"
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Password" 
                                        onChange={change}
                                        />
                                    <label htmlFor="floatingInput">Enter Password</label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={Loading}
                                >
                                    {Loading ? "Logging In..." : "Login"}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;