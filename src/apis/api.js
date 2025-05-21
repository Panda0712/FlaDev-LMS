import axios from "axios";

// "http://127.0.0.1:8000/api"
// "http://localhost:5174/api"

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL ||
  "https://lms-backend-production-b51f.up.railway.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
