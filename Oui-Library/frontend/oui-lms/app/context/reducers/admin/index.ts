import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save } from "../../clientStorage/save";
import { Admin } from "../../type";

// Define the initial state interface
export interface AdminAuthState {
  admin: Admin;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

// Define the initial state
const initialState: AdminAuthState = {
  admin: {
    email: null,
    name: null,
    full_name: null,
    gender: null,
    number: null,
  },
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        admin: Admin;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      save<any>("auth", state, "User Login Successfuly", "login");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// Export the generated actions and the reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
