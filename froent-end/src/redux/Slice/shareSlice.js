import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  isLoading: true,
  userFiles: [],
  shareCount: 0,
  error: "",
  message: "",
};

export const badgeCount = createAsyncThunk(
  "shareFiles/badgeCount",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.badgeContentAPI(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resFileStatus = createAsyncThunk(
  "shareFiles/resFileStatus",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.fileStatus(body, token);
      if (response.status === 200) {
        try {
          let getAfterRes = await api.GetFilesAPI(token);
          if (getAfterRes.status === 200) {
            try {
              const getResponse = getAfterRes.data;
              const badgeCount = await api.badgeContentAPI(token);
              return [getResponse, badgeCount.data];
            } catch (error) {}
          }
        } catch (error) {
          console.log("error", error);
          return rejectWithValue(error);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const shareFile = createAsyncThunk(
  "shareFiles/shareFile",
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await api.shareFileAPI(body, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const shareFileEdit = createAsyncThunk(
  "shareFiles/shareFileEdit",
  async ({ body, token, fileId }, { rejectWithValue }) => {
    try {
      const response = await api.FileEditAPI(body, token, fileId);
      if (response.status === 200) {
        try {
          const message = response.data.message;
          const getFiles = await api.GetFilesAPI(token);
          return [getFiles.data, message];
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const shareFiles = createSlice({
  name: "shareFiles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(badgeCount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(badgeCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFiles = action.payload.data;
      state.shareCount = action.payload.shareCount;
    });
    builder.addCase(badgeCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong Please try again later";
    });
    builder.addCase(resFileStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resFileStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shareCount = action.payload[1].shareCount;
      console.log("success", action);
    });
    builder.addCase(resFileStatus.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action);
    });
    builder.addCase(shareFile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(shareFile.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.userFiles = action.payload.data;
      state.shareCount = action.payload.shareCount;
    });
    builder.addCase(shareFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Share File Failed";
    });
    builder.addCase(shareFileEdit.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(shareFileEdit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload[1];
    });
    builder.addCase(shareFileEdit.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action);
      state.error = "Something went wrong Please try again later";
    });
  },
});

export default shareFiles.reducer;
