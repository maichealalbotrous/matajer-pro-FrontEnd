import axios from "axios";

export const settlementApi = axios.create({
  baseURL: import.meta.env.VITE_SETTLEMENTS_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// إرفاق توكن الأدمن المالي تلقائياً مع الطلبات
settlementApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});