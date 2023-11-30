import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router,
    Routes, 
    Route, 
    Link, 
    Navigate, 
    useParams, 
    useNavigate } from 'react-router-dom'

import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogList = ({ blogs }) => {

    const blogStyle = {
        paddingTop: 0,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 1,
      };

      const blogFormRef = useRef();

      const blogForm = () => {
        return (
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        );
      };

    const compareByLikes = (a, b) => {
        return b.likes - a.likes;
      };

      const blogsToSort = [...blogs];
      const sortedBlogs = blogsToSort.sort(compareByLikes);

      return (
        <div>
          {blogForm()} <br />
          {sortedBlogs.map((blog) => (
            <div style={blogStyle} key={blog.id}>
                <table>
                    <tbody>
                        <tr>
                            <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          ))}
        </div>
      );
}

export default BlogList