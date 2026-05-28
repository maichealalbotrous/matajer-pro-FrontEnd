import axios from 'axios';

const discountApi = axios.create({
  baseURL: import.meta.env.VITE_DISCOUNTS_API_URL, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

discountApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default discountApi;