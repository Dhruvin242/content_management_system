import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolder: [],
  userFiles: [],
  error: "",
  message: "",
};

export const addFolder = createAsyncThunk(
  "fileFolders/addfolder",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.CreateFolderAPI(body, token);
      // navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFolders = createAsyncThunk(
  "fileFolders/getFolders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.GetFoldersAPI(token);
      // navigate("/dashboard");
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "fileFolders/deleteFolder",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.DeleteFolderAPI(body, token);
      // navigate("/dashboard");
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

const fileFolderSlice = createSlice({
  name: "fileFolders",
  initialState,
  reducers: {
    emptyMessages: (state, action) => {
      state.error = "";
      state.message = "";
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
  },
  extraReducers: {
    [addFolder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addFolder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFolder.push(action.payload.result);
      state.message = action.payload.message;
    },
    [addFolder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    },
    [getFolders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getFolders.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newdata = action.payload.data;
      state.userFolder = newdata;
    },
    [getFolders.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    },
    [deleteFolder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteFolder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      // state.userFolder = newdata;
    },
    [deleteFolder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    },
  },
});

export const { emptyMessages, setCurrentFolder } = fileFolderSlice.actions;
export default fileFolderSlice.reducer;
