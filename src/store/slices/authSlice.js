import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setLoading, loginSuccess, logoutSuccess } = authSlice.actions;

// Thunk to bootstrap auth
export const bootstrapAuth = () => (dispatch) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

  if (token && storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      dispatch(loginSuccess(parsedUser));
    } catch {
      dispatch(logoutSuccess());
    }
  } else {
    dispatch(setLoading(false));
  }
};

// Thunk for login
export const loginAction = (data, rememberMe = false) => (dispatch) => {
  console.log("REDUX AUTH LOGIN CALLED 👉", { ...data, rememberMe });

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem("token", data.token);
  storage.setItem("user", JSON.stringify(data.user));

  dispatch(loginSuccess(data.user));
};

// Thunk for logout
export const logoutAction = () => (dispatch) => {
  console.log("REDUX AUTH LOGOUT 👉");

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  
  dispatch(logoutSuccess());
};

export default authSlice.reducer;
