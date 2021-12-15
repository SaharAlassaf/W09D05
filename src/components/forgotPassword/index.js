import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../reducers/auth";
import axios from "axios";

function ForgotPassword() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const forgotPassword = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/forgotPassword`,
        {
          email
        }
      );
      dispatch(reset(res.data.token));
      setSendEmail(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sendEmail ? (
        <div className="col-md-8 col-9 offset-md-4 my-24">
          <h1 className="error-title">Email have been sent</h1>
          <button
            onClick={() => navigate("/Signin")}
            className="btn btn-lg btn-outline-primary mt-3"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div id="auth">
          <div className="row h-100">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              {" "}
              <div id="auth-left">
                <h1 className="auth-title">Forgot Password</h1>
                <p className="auth-subtitle mb-5">
                  Input your email and we will send you reset password link.
                </p>

                <form onSubmit={forgotPassword}>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      type="email"
                      className="form-control form-control-xl"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                    Send
                  </button>
                </form>
                <div className="text-center mt-5 text-lg fs-4">
                  <p className="text-gray-600">
                    Remember your account? <Link to="/Signin">Sign in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
