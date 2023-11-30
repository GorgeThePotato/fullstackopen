import { useState } from "react";
import LikeButton from "./LikeButton";
import RemoveButton from "./RemoveButton";
import CommentForm from "./CommentForm";
import { BrowserRouter as Router,
  Routes, 
  Route, 
  Link, 
  Navigate, 
  useParams, 
  useNavigate } from 'react-router-dom'

const Blog = ({ blogs, user }) => {
  const blogId = useParams().id
  const blog = blogs.find(b => b.id === blogId)

  if(!blog){
    return null
  }
  
  const comments = [...blog.comments]

  function generateID() {
    return Math.random().toString(36);
  }

  return (
    <div className="blog">
      <h1 className="blog_title">
        {blog.title}
      </h1>
      <p className="blog_url">{blog.url}</p>
      <p className="blog_likes">{blog.likes} likes<LikeButton blog={blog} /></p>
      <p className="blog_author">Added by {blog.author}</p>
        {user.name === blog.user.name && <RemoveButton blog={blog} />}
      <h3>comments</h3>
      <CommentForm blog={blog}/>
      <ul>
        {comments.map((comment)=>(
          <li key={generateID()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};
export default Blog;
