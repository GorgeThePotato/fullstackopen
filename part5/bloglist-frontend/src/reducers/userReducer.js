import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userData = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials);
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
