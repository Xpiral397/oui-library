import { AdminAuthState } from "./reducers/admin";

export interface Books {
  id: string;
  // cover: string;
  image: string;
  cover: string;
  author: string;
  likes: string;
  unlike: string;
  total_pages: string;
  title: string;
  name: string;
  rate: string;
  rated: string;
  pages: string;
  rating: string;
  reviews: string;
  lent: number;
  quantity: number;
  reserved: number;
  description: string;
}

export interface User {
  isAdmin: boolean;
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  department: string | null;
  faculty: string | null;
  gender: string | null;
  level: string | null;
  number: string | null;
  expected_year_of_graduation: string | null;
  password: string | null;
  matric_number: string | null;
  full_name: string | null;
  otp: number;
  has_confirm_otp: boolean;
  otp_expiration_time: number;
  is_staff: boolean;
  is_active: boolean;
}

export interface AuthMeta {
  matric_number: string | null;
}
export interface Admin {
  email: string | null;
  name: string | null;
  full_name: string | null;
  gender: string | null;
  number: string | null;
}

export interface AuthData {
  user: User;
  meta: AuthMeta;
  verified?: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface InitialData {
  auth: AuthData | AdminAuthState;
}

export interface AdminInitialData {
  admin: Admin;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IntialAdminData {
  auth: AdminInitialData;
}

const initialData: InitialData = {
  auth: {
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
    meta: {
      matric_number: "",
    },
    verified: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  },
};
