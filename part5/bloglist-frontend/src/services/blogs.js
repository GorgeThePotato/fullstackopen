import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken =>{
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newObject =>{
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}

const updateBlogLikes = async newObject =>{
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

export default { getAll, createBlog, setToken, updateBlogLikes }