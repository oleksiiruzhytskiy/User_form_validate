import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If the token is expired or unauthorized, refresh the token
        if (error.response?.status === 401) {
          try {
            const token = await refreshToken();
            error.config.headers["Authorization"] = `Bearer ${token}`;
            return axiosPrivate(error.config);
          } catch (refreshError) {
            // Handle failure to refresh token (e.g., redirect to login)
            console.error("Failed to refresh token:", refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when component unmounts or dependencies change
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refreshToken]);  // Re-run effect when auth or refreshToken changes

  return axiosPrivate;
};
