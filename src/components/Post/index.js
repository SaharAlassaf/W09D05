import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { storage } from "../firebase";
import Nav from "../Nav";
import axios from "axios";

function Post() {
  const { id } = useParams();
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

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
      console.log("post", res.data);
      setPost(res.data);
      if (res.data.likes.find((item) => item.user._id === state.sign.id)) {
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            updatePost(url);
          });
      }
    );
  };

  const updatePost = async (url) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
        {
          img: url,
          desc
        },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      getPost();
      setDesc("");
      setProgress(0);
      setUrl("");
      setImage("");
      setShow(false);
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

  const like = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/like/${id}`,
        {
          userId: state.sign.id
        }
      );
      //   console.log(res.data);
      setIsLiked(res.data.isLiked);
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

  const editComment = async (comId) => {
    console.log(id);
    console.log(comId);
    console.log(newComment);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/editComment/${id}/${comId}`,
        {
          comment: newComment
        },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      getPost();
    } catch (error) {
      console.log(error);
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
                    {isLiked ? (
                      <button className="btn icon" onClick={like}>
                        <i
                          data-feather="user"
                          className="bi bi-heart-fill fs-4"
                        ></i>
                      </button>
                    ) : (
                      <button className="btn icon" onClick={like}>
                        <i data-feather="user" className="bi bi-heart fs-4"></i>
                      </button>
                    )}
                    {post.likes.length > 1
                      ? post.likes.length + " likes"
                      : post.likes.length + " like"}

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
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Edit post</Modal.Title>
                            </Modal.Header>
                            <form name="post" className="form form-horizontal">
                              <Modal.Body>
                                <div className="row match-height">
                                  <div className="card-body">
                                    <div className="form-body">
                                      <div className="row">
                                        <div className="row">
                                          <label className="col-form-label-lg">
                                            Upload file
                                          </label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                          <input
                                            type="file"
                                            name="post"
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <div className="row">
                                          <label className="col-form-label-lg">
                                            Description
                                          </label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                          <div className="form-floating">
                                            <textarea
                                              className="form-control"
                                              name="description"
                                              rows="4"
                                              cols="50"
                                              placeholder="Leave a description here"
                                              id="floatingTextarea"
                                              onChange={(e) =>
                                                setDesc(e.target.value)
                                              }
                                            ></textarea>
                                            <label htmlFor="floatingTextarea">
                                              Description
                                            </label>
                                          </div>
                                        </div>

                                        <progress value={progress} max="100" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <button
                                  type="reset"
                                  className="btn btn-primary me-1 mb-1"
                                  onClick={handleUpload}
                                >
                                  Edit
                                </button>
                                <button
                                  type="reset"
                                  className="btn btn-light-secondary me-1 mb-1"
                                >
                                  Reset
                                </button>
                              </Modal.Footer>
                            </form>
                          </Modal>
                          <button
                            className="btn btn-light-primary"
                            onClick={handleShow}
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
                          <textarea
                            className="form-control"
                            name="description"
                            rows="4"
                            cols="50"
                            placeholder="Leave a description here"
                            id="floatingTextarea"
                            onChange={(e) => setNewComment(e.target.value)}
                          ></textarea>{" "}
                          <div className="form-actions d-flex justify-content-end">
                            <button
                              onClick={() => deleteComment(item._id)}
                              className="btn btn-primary me-1"
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-light-primary"
                              onClick={() => editComment(item._id)}
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
