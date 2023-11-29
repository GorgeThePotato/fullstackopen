import { useDispatch } from "react-redux";
import userReducer, { userData } from "../reducers/userReducer";
import errorReducer, { setError } from "../reducers/errorReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    const username = event.target.Username.value;
    const password = event.target.Password.value;
    try {
      dispatch(userData({ username, password }));
    } catch (error) {
      dispatch(setError(`Unable to log in ${error}`));
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          username
          <input type="text" name="Username" id="username" />
        </div>
        <div>
          password
          <input type="password" name="Password" id="password" />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
