import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// ✅ Request interceptor (token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Response interceptor (CACHE GET responses)
api.interceptors.response.use(
  (response) => {
    // Cache only GET requests
    if (response.config.method === "get") {
      const key = `cache:${response.config.url}`;
      localStorage.setItem(key, JSON.stringify(response.data));
    }
    return response;
  },
  (error) => {
    // If request fails (offline), return cached GET data
    const config = error.config;

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
