import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import fileFolderSlice from "./Slice/fileFolderSlice";
import shareSlice from "./Slice/shareSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

//make persist store
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  fileFolders: fileFolderSlice,
  shareFiles: shareSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);
