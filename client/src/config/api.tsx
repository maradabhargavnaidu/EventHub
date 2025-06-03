import axios from "axios";

const API_BASE_URL = "https://eventhub-qrau.onrender.com/api";
// const API_LOCAL_URL = "http://localhost:5000/api";
export const api = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: API_LOCAL_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const resSession = localStorage.getItem("token");
      if (resSession) {
        config.headers["authorization"] = resSession;
      } else {
        config.headers["authorization"] = "";
      }
    } catch (err) {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
