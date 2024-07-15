import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save } from "../../clientStorage/save";
import { Admin, InitialData } from "../../type";

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
        user: Admin;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      let user = action.payload.user;
      state.isAuthenticated = true;
      save<InitialData>(
        "auth",
        {
          auth: {
            ...state,
            user,
            isAuthenticated: true,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          } as AdminAuthState,
        },
        "User Login Succesfuly",
        "login"
      );
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
