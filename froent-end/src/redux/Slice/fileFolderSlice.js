import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { resFileStatus, shareFileEdit } from "./shareSlice";



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
          if (getAfterDelete.status === 200) {
            try {
              const foldersData = getAfterDelete.data;
              const filesGet = await api.GetFilesAPI(token);
              return [filesGet.data, foldersData];
            } catch (error) {}
          }
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

export const searchDocument = createAsyncThunk(
  "fileFolders/searchDocument",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.searchDocumentAPI(body, token);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const hideDocument = createAsyncThunk(
  "fileFolders/hideDocument",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.hideFileFolderAPI(body, token);
      if (response.status === 200) {
        try {
          const getAfterDelete = await api.GetFoldersAPI(token);
          if (getAfterDelete.status === 200) {
            try {
              const foldersData = getAfterDelete.data;
              const filesGet = await api.GetFilesAPI(token);
              return [filesGet.data, foldersData];
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
  extraReducers: (builder) => {
    builder.addCase(addFolder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFolder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder.push(action.payload.result);
      state.message = action.payload.message;
    });
    builder.addCase(addFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(getFolders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFolders.fulfilled, (state, action) => {
      state.isLoading = false;
      const newdata = action.payload.data;
      state.userFolder = newdata;
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(deleteFolder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload[1].data;
      state.userFiles = action.payload[0].data.files;
      state.message = "Deleted Successfully";
    });
    builder.addCase(deleteFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(hideFolder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(hideFolder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload.folders;
      state.userFiles = action.payload.files;
      state.message = action.payload.message;
      state.error = action.payload.error;
    });
    builder.addCase(hideFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(renameFolder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(renameFolder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload[0].data;
      action.payload[1] === undefined
        ? (state.message = "Renamed Sucessfully")
        : (state.message = "");
      state.error = action.payload[1];
    });
    builder.addCase(renameFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Connot Rename";
    });
    builder.addCase(uploadFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFiles.push(action.payload.newFile);
      state.message = "File Upload Successfully";
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.error;
    });
    builder.addCase(getFiles.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action);
      state.userFiles = action.payload.data.files;
    });
    builder.addCase(getFiles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Can not get files";
    });
    builder.addCase(hideDocument.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(hideDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload[1].data;
      state.userFiles = action.payload[0].data.files;
      state.message = "Hide Successfully";
    });
    builder.addCase(hideDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(searchDocument.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFolder = action.payload.folders;
      state.userFiles = action.payload.files;
      state.message = action.payload.message;
    });
    builder.addCase(searchDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data.message;
    });
    builder.addCase(resFileStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const newdata = action.payload[0].data.files;
      state.userFiles = newdata;
    });
    builder.addCase(shareFileEdit.fulfilled, (state, action) => {
      state.isLoading = false;
      const newdata = action.payload[0].data.files;
      state.userFiles = newdata;
      state.message = action.payload[1];
    });
  },
});

export const { emptyMessages, setCurrentFolder } = fileFolderSlice.actions;
export default fileFolderSlice.reducer;
