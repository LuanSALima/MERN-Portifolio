import axios from "axios";
import { getToken } from "./auth";

import { getLanguage } from './i18n';

/*
const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});
*/
const api = axios.create();

api.interceptors.request.use(async config => {
  const token = getToken();
  const language = getLanguage();

  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  if (language) {
  	config.headers['Accept-Language'] = `${language}`;
  }
  return config;
});

export default api;