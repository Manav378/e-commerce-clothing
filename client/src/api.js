import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,
  withCredentials: true, // cookies / JWT ke liye zaruri
});

export default api;
