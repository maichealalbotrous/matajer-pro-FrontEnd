import axios from 'axios';

export const productApi = axios.create({
    baseURL: import.meta.env.VITE_PRODUCTS_API_URL, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

productApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});