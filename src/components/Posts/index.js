import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [post, setPost] = useState();

  useEffect(() => {
    getPosts();
  }, [url]);

  const handleChange = e => {
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
            createPost(url)
          });
      }
    );
  };

  const state = useSelector((state) => {
    return {
      sign: state.sign
    };
  });

  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
        headers: { Authorization: `Bearer ${state.sign.token}` }
      });
    //   console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setMessage(error.response.data);
    }
  };


  const createPost = async (url) => {
    //   console.log("url", url);
    //   console.log("desc",desc);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/createPost`
        ,{ img: url, desc },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      //   console.log(res.data);
      getPosts();
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setMessage(error.response.data);
    }
  };

  return (
    <>
      <h1>Posts</h1>
      {/* {message} */}
      <>
        <textarea
          name="w3review"
          rows="4"
          cols="50"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <label>Choose Photo </label>
        <input type="file" name="post" onChange={handleChange} />
        <img src={url} alt="firebase" />
        <progress value={progress} max="100" />
        <button onClick={handleUpload}>upload</button>
      </>
      {posts.map((item) => (
        <div key={item._id}>
          <h4>{item.desc}</h4>
          <img src={item.img} alt="img" />
          {/* <button onClick={() => deleteUsers(item._id)}>Delete</button> */}
        </div>
      ))}
    </>
  );
}

export default Posts;
