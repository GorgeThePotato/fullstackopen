import { useDispatch } from "react-redux";
import userReducer, { userData } from "../reducers/userReducer";
import errorReducer, { setError } from "../reducers/errorReducer";
import SendIcon from '@mui/icons-material/Send';
import { createTheme, TextField, Stack, Button, Grid, Box, ThemeProvider, Container, CssBaseline, Typography} from "@mui/material";
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
  const defaultTheme = createTheme();
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Typography component="h1" variant="h5">
            Log in
          </Typography>
        <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username" 
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus/>
          <TextField 
            margin="normal"
            id="password"
            required
            fullWidth 
            label="Password" 
            type="password" 
            name="Password"/>
          <Button 
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }} 
            id="login-button">
            Login
          </Button>
      </Box>
      </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default LoginForm;
