import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import SigninGoogle from "./components/SigninGoogle";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Signin" element={<Signin />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/SigninGoogle" element={<SigninGoogle />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
