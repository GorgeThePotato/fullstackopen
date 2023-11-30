import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
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

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm />
      </Togglable>
    );
  };
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        {user && (
          <div>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <p style={{display: 'inline-block'}}>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
            <h1>Blogs</h1>
            <Routes>
              <Route path="/" element={<BlogList blogs={blogs} user={user}/>}/>
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<User users={users}/>} />
              <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user}/>} />
            </Routes>
          </div>
        )}
        <Error />
        <Notification />
        {!user && <div>
          <h1>Log in to the blog app!</h1>{loginForm()}</div>}
      </div>
    </Router>
  );
};

export default App;
