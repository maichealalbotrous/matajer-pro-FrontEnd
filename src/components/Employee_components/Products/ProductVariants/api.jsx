import axios from 'axios';

export const invoiceApi = axios.create({
  baseURL:import.meta.env.VITE_INVOICESEMP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const injectToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

invoiceApi.interceptors.request.use(injectToken);