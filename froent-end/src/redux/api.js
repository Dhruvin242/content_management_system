import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const authAxios = (token) =>
  axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const authHeader = (config) =>
  axios.create({
    baseURL: "http://localhost:5000",
    headers: config.headers,
  });

export const LoginAPI = (formData) => API.post("/api/v1/user/login", formData);

export const RegisterAPI = (formData) =>
  API.post("/api/v1/user/register", formData);

export const googleSignIn = (result) =>
  API.post("/api/v1/user/googleSignIn", result);

export const ResetPasswordOTP = (data) =>
  API.post("/api/v1/user/forgotPassword", data);

export const ResetChangePassword = ({ data, token }) =>
  API.post(`/api/v1/user/resetPassword/${token}`, data);

export const CreateFolderAPI = (body, token) =>
  authAxios(token).post(`/api/v1/folder/createFolder`, body);

export const GetFoldersAPI = (token) => {
  return authAxios(token).get(`/api/v1/folder/getFolderByUserId`);
};

export const DeleteFolderAPI = (body, token) =>
  authAxios(token).post(`/api/v1/folder/deleteFolder`, body);

export const HidePassCodeAPI = (data, token) => {
  return authAxios(token).post(`/api/v1/user/registerHideOtp`, data);
};

export const RenameFolderAPI = (body, token) => {
  return authAxios(token).patch(`/api/v1/folder/renameFolder`, body);
};

export const UploadFileAPI = (data, config) => {
  return authHeader(config).post(`/api/v1/file/uploadFile`, data);
};

export const GetFilesAPI = (token) => {
  return authAxios(token).get(`/api/v1/file/getFiles`);
};

export const hideFileFolderAPI = (body, token) => {
  return authAxios(token).post(`/api/v1/file/hide`, body);
};

export const searchDocumentAPI = (body, token) => {
  return authAxios(token).get(`/api/v1/file/search/${body.searchWord}`);
};
