import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { active } from "../../reducers/auth";
import "../../assets/css/auth.css";
import "../../App.css";
import "../../assets/css/bootstrap-icons/bootstrap-icons.css";
import "../../assets/css/bootstrap.css";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [errorEmail, setErrorEmail] = useState({ state: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    state: false,
    message: ""
  });
  const [errorUsername, setErrorUsername] = useState({
    state: false,
    message: ""
  });

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        email,
        username,
        password
      });
      console.log(res.data);
      dispatch(active(res.data.token));
      setMessage(true);
      // console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if (
        "Invalid password, make it more complex" === error.response.data.message
      ) {
        setErrorPassword({ state: true, message: error.response.data.message });
      } else if (
        "Invalid Email" === error.response.data.message ||
        "Failed! Email is already in use!" === error.response.data.message
      ) {
        setErrorEmail({ state: true, message: error.response.data.message });
      } else if (
        "Failed! Username is already in use!" === error.response.data.message
      ) {
        setErrorUsername({ state: true, message: error.response.data.message });
      }
    }
  };

  return (
    <>
      {message ? (
        <div class="col-md-8 col-9 offset-md-4 my-24">
        <h1 class="error-title">Please confirm your email address</h1>
        <button
          onClick={() => navigate("/Signin")}
          className="btn btn-lg btn-outline-primary mt-3"
        >
          Sign in
        </button>
      </div>
      ) : (
        <div id="auth" className="bg-body">
          <div className="row align-items-center">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div id="auth-left">
                {/* <div className="auth-logo">
              <a href="index.html"><img src="" alt="Logo"></a>
               </div> */}
                <h1 className="auth-title">Sign Up</h1>
                <p className="auth-subtitle mb-5">
                  Input your data to register to our website.
                </p>

                <form onSubmit={signup}>
                  <small className="text-muted">
                    eg.<i> someone@example.com</i>
                  </small>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      type="text"
                      className={
                        errorEmail.state
                          ? "form-control form-control-xl is-invalid"
                          : "form-control form-control-xl"
                      }
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      require="true"
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                  </div>
                  <p>
                    <small className="text-muted">{errorEmail.message}</small>
                  </p>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      type="text"
                      className={
                        errorUsername.state
                          ? "form-control form-control-xl is-invalid"
                          : "form-control form-control-xl"
                      }
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      require="true"
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-person"></i>
                    </div>
                  </div>
                  <p>
                    <small className="text-muted">
                      {errorUsername.message}
                    </small>
                  </p>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      type="password"
                      className={
                        errorPassword.state
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
                    <small className="text-muted">
                      {errorPassword.message}
                    </small>
                  </p>
                  <div>
                    Password should have
                    <ul>
                      <li>2 letters</li>
                      <li>1 Upper case</li>
                      <li>1 Lower case</li>
                      <li>2 digits</li>
                      <li>1 Symbol</li>
                    </ul>
                  </div>
                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                  />
                </form>
                <div className="text-center mt-5 text-lg fs-4">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <span className="font-bold">
                      <Link to="/Signin">Sign in</Link>
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
      )}
    </>
  );
}

export default Signup;
