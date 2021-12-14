import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Post() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

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
        setIsLiked(!res.data.isLiked);
      getPost();
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  console.log(state.sign);

  return (
    <>
      {post ? (
        <>
          <img src={post.post.user.avatar} alt="img" />
          <h2>{post.post.user.username}</h2>
          <img src={post.post.img} alt="img" />
          <h1>{post.post.desc}</h1>
          {isLiked ? (
            <button onClick={like}>Like</button>
          ) : (
            <button onClick={like}>Unlike</button>
          )}

          {state.sign.userId === post.post.user._id ||
          state.sign.role === "admin" ? (
            <>
              {" "}
              <button onClick={() => deletePost(post.post._id)}>Delete</button>
              <button
              // onClick={() => deleteUsers(post.post._id)}
              >
                Edit
              </button>
            </>
          ) : (
            ""
          )}
          <h3>
            {post.likes.length > 1
              ? post.likes.length + " likes"
              : post.likes.length + " like"}
          </h3>
          {post.comments.map((item, i) => (
            <div key={item._id}>
              <p>{item.user.username}:</p>
              <p>{item.comment}</p>
              {state.sign.id === item.user._id ||
              state.sign.role === "admin" ? (
                <>
                  {" "}
                  <button onClick={() => deleteComment(item._id)}>
                    Delete
                  </button>
                  <button
                  // onClick={() => deleteUsers(post.post._id)}
                  >
                    Edit
                  </button>
                </>
              ) : null}
            </div>
          ))}
        </>
      ) : (
        "Not found"
      )}
    </>
  );
}

export default Post;
