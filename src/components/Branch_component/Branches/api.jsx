import axios from 'axios';

export const StoreBranchApi = axios.create({
    baseURL: import.meta.env.VITE_STORE_BRANCH_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
});

StoreBranchApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});