import axios from "axios";

export const expenseApi = axios.create({
  baseURL: import.meta.env.VITE_EXPENSES_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

expenseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});