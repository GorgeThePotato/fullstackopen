import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/ErrorMessage'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogOut = async (event) =>{
    event.preventDefault()
    try{
      window.localStorage.removeItem('loggedBlogappUser')
      window.localStorage.clear()
      setUser(null)
    }
    catch(exception){

    }
  }

  const addBlog = async (event) =>{
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url
      }
      blogService.createBlog(blog)
      .then(returnedBlog =>{
        setBlogs(blogs.concat(returnedBlog))
      })
      .then(()=>{
        setNotification(`a new blog ${title} by ${author} added`)
        setTimeout(() =>{
          setNotification(null)
        },5000)
      })
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Unable to add the blog!')
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    }
  }

  const blogForm = () =>(
    <form onSubmit={addBlog}>
      <div>
        title
        <input 
        type="text" 
        value={title}
        name='Title'
        onChange={({target}) =>setTitle(target.value)}/>
      </div>
      <div>
        author
        <input type="text" 
        value={author}
        name='Author'
        onChange={({target})=>setAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type="text" 
        value={url}
        name='Url'
        onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const loginForm = () =>(
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Error errorMessage={errorMessage}/>
      <Notification message={notification}/>

      {user === null && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p><br />
        {blogForm()} <br />
        {blogList()}</div>}
    </div>
  )
}

export default App