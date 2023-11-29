const Users = ({ users }) => {
  const userList = [...users];
  return (
    <div>
      {userList.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};
export default Users;
