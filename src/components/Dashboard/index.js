import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/sign";
import { getAllTasks } from "../../reducers/admin";
import Landing from "../Landing";
import Task from "../Task";
import axios from "axios";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
  }, []);

  const state = useSelector((state) => {
    return {
      sign: state.sign,
      admin: state.admin,
    };
  });

  console.log("tasks", state.admin);

  const getTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${state.sign.token}` },
      });
      console.log(res.data);
      dispatch(getAllTasks(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTasks = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/delatedTasks/${id}`,
        {
          headers: { Authorization: `Bearer ${state.sign.token}` },
        }
      );
      console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    dispatch(logout({ user: "", token: "" }));
  };

  return (
    <>
      {state.sign.token ? (
        <>
          <ul>
            {state.admin.posts.map((item) => (
              <Task key={item._id} item={item} deleteTasks={deleteTasks} />
            ))}
          </ul>
          <Link to="/">
            <button onClick={logOut}>log out</button>
          </Link>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

export default Dashboard;
