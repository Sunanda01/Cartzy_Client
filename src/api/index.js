import axios from "axios";
// Create Axios instance

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

// Function to get tokens from localStorage
api.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("cartzy_token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
