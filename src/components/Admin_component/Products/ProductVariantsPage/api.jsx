import axios from 'axios';

export const variantApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_VARIANTS_API_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

variantApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});