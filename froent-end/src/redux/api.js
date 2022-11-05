import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const LoginAPI = (formData) => API.post("/api/v1/user/login", formData);
export const googleSignIn = (result) => API.post("/api/v1/user/googleSignIn", result);