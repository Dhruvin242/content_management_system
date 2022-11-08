import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const addFolder = createAsyncThunk(
  "fileFolders/addfolder",
  async ({ data }, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.CreateFolderAPI(data);
      // navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  currentFolder: "",
  userFolder: [],
  userFiles: [],
};

const fileFolderSlice = createSlice({
  name: "fileFolders",
  initialState,
  extraReducers: {
    [addFolder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addFolder.fulfilled]: (state, action) => {
      state.isLoading = false;
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.userFolder = action.payload;
    },
    [addFolder.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { emptyError } = fileFolderSlice.actions;
export default fileFolderSlice.reducer;
