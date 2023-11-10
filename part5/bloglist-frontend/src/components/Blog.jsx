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
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      {blog.title}<button style={hideWhenVisible} onClick={toggleVisibility}>view</button><button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible}>
        {blog.author} <br />
        {blog.url} <br />
        {blog.likes} <LikeButton blog={blog} updateLikes={updateLikes}/><br />
        {user.name === blog.user.name && <RemoveButton blog={blog} deleteBlog={deleteBlog}/>}
      </div>
    </div>  
  )
} 
export default Blog