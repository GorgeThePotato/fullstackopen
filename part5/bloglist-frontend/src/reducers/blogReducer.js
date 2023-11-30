import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import errorReducer, { setError } from "./errorReducer";
import notificationReducer, { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

export const initializedBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `New blog titled ${newBlog.title} by ${newBlog.author} was added`,
          5,
        ),
      );
    } catch (error) {
      dispatch(setError(`Unable to add blog`, 5));
    }
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    const id = content.id;
    const blogs = await blogService.getAll();
    const blogToChange = blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    await blogService.updateBlogLikes(id, changedBlog);
    const refreshBlogs = await blogService.getAll();
    dispatch(setBlogs(refreshBlogs));
  };
};

export const commentBlog = (content) => {
  return async (dispatch) => {
    const id = content.id;
    const comment = {comments: content.comment}
    await blogService.updateBlogComments(id,comment)
    const refreshBlogs = await blogService.getAll();
    dispatch(setBlogs(refreshBlogs));
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    const id = content.id;
    await blogService.deleteBlog(id);
    const refreshBlogs = await blogService.getAll();
    dispatch(setBlogs(refreshBlogs));
  };
};

export default blogSlice.reducer;
