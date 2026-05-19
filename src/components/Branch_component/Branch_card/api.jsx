import axios from 'axios';

export const branchIndexApi = axios.create({
    baseURL: import.meta.env.VITE_GET_BRANCH_API_URL ,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

branchIndexApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});