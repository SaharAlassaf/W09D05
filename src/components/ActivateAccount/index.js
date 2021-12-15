import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function ActivateAccount() {
  let navigate = useNavigate();
  const [message, setMessage] = useState(false);

  const state = useSelector((state) => {
    return {
      auth: state.auth.token
    };
  });

  const activateAccount = async () => {
    let activeTokenStorage = localStorage.getItem("activeToken");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/activateAccount`,
        {
          token: activeTokenStorage
        }
      );
      console.log(res.data);
      localStorage.clear();
    } catch (error) {
      console.log("here");
      console.log(error);
      setMessage(true);
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <>
      {state.auth.token ? (
        "Fail"
      ) : (
        <div className="col-md-8 col-9 offset-md-4 my-24">
        <h1 className="error-title"><>{message ? "Fail server" : "Signup successfully✅"}</></h1>
        <button
          onClick={() => navigate("/Signin")}
          className="btn btn-lg btn-outline-primary mt-3"
        >
          Sign in
        </button>
      </div>
      )}
    </>
  );
}

export default ActivateAccount;
