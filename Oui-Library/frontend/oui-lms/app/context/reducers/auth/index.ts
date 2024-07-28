import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save } from "../../clientStorage/save";
import { Admin, AuthData, InitialData, User } from "../../type";

// Define the initial state interface
export interface AuthState {
  meta: {
    matric_number: string;
  };
  user: User | null;
  admin: Admin | null;
  verified: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

// export interface User {
//   verified: boolean;
//   isAdmin: boolean | null;
//   username: string | null;
//   matric: string | null;
//   email: string | null;
//   department: string | null;
//   level: string | null;
//   faculty: string | null;
//   name: string | null;
//   id: string | null;
//   mobile: string | null;
// }
// Define the initial state
const initialState: AuthState = {
  user: {
    isAdmin: false,
    level: "",
    id: "",
    username: "",
    name: "",
    email: "",
    department: "",
    faculty: "",
    gender: "",
    number: "",
    expected_year_of_graduation: "",
    password: "",
    matric_number: "",
    full_name: "",
    otp: 0,
    has_confirm_otp: false,
    otp_expiration_time: 0,
    is_staff: false,
    is_active: false,
  },
  admin: null,
  meta: {
    matric_number: "",
  },
  verified: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verify(state, action: PayloadAction<{ verified: boolean }>) {
      state.verified = action.payload.verified;
    },
    signupData(state, action: PayloadAction<{ matric_number: string }>) {
      if (state.meta) {
        state.meta.matric_number = action.payload.matric_number;
        save<InitialData>(
          "auth",
          { auth: state } as InitialData,
          "OTP sent successfuly"
        );
      }
    },
    login(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      let user = action.payload.user;
      // state.isAuthenticated = true;
      save<InitialData>(
        "auth",
        {
          auth: {
            ...state,
            user,
            isAuthenticated: true,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          } as AuthData,
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
export const { login, logout, signupData } = authSlice.actions;
export default authSlice.reducer;
