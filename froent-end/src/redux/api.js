import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const register = (formdata) => API.post("/api/v1/user/register", formdata);
export const login = (formdata) => API.post("/api/v1/user/login", formdata);