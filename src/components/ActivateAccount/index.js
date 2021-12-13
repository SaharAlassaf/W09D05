import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ActivateAccount() {
  const [message, setMessage] = useState(false);

  const state = useSelector((state) => {
    return {
      auth: state.auth.token
    };
  });

  console.log(state.auth);

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
    //   localStorage.clear();
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
        <>{message ? "Fail server" : "Signup successfully✅"}</>
      )}
    </>
  );
}

export default ActivateAccount;
