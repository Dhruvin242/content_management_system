import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const authAxios = (token) =>
  axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const GetFoldersAPI = (token) =>
  authAxios(token).get(`/api/v1/folder/getFolderByUserId`);
