import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";

function SigninGoogle() {
    let navigate = useNavigate();

  const responseSuccessGoogle = async (response) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/googleSignin`, {
        token: response.tokenId
      });
      console.log("Google signin success",res);
      navigate(`/Posts`);

    } catch (error) {
      console.log(error);
    }
  };

  const responseErrorGoogle = () => {
    console.log("Somthing went wrong!");
  };

  return (
    <>
      <p>or signin with Google</p>
      <GoogleLogin
        clientId= "303299576143-aiehfsg7l0jrm7313aav0smgh11g150h.apps.googleusercontent.com"
        buttonText="Signin with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default SigninGoogle;
