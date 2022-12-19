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
import DisplayAlert from "../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/Slice/userSlice";

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

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error } = useSelector((state) => ({ ...state.user }));
  const { message } = useSelector((state) => ({ ...state.user.user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = (data) => {
    dispatch(registerUser({ data, navigate }));
  };

  return (
    <div className="login-page-wrapper">
      <ThemeProvider theme={theme}>
        {error && (
          <DisplayAlert
            title="error"
            message={error}
            vertical="top"
            horizontal="right"
          ></DisplayAlert>
        )}
        {message && (
          <DisplayAlert
            title="success"
            message={message}
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
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(handleSubmitForm)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      {...register("name", {
                        required: "Required Field",
                      })}
                      error={!!errors?.name}
                      helperText={errors?.name ? errors.name.message : null}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      {...register("email", {
                        required: "Required Field",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalied Email Address",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      autoFocus
                      {...register("password", {
                        required: "Required Field",
                      })}
                      error={!!errors?.password}
                      helperText={
                        errors?.password ? errors.password.message : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ pb: 1, pt: 1 }} />
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};
