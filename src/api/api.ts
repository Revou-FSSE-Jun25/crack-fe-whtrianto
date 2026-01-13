import axios from "axios";

const baseUrlFromEnv = (import.meta as any).env?.VITE_API_URL as string | undefined;
const baseURL = `${baseUrlFromEnv ?? "http://localhost:5000"}/api`;

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

