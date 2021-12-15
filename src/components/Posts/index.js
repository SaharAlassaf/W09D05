import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "../Nav";
import axios from "axios";

function Posts() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(
    () => {
      getPosts();
    }, // eslint-disable-next-line
    []
  );

  const state = useSelector((state) => {
    return {
      sign: state.sign.token
    };
  });
  

  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
        headers: { Authorization: `Bearer ${state.sign}` }
      });
      //   console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state.sign ? (
        <>
          <Nav />
          <div className="container">
            {posts.map((item) => (
              <div className="col-md-12 col-sm-12" key={item._id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="recent-message d-flex px-4 py-3">
                        <div className="avatar avatar-lg">
                          <img src={item.user.avatar} alt="img" />
                        </div>
                        <div className="name ms-4">
                          <h5 className="my-3">{item.user.username}</h5>
                        </div>
                      </div>
                      <h5 className="card-text">{item.desc}</h5>
                      <small className="text-muted">{item.postDate}</small>
                    </div>
                    <img
                      className="card-img-bottom img-fluid photo"
                      src={item.img}
                      alt="img"
                      onClick={() => navigate(`/Post/${item._id}`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="col-md-8 col-9 offset-md-4 my-24">
          <h1 className="error-title">Sign in First</h1>
          <button
            onClick={() => navigate("/Signin")}
            className="btn btn-lg btn-outline-primary mt-3"
          >
            Sign in
          </button>
        </div>
      )}
    </>
  );
}

export default Posts;
