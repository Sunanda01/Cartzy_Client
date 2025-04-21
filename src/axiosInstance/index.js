import { logoutUser } from "@/store/auth-slice";
import axios from "axios";

// Create Axios instance

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials:true
});

// Function to get tokens from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("cartzy_token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setupInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(logoutUser());
        window.location.href="/auth/login"
      }
      return Promise.reject(error);
    }
  );
};
export default axiosInstance;
