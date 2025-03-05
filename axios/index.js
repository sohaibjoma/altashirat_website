import axios from "axios";
import { useCookie } from "#app";

// Create the Axios instance
const api = axios.create({
  baseURL: "https://intern.api.altashirat.solutionplus.net/api",
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.client) { 
      const token = useCookie("userToken")?.value || null;
      const locale = useCookie("locale")?.value;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (locale) {
        config.headers["x-locale"] = locale;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);

export default api; 