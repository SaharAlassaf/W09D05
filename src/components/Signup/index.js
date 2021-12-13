import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { active } from "../../reducers/auth";
import SigninGoogle from "../SigninGoogle";
import axios from "axios";

function Signup() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const signup = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        email,
        username,
        password
      });
      console.log(res.data);
      dispatch(active(res.data.token));
      // console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setMessage(error.response.data.message)
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup}>Sign up</button>
      {message}
      <SigninGoogle />
      <p>
        Already have an account?{" "}
        <span>
          <Link to="/Signin">Sign in</Link>
        </span>
        .
      </p>
    </>
  );
}

export default Signup;
