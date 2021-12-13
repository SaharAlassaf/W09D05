import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/sign";
import Landing from "../Landing";
import Post from "../Post";
import axios from "axios";

function Dashboard() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const state = useSelector((state) => {
    return {
      sign: state.sign
    };
  });

  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${state.sign.token}` }
      });
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteUser/${id}`,
        {
          headers: { Authorization: `Bearer ${state.sign.token}` }
        }
      );
      // console.log(res.data);
      getUsers();
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const logOut = () => {
    dispatch(logout({ user: "", token: "" }));
    navigate(`/`);
  };

  return (
    <>
      {state.sign.token ? (
        <>
          <h1>Dashboard</h1>
          {message}
          {users.map((item) => (
            <div key={item._id}>
              <h4>{item.email}</h4>
              <h4>{item.username}</h4>
              <button onClick={() => deleteUsers(item._id)}>Delete</button>
            </div>
          ))}
          <button onClick={logOut}>log out</button>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

export default Dashboard;
