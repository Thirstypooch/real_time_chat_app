import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,// Use Vite's env variable
    headers: {
        'Accept': 'application/json',
    },
});


apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('api_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;