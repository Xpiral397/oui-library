// main.ts

import { AdminAuthState } from "./reducers/admin";
import { AuthData, InitialData } from "./type";

// Type guard to check if payload.auth is AdminAuthState
function isAdminAuthState(
  auth: AdminAuthState | AuthData
): auth is AdminAuthState {
  return (auth as AdminAuthState).admin !== undefined;
}

export function getField<
  T extends InitialData | null,
  K extends keyof (AdminAuthState["admin"] & AuthData["user"])
>(
  payload: T,
  is_admin: boolean,
  field: K
):
  | (AdminAuthState["admin"] & AuthData["user"])[K]
  | null
  | string
  | number
  | boolean {
  if (!payload) {
    return "loading";
  }
  if (is_admin && isAdminAuthState(payload.auth)) {
    return payload.auth.admin[field as keyof AdminAuthState["admin"]];
  } else if (!is_admin) {
    // console.table(payload.auth as any);
    return (payload.auth as any as AuthData)?.user[field];
  } else {
    throw new Error(
      "Invalid auth state:" +
        JSON.stringify(payload) +
        "." +
        is_admin +
        isAdminAuthState(payload.auth)
    );
  }
}

// Example usage:
const adminPayload: InitialData = {
  auth: {
    admin: {
      email: "admin@example.com",
      name: "Admin User",
      full_name: "Admin Full Name",
      gender: "Male",
      number: "123456789",
    },
    isAuthenticated: true,
    accessToken: "adminToken",
    refreshToken: "adminRefreshToken",
  },
};
