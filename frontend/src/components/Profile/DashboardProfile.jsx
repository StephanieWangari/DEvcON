import { FaUserCircle, FaHeart, FaFileAlt, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios"; 
import { useEffect } from "react";
import { useState } from "react";

const DashboardProfile = () => {

  //const profile = useSelector((state) => state.user.user);
  const [profile, setProfile] = useState("");
  const backendLink = useSelector((state)=>state.prod.link);
  
  const stats = [
    {
      title: "My Blogs",
      value: 12,
      icon: <FaFileAlt />,
    },
    {
      title: "Favourites",
      value: 8,
      icon: <FaHeart />,
    },
    {
      title: "Comments",
      value: 24,
      icon: <FaComments />,
    },
  ];

  //fetch user data
  useEffect(()=>{
    const fetch = async()=>{
    try
      {
        const res = await axios.get(`${backendLink}/api/auth/getProfileData`, 
          {
            withCredentials: true
          }
        );
        //dispatch(setUser(res.data.data));
        setProfile(res.data.data);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    fetch();
  },[backendLink]);

  return (
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4 mb-4 overflow-hidden">
        <div
          className="card-body p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #4dabf7)",
            color: "white",
          }}
        >
          {/* Avatar */}
          <div
            className="d-flex justify-content-center align-items-center rounded-circle bg-white shadow overflow-hidden"
            style={{
              width: "90px",
              height: "90px",
              flexShrink: 0,
            }}
          >
            {profile.userAvatar ? (
              <img
                src={profile.userAvatar}
                alt="User Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <FaUserCircle size={60} color="#0d6efd" />
            )}
          </div>

          {/* User Info */}
          <div className="flex-grow-1 text-center text-md-start">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div>
                <h2 className="fw-bold mb-1">
                  Welcome Back, {profile.userName}
                </h2>

                <p className="mb-2 opacity-75">
                  Manage your blogs, favourites and profile here.
                </p>
              </div>

              <span
                className="badge rounded-pill px-3 py-2 mt-2 mt-md-0"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(6px)",
                  fontSize: "0.9rem",
                }}
              >
                Active User
              </span>
            </div>

            {/* Email */}
            <div
              className="mt-3 px-3 py-2 rounded-3 d-inline-block"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(6px)",
              }}
            >
              <small className="d-block opacity-75">Email Address</small>
              <span className="fw-semibold">{profile?.userEmail}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">{stat.title}</h6>
                  <h2 className="fw-bold">{stat.value}</h2>
                </div>

                <div
                  className="bg-light text-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body">
          <h4 className="mb-3">Recent Activity</h4>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              You published a new blog post.
            </li>

            <li className="list-group-item">
              Someone commented on your article.
            </li>

            <li className="list-group-item">
              You added a blog to favourites.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;