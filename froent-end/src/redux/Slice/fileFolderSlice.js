import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolder: [],
  userFiles: [],
  error: "",
  message: "",
  isDeleted: false,
};

export const addFolder = createAsyncThunk(
  "fileFolders/addfolder",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.CreateFolderAPI(body, token);
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
      if (response.status === 200) {
        try {
          const getAfterDelete = await api.GetFoldersAPI(token);
          return getAfterDelete.data;
        } catch (error) {
          console.log("error", error);
          return rejectWithValue(error);
        }
      }
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const hideFolder = createAsyncThunk(
  "fileFolders/hideFolder",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await api.HidePassCodeAPI(data, token);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const renameFolder = createAsyncThunk(
  "fileFolders/renameFolder",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await api.RenameFolderAPI(body, token);
      if (response.status === 200) {
        try {
          console.log("last res", response.data);
          let lastRes = response.data?.error;
          let getAfterDelete = await api.GetFoldersAPI(token);
          if (lastRes === undefined) return [getAfterDelete.data];
          return [getAfterDelete.data, lastRes];
        } catch (error) {
          console.log("error", error);
          return rejectWithValue(error);
        }
      }
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "fileFolders/uploadFile",
  async ({ data, config }, { rejectWithValue }) => {
    try {
      const response = await api.UploadFileAPI(data, config);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const getFiles = createAsyncThunk(
  "fileFolders/getFiles",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.GetFilesAPI(token);
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
      state.userFolder = action.payload.data;
      // state.message = action.payload.message;
    },
    [deleteFolder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    },
    [hideFolder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [hideFolder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload.data;
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    [hideFolder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    },
    [renameFolder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [renameFolder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload[0].data;
      action.payload[1] === undefined
        ? (state.message = "Renamed Sucessfully")
        : (state.message = "");
      state.error = action.payload[1];
    },
    [renameFolder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Connot Rename";
    },
    [uploadFile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFiles.push(action.payload.newFile);
      state.message = "File Upload Successfully";
    },
    [uploadFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.error;
    },
    [getFiles.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getFiles.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newdata = action.payload.data.files;
      state.userFiles = newdata;
    },
    [getFiles.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Can not get files";
    },
  },
});

export const { emptyMessages, setCurrentFolder } = fileFolderSlice.actions;
export default fileFolderSlice.reducer;
