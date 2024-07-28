import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import store from "./store"; // Assuming you have access to your Redux store here
import auth, { login, logout } from "./reducers/auth";
import {
  AdminAuthState,
  login as adminLogin,
  logout as adminLogut,
} from "./reducers/admin";
import { Admin, User } from "./type";
import { loadData } from "./clientStorage/save";

// export const baseURL = "https://ouilibray.pythonanywhere.com";
export const baseURL = "http://127.0.0.1:8000";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCurrentUser = (): "ADMIN" | "STUDENT" => {
  console.log(store.getState());
  return !store.getState().auth.admin ? "STUDENT" : "ADMIN";
};

// export const getCurrentUserType = () :AuthState|AdminAuthState
// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = (loadData().auth as any)?.auth?.accessToken ?? "";
    // console.log(accessToken, "drug");
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const current_user = getCurrentUser();
    const originalRequest = error.config;
    console.log(originalRequest, error);
    if (
      error.response &&
      error.response.status === 401 &&
      !(originalRequest as any)?._retry
    ) {
      originalRequest._retry = true;
      try {
        // Perform token refresh
        const response = await api.post(
          `${current_user === "ADMIN" ? "admin" : "user"}/refresh_token`,
          {
            refreshToken: store.getState().auth.refreshToken,
          }
        );
        const { accessToken } = response.data;
        if (current_user === "ADMIN" && store.getState().auth.admin) {
          store.dispatch(
            adminLogin({
              user: store.getState().auth.admin as Admin,
              accessToken,
              refreshToken: store.getState().auth.refreshToken ?? "",
            })
          );
        } else {
          store.dispatch(
            login({
              user: store.getState().auth.user as User,
              accessToken,
              refreshToken: store.getState().auth.refreshToken ?? "",
            })
          );
        }
        // Retry original request with new access token
        return api(originalRequest as InternalAxiosRequestConfig);
      } catch (refreshError) {
        // Refresh token expired, logout user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
