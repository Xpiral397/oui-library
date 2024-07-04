import api from "@/app/context/api";
import { login, signupData } from "../reducers/auth";
interface UserLoginPayload {
  full_name: string;
  name: string;
  email: string;
  matric_number: string;
  password: string;
  department: string;
  faculty: string;
  number: string;
  gender: string;
  level: string;
  expected_year_of_graduation: string;
}

export const signup = async (user: UserLoginPayload) => {
  try {
    const response = await api.post("/user/register/", user);
    console.log(response);
    if (response.status == 200) {
      signupData(response.data?.matric_number);
      return { status: 200 };
    } else {
      return {
        status: response.status,
        error: response.data?.error || "Unable to login",
      };
    }
  } catch (e: any) {
    console.log(e);
    return {
      status: 500,
      error: e.response?.data?.error ?? "Unable to reach the server",
    };
  }
};
