import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      const content = action.payload;
      return content;
    },
    hideNotification(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { setErrorMessage, hideNotification } = errorSlice.actions;

export const setError = (content, timeout) => {
  return async (dispatch) => {
    const errorMessage = content;
    const timeoutInSeconds = timeout;
    dispatch(setErrorMessage(errorMessage));
    setTimeout(() => {
      dispatch(hideNotification(null));
    }, timeoutInSeconds * 1000);
  };
};

export default errorSlice.reducer;
