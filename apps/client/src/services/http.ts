import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { logOut } from "../utils";
import { CONTENT_TYPE_JSON } from "~/constant";
import { refreshAccessToken } from "./auth";
import {
  getUserFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
  addUserToLocalStorage,
} from "./localStorage";

/**
 * Axios config.
 */
export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
    Accept: CONTENT_TYPE_JSON,
  },
};

/**
 * Axios instance for http.
 */
const http = axios.create({
  ...axiosConfig,
});

/**
 * Request interceptor.
 */
http.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const accessToken = getAccessTokenFromLocalStorage();

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * Response interceptor.
 */
http.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const { id } = getUserFromLocalStorage();
      const refreshToken = getRefreshTokenFromLocalStorage() || "";

      try {
        const response = await refreshAccessToken({
          id,
          refreshToken,
        });

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { data } = response?.data;
        addUserToLocalStorage(data?.token, data?.user);

        return http(originalRequest);
      } catch (error) {
        logOut();

        return;
      }
    }

    return Promise.reject(error);
  }
);

export { http };
