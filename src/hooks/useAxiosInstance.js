import axios from "axios";
import { baseURL } from "../shared/baseURL";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add an interceptor to include the token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
