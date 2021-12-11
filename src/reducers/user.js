const initState = {
  posts: [],
};

const user = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_TASKS":
      return payload;

    case "POST_TASKS":
      const posts = [...state.posts, payload];
      return { posts };

    case "PUT_TASKS":
      return {
        posts: state.posts.map((item) => {

          if (payload._id === item._id) {
            return { ...item, desc: payload.desc };
          } else {
            return item;
          }
        }),
      };

    case "DELETE_TASKS":
      return { posts: state.posts.filter((item) => item._id !== payload) };

    default:
      return state;
  }
};

export default user;

export const getTasks = (data) => {
  return {
    type: "GET_TASKS",
    payload: { posts: data },
  };
};

export const postTasks = (data) => {
  return {
    type: "POST_TASKS",
    payload: data,
  };
};

export const putTasks = (data) => {
  return {
    type: "PUT_TASKS",
    payload: data,
  };
};

export const deleteTasks = (data) => {
  return {
    type: "DELETE_TASKS",
    payload: data,
  };
};
