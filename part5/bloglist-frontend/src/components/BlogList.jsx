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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
              <TableContainer  component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </div>
      );
}

export default BlogList