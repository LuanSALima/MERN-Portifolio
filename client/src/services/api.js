import axios from "axios";
import { getToken } from "./auth";
/*
const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});
*/
const api = axios.create();

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;