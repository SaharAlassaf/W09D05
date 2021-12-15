import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/sign";
import SigninGoogle from "../SigninGoogle";
import axios from "axios";

function Signin() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [emailORusername, setEmailORusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });

  // const state = useSelector((state) => {
  //   return {
  //     sign: state.sign
  //   };
  // });
  // console.log(state.sign);

  const signin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, {
        emailORusername,
        password
      });

      const data = {
        id: res.data.result._id,
        role: res.data.result.role.role,
        token: res.data.token
      };
      dispatch(login(data));
      if (res.data.result.role.role === "admin") {
        navigate(`/Dashboard`);
      } else {
        navigate(`/Posts`);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setError({ state: true, message: error.response.data });
    }
  };

  return (
    <div id="auth" className="bg-body">
      <div className="row align-items-center">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <div id="auth-left">
            {/* <div className="auth-logo">
              <a href="index.html"><img src="" alt="Logo"></a>
               </div> */}
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle mb-5">
              Your Sign in informaion are saved.
            </p>

            <form onSubmit={signin}>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="text"
                  className={
                    error.state
                      ? "form-control form-control-xl is-invalid"
                      : "form-control form-control-xl"
                  }
                  placeholder="Email or Username"
                  onChange={(e) => setEmailORusername(e.target.value)}
                  require="true"
                />
                <div className="form-control-icon">
                  <i className="bi bi-envelope"></i>
                </div>
              </div>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="password"
                  className={
                    error.state
                      ? "form-control form-control-xl is-invalid"
                      : "form-control form-control-xl"
                  }
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  require="true"
                />
                <div className="form-control-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>
              </div>
              <p>
                <small className="text-muted">{error.message}</small>
              </p>
              <input
                type="submit"
                value="Sign in"
                className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
              />
            </form>
            <div className="text-center mt-5 text-lg fs-4">
              <SigninGoogle />
              <div className="my-10">
              <Link to="/forgotPassword">
                {" "}
                <p> Forgot password?</p>{" "}
              </Link>
              </div>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <span className="font-bold">
                  <Link to="/Signup">Sign up</Link>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-7 d-none d-lg-block">
          <div id="auth-right"></div>
        </div>
      </div>
    </div>
    // <>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     onChange={(e) => setEmailORusername(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={signin}>Sign in</button>
    //   {message}
    //   <SigninGoogle />
    //   <Link to="/ForgotPassword">
    //     {" "}
    //     <p> forgot password?</p>{" "}
    //   </Link>
    //   <p>
    //     Don't have an account?{" "}
    //     <span>
    //       <Link to="/Signup">Sign up</Link>
    //     </span>
    //     .
    //   </p>
    // </>
  );
}

export default Signin;
