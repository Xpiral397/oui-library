import { LOGIN, LOGOUT } from "../../types/auth";

export const login = (accessToken: string, refreshToken: string) => ({
  type: LOGIN,
  payload: { accessToken, refreshToken },
});

export const logout = () => ({
  type: LOGOUT,
});
