import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import Landing from "../Landing";
import axios from "axios";

function Posts() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  //   const [post, setPost] = useState();

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
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (url) => {
    try {
      const res = await axios.post(
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
      setMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!state.sign ? (
        <>
          <h1>Posts</h1>
          {message ? (
            <>{message}</>
          ) : (
            <>
              <label>Choose Photo </label>
              <input type="file" name="post" onChange={handleChange} />
              <textarea
                name="w3review"
                rows="4"
                cols="50"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <progress value={progress} max="100" />
              <button onClick={handleUpload}>Share</button>
            </>
          )}
          {posts.map((item) => (
            <div key={item._id}>
              <img
                src={item.img}
                alt="img"
                onClick={() => navigate(`/Post/${item._id}`)}
              />
              <img src={item.user.avatar} alt="img" />
              <h4>{item.user.username}</h4>
              <h4>{item.desc}</h4>
              {/* <button onClick={() => deleteUsers(item._id)}>Delete</button> */}
            </div>
          ))}
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

export default Posts;
