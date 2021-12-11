const initState = {
  posts: [],
};

const admin = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_TASKS":
      return payload;

    case "DELETE_TASKS":
      return { posts: state.tasks.filter((item) => item._id !== payload) };

    default:
      return state;
  }
};

export default admin;

export const getAllTasks = (data) => {
  return {
    type: "GET_TASKS",
    payload: { posts: data },
  };
};

export const deleteAnyTasks = (data) => {
  return {
    type: "DELETE_TASKS",
    payload: data,
  };
};
