// import axios from 'axios';

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Matches your backend port
// });

// // This "Interceptor" automatically grabs the token from storage
// // and attaches it to the headers before the request is sent.
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Matches backend "protect" middleware
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// ✅ Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ GLOBAL OFFLINE CACHE (only for GET requests)
api.interceptors.response.use(
  (response) => {
    // Cache GET responses
    if (response.config.method === "get") {
      const key = `cache:${response.config.url}`;
      localStorage.setItem(key, JSON.stringify(response.data));
    }
    return response;
  },
  (error) => {
    const config = error.config;

    // If GET fails (offline), return cached data instead of error
    if (config && config.method === "get") {
      const key = `cache:${config.url}`;
      const cached = localStorage.getItem(key);

      if (cached) {
        return Promise.resolve({
          data: JSON.parse(cached),
          status: 200,
          statusText: "OK (cached)",
          headers: {},
          config,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
