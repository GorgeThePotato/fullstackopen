import { BrowserRouter as Router,
  Routes, 
  Route, 
  Link, 
  Navigate, 
  useParams, 
  useNavigate } from 'react-router-dom'

const Users = ({ users }) => {
  const userList = [...users];
  const style = {
    textAlign: 'center'
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        {userList.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td style={style}>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
export default Users;
