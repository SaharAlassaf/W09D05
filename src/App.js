import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Posts from "./components/Posts";
import Post from "./components/Post";
import SigninGoogle from "./components/SigninGoogle";
import ForgotPassword from "./components/forgotPassword"
import ResetPassword from "./components/resetPassword"
import ActivateAccount from "./components/ActivateAccount";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Signin" element={<Signin />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/activateAccount" element={<ActivateAccount />} />
        <Route exact path="/SigninGoogle" element={<SigninGoogle />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Posts" element={<Posts />} />
        <Route exact path="/Post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
