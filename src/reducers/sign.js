const initState = {
  role: "",
  token: "",
  userId: ""
};

const sign = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, userId } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      return { role, token, userId };

    case "LOGOUT":
      localStorage.clear();
      return payload;

    default:
      let tokenStorage = localStorage.getItem("token");
      let roleStorage = localStorage.getItem("role");
      let idStorage = localStorage.getItem("userId");
      if (tokenStorage && roleStorage && idStorage) return { role: roleStorage, token: tokenStorage, userId: idStorage };
      else return state;
  }
};

export default sign;

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
