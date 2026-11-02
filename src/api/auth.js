import api from "../api";

// Both login and registration use the same configured API client.
// VITE_BACKEND_URL must contain the backend origin, for example:
// https://your-backend.onrender.com (without a trailing /api).
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
