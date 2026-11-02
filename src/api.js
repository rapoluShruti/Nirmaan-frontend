import axios from "axios";

const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").trim().replace(/\/+$/, "");
const baseURL = backendUrl ? `${backendUrl}/api` : "/api";

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// Attach the current session token to protected API requests.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cache only successful GET responses. Never turn an authentication/API failure
// into a successful cached response.
api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get" && typeof window !== "undefined") {
      try {
        const key = `cache:${response.config.baseURL || ""}${response.config.url || ""}`;
        localStorage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        console.warn("Unable to cache API response:", error);
      }
    }
    return response;
  },
  (error) => {
    const config = error.config;
    if (config?.method === "get" && !error.response && typeof window !== "undefined") {
      try {
        const key = `cache:${config.baseURL || ""}${config.url || ""}`;
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
      } catch (cacheError) {
        console.warn("Unable to read cached API response:", cacheError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
