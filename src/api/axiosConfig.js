import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Matches your backend port
});

// This "Interceptor" automatically grabs the token from storage
// and attaches it to the headers before the request is sent.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Matches backend "protect" middleware
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;