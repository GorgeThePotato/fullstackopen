import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Error from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";
import blogService from "./services/blogs";
import errorReducer, { setError } from "./reducers/errorReducer";
import { initializedBlogs, addBlog } from "./reducers/blogReducer";
import userReducer, { setUser } from "./reducers/userReducer";
import usersReducer, { initializedUsers } from "./reducers/usersReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializedBlogs());
    dispatch(initializedUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  console.log(users);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  const handleLogOut = (event) => {
    event.preventDefault();
    try {
      dispatch(setUser(null));
    } catch (exception) {
      dispatch(setError(`Unable to log out`, 5));
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm />
      </Togglable>
    );
  };

  const blogList = () => {
    const compareByLikes = (a, b) => {
      return b.likes - a.likes;
    };
    const blogsToSort = [...blogs];
    const sortedBlogs = blogsToSort.sort(compareByLikes);
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    );
  };

  const userList = () => {
    return (
      <Router>
        <div>
          <Link to="/users"></Link>
        </div>
        <Routes>
          <Route path="/users" element={<Users users={users} />} />
        </Routes>
      </Router>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Error />
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogOut}>log out</button>
          </p>
          <br />
          {blogForm()} <br />
          {blogList()} <br />
          {userList()}
        </div>
      )}
    </div>
  );
};

export default App;
