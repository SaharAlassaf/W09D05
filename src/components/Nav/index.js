import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../firebase";
import Modal from "react-bootstrap/Modal";
import { logout } from "../../reducers/sign";
import axios from "axios";

function Nav() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const logOut = () => {
    dispatch(logout({ user: "", token: "" }));
    navigate(`/`);
  };

  useEffect(
    () => {
      getPosts();
    }, // eslint-disable-next-line
    []
  );

  const state = useSelector((state) => {
    return {
      sign: state.sign
    };
  });

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
            createPost(url);
          });
      }
    );
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
        headers: { Authorization: `Bearer ${state.sign.token}` }
      });
      //   console.log(res.data);
      const result = res.data.filter((word) => word._id > state.sign.id);
      setName(result[0].user.username);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (url) => {
    try {
      console.log(state.sign);
      console.log(url);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createPost`,
        { img: url, desc },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      //   console.log(res.data);
      getPosts();
      setDesc("");
      setProgress(0);
      setUrl("");
      setImage("");
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="app">
        <div id="main" className="layout-horizontal">
          <header className="mb-5">
            <div className="header-top">
              <div className="container">
                <button
                  title="Logout"
                  className="btn icon icon-left"
                  id="leave"
                  onClick={logOut}
                >
                  <i
                    data-feather="user"
                    className="bi bi-box-arrow-in-left fs-4"
                  ></i>
                </button>
                <div className="logo">
                  <Link to="/Posts" className="linkLogo">
                    <h1>Insta.</h1>
                  </Link>
                </div>
                <ul className=" ms-auto mb-6 mb-lg-0" id="nav">
                  <li>
                    <button
                      className="btn icon icon-left"
                      onClick={handleShow}
                      title="Add post"
                    >
                      <i
                        data-feather="user"
                        className="bi bi-plus-square bi-sub fs-4"
                      ></i>
                    </button>
                  </li>
                </ul>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create new post</Modal.Title>
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
                                    onChange={(e) => setDesc(e.target.value)}
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
                        Share
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
                <div className="user-menu d-flex">
                  <div className="user-name text-end me-3">
                    <h4 className="mb-0 text-gray-600">{name}</h4>
                    <h5 className="mb-0 text-sm text-gray-600">
                      {state.sign.role}
                    </h5>
                  </div>
                  <div className="user-img d-flex align-items-center">
                    <div className="avatar avatar-md">
                      <img
                        src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Nav;
