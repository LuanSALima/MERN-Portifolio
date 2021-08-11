import axios from "axios";
import jwt from "./auth";

import { getLanguage } from './i18n';

const api = axios.create();

api.interceptors.request.use(
  async config => {
    const language = getLanguage();
    const token = jwt.getAccessToken();

    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    if (language) {
    	config.headers['Accept-Language'] = `${language}`;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  console.log(error);
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    
    try {
      const rs = await api.post("/api/auth/refresh-token", {
        refreshToken: jwt.getRefreshToken(),
      });

      const { accessToken, user } = rs.data;
      jwt.setAccessToken(accessToken);
      jwt.setUser(user)

      return api(originalRequest);
    } catch (_error) {
      return Promise.reject(_error);
    }

  }
  return Promise.reject(error);
});


export default api;