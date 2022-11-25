import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { googleSignIn, login } from "../redux/Slice/userSlice";
import LinearProgress from "@mui/material/LinearProgress";
import DisplayAlert from "../components/alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export const SignIn = () => {
  const [isLoading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userState, message, error } = useSelector(
    (state) => (
      { userState: state.user }
      // { message: state.user.message },
      // { error: state.user.error }
    ),
    shallowEqual
  );
  const user = localStorage.getItem("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = (data) => {
    if (userState.loading) {
      setLoading(true);
    }
    dispatch(login({ data, navigate }));
  };

  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate }));
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "154957696752-7b6n1tjqnk82dj7daphbvqutvld6vv12.apps.googleusercontent.com",
      });
    });
  }, []);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  const googleFailure = (err) => {
    console.log("I am in error block");
  };

  return (
    <div className="login-page-wrapper">
    <ThemeProvider theme={theme}>
      {userState.error && (
        <DisplayAlert
          title="error"
          message={userState.error}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      {userState.message && (
        <DisplayAlert
          title="success"
          message={userState.message}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      
      <Container component="main" maxWidth="xs">
      <div className="login-body">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {isLoading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSubmitForm)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Required Field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email Address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Required Field",
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <GoogleLogin
              clientId="154957696752-7b6n1tjqnk82dj7daphbvqutvld6vv12.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor : "#ff8100"}}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon sx={{ mr: 1 }} />
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />

            <Grid container>
              <Grid item xs sx={{mt : 1}}>
                <Link href="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link  href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ pb : 2 ,pt:2 }} />
        </div>
      </Container>
    </ThemeProvider>
    </div>
  );
};
