import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "user/login",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.LoginAPI(data);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.RegisterAPI(data);
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async ({ result, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await api.ResetPasswordOTP(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetChangePassword = createAsyncThunk(
  "user/resetPassword",
  async ({ data, navigate, token }, { rejectWithValue }) => {
    try {
      const response = await api.ResetChangePassword({ data, token });
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyError: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [resetChangePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetChangePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [resetChangePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
  },
});

export const { emptyError } = userSlice.actions;
export default userSlice.reducer;
