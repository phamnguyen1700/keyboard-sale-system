import { HTTP_CONTENT_TYPE } from "@/constants/httpUtil";
import { useAuthStore } from "@/zustand/store/userAuth";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": HTTP_CONTENT_TYPE,
  },
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token, refreshToken } = useAuthStore.getState();
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/Auth/refresh-token`,
          {
            token,
            refreshToken,
          }
        );
        const newToken = res.data.token;
        useAuthStore.getState().setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
