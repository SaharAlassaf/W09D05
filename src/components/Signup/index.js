import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/sign";
import axios from "axios";

function Signup() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      sign: state.sign,
    };
  });

  const signup = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        email,
        password,
      });
      // console.log(res.data);
      const data = {
        role: res.data.result.role.role,
        token: res.data.token,
      };
      dispatch(login(data));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!state.sign.token ? (
        <>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signup}>Sign up</button>
        </>
      ) : (
        <>
          <Link to="/Tasks">
            <buttoun>Tasks</buttoun>
          </Link>{" "}
        </>
      )}
    </>
  );
}

export default Signup;
