import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "../Nav";
import axios from "axios";

function Post() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(
    () => {
      getPost();
    }, // eslint-disable-next-line
    []
  );

  const state = useSelector((state) => {
    return {
      sign: state.sign
    };
  });

  const getPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getPost/${id}`,
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      console.log(res.data);
      setPost(res.data);
      if (res.data.likes.find((item) => item.user === state.sign.id)) {
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      if (state.sign.role === "admin") {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/adminDeletePost/${id}`,
          {
            headers: { Authorization: `Bearer ${state.sign.token}` }
          }
        );
        // console.log(res.data);
        navigate("/posts");
      } else {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/deletePost/${id}`,
          {
            headers: { Authorization: `Bearer ${state.sign.token}` }
          }
        );
        // console.log(res.data);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const deleteComment = async (comId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteComment/${id}/${comId}`,
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      // console.log(res.data);
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const like = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/like/${id}`,
        {
          userId: state.sign.userId
        }
      );
      //   console.log(res.data);
      setIsLiked(res.data.isLiked);
      getPost();
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const addComment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addComment/${id}`,
        {
          comment
          // userId: state.sign.userId
        },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      //   console.log(res.data);
      getPost();
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  return (
    <>
      {post ? (
        <>
          <Nav />
          <div className="container">
            <div className="col-md-12 col-sm-12" key={post._id}>
              <div className="card">
                <div className="card-content">
                  <img
                    className="card-img-top img-fluid"
                    src={post.post.img}
                    alt="img"
                  />
                  <div className="card-body">
                    <div className="recent-message d-flex px-4 py-3">
                      {post.likes.length > 1
                        ? post.likes.length + " likes"
                        : post.likes.length + " like"}
                    </div>
                    {isLiked ? (
                      <button className="btn icon icon-left" onClick={like}>
                        <i
                          data-feather="user"
                          className="bi bi-heart-fill fs-4"
                        ></i>
                      </button>
                    ) : (
                      <button className="btn icon icon-left" onClick={like}>
                        <i data-feather="user" className="bi bi-heart fs-4"></i>
                      </button>
                    )}
                    <h5 className="card-title">
                      {post.post.user.username}: {post.post.desc}
                    </h5>
                    <small className="text-muted">{post.post.postDate}</small>
                    {state.sign.id === post.post.user._id ||
                    state.sign.role === "admin" ? (
                      <>
                        {" "}
                        <div className="form-actions d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-primary me-1"
                            onClick={() => deletePost(post.post._id)}
                          >
                            Delete
                          </button>
                          <button
                            type="reset"
                            className="btn btn-light-primary"
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {post.comments.map((item, i) => (
                    <li className="list-group-item" key={item._id}>
                      <div className="recent-message d-flex px-4 py-3">
                        <div className="avatar avatar-lg">
                          <img src={item.user.avatar} alt="img" />
                        </div>
                        <div className="name ms-4">
                          <h5 className="my-3">{item.user.username}</h5>
                        </div>
                      </div>
                      <p>{item.comment}</p>
                      {state.sign.id === item.user._id ||
                      state.sign.role === "admin" ? (
                        <>
                          {" "}
                          <div className="form-actions d-flex justify-content-end">
                            <button
                              onClick={() => deleteComment(item._id)}
                              className="btn btn-primary me-1"
                            >
                              Delete
                            </button>
                            <button
                              // onClick={() => deleteUsers(post.post._id)}
                              type="reset"
                              className="btn btn-light-primary"
                            >
                              Edit
                            </button>
                          </div>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <>
            <div className="container">
              <div className="card mt-5">
                <div className="card-header">
                  <h4 className="card-title">Add comment</h4>
                </div>
                <div className="card-body">
                  <div className=" form-body">
                    <div className="form-floating form-group">
                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        cols="50"
                        placeholder="Leave a description here"
                        id="floatingTextarea"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <label htmlFor="floatingTextarea">Add nice comment</label>
                    </div>
                    <div className="form-actions d-flex justify-content-end">
                      <button
                        className="btn btn-primary me-1"
                        onClick={addComment}
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      ) : (
        "Not found"
      )}
    </>
  );
}

export default Post;
