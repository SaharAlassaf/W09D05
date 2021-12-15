import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  let navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      auth: state.auth.token
    };
  });

  const resetPassword = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/resetPassword`, {
        resetLink: state.auth,
        newPass
      });
      setReset(true);
      localStorage.clear();
    } catch (error) {
      console.log(error);
      setMessage("Somthing went wrong!");
    }
  };
  return (
    <>
      {reset ? (
        <div className="col-md-8 col-9 offset-md-4 my-24">
        <h1 className="error-title">Reset successfully</h1>
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
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle mb-5">Input your new password</p>

                <form onSubmit={resetPassword}>
                  <div className="form-group position-relative has-icon-left mb-4">
                    <input
                      type="password"
                      className="form-control form-control-xl"
                      placeholder="New password"
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <div className="form-control-icon">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                  </div>
                  <p>
                    <small className="text-muted">{message}</small>
                  </p>
                  <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                    Reset
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

export default ResetPassword;
