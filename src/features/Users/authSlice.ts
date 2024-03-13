import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = "";
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
