import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])

  const handleLogin = async (event) =>{
    event.preventDefault()
    try {
      const user = await loginService.login({username,password})
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogOut = (event) =>{
    event.preventDefault()
    try{
      window.localStorage.removeItem('loggedBlogappUser')
      window.localStorage.clear()
      setUser(null)
    }
    catch(exception){

    }
  }

  const addBlog = (blogObject) =>{
    try {
      blogFormRef.current.toggleVisibility()
      blogService.createBlog(blogObject)
      .then(returnedBlog =>{
        setBlogs(blogs.concat(returnedBlog))
      })
      .then(()=>{
        setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() =>{
          setNotification(null)
        },5000)
      })
    } catch (exception) {
      setErrorMessage('Unable to add the blog!')
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogList = () => (
    <div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog}/>
    )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Error errorMessage={errorMessage}/>
      <Notification message={notification}/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p><br />
        {blogForm()} <br />
        {blogList()}</div>}
    </div>
  )
}

export default App