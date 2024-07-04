import api from "@/app/context/api";
import { login, signupData } from "../reducers/auth";
import store from "../store";
interface UserLoginPayload {
  surname: string;
  othername: string;
  username: string;
  email: string;
  password: string;
  department: string;
  faculty: string;
  level: string;
  expctedYearOfGraduation: string;
}

export const verifyOTP = async (otp: string) => {
  try {
    const response = await api.post("/user/verify-otp/", {
      matric_number: store.getState().auth.meta.matric_number,
      otp,
    });
    if (response.status == 200) {
      return 200;
    } else {
      return 500;
    }
  } catch (e) {
    return 500;
  }
};
