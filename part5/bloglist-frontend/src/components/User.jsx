import { BrowserRouter as Router,
    Routes, 
    Route, 
    Link, 
    Navigate, 
    useParams, 
    useNavigate } from 'react-router-dom'

const User = ({ users }) => {
    const userId = useParams().id
    const user = users.find(u => u.id === userId)

    if(!user){
        return null
    }

    return(
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
            {user.blogs.map((blog) =>(
                <li key={blog.id}>{blog.title}</li>
            ))}
            </ul>
        </div>
    )
}

export default User;