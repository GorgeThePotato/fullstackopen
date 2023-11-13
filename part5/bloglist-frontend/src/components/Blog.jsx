import { useState } from "react"
import LikeButton from "./LikeButton"
import RemoveButton from "./RemoveButton"

const Blog = ({blog,updateLikes, deleteBlog,user}) => {

  const [visible,setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const pStyle = {
    display: 'inline-block'
  }
  return(
    <div style={blogStyle} className='blog'>
      <p className='blog_title'>{blog.title}<button style={hideWhenVisible} onClick={toggleVisibility} className='show_details'>view</button><button style={showWhenVisible} onClick={toggleVisibility}>hide</button></p>
      <p className='blog_author'>{blog.author}</p>
      <div style={showWhenVisible} className="blog_details">
        <p className='blog_url'>{blog.url}</p>
        <p className='blog_likes' style={pStyle}>{blog.likes}</p><LikeButton blog={blog} updateLikes={updateLikes}/><br />
        {user.name === blog.user.name && <RemoveButton blog={blog} deleteBlog={deleteBlog}/>}
      </div>
    </div>  
  )
} 
export default Blog