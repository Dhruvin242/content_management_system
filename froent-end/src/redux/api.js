import axios from "axios";
const localhost = "http://localhost:5000";
const deploy = "https://content-management-system16.herokuapp.com";

const API = axios.create({
  baseURL: localhost,
});

const authAxios = (token) =>
  axios.create({
    baseURL: localhost,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const authHeader = (config) =>
  axios.create({
    baseURL: localhost,
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

export const UnhideFileFolderAPI = (body, token) => {
  console.log(body)
  return authAxios(token).post(`/api/v1/user/unHide`, body);
};

export const searchDocumentAPI = (body, token) => {
  return authAxios(token).get(`/api/v1/file/search/${body.searchWord}`);
};

export const shareFileAPI = (body, token) => {
  return authAxios(token).post(`api/v1/file/sharedFile`, body);
};

export const badgeContentAPI = (token) => {
  return authAxios(token).get(`/api/v1/file/bagdeContent`);
};

export const fileStatus = (body, token) => {
  return authAxios(token).post(`/api/v1/file/resReqFile`, body);
};

export const FileEditAPI = (body, token, fileId) => {
  return authAxios(token).post(
    `/api/v1/file/changefileContent/${fileId}`,
    body
  );
};
