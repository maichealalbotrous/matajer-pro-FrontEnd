import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PAYMENTS_API_URL,
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

api.interceptors.request.use(injectToken);

export default api;