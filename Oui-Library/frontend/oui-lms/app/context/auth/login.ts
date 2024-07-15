import api from "@/app/context/api";

interface UserLoginPayload {
  matric_number?: string;
  email?: string;
  password: string;
}

export const Login = async (user: UserLoginPayload) => {
  try {
    const response = await api.post("/user/login/", user);
    if (response.status == 200) {
      return { status: 200, res: response.data };
    } else {
      return {
        res: response.data?.error || "Unable to login",
        status: 500,
      };
    }
  } catch (e) {
    // console.log(e);
    return {
      res: "Credential Not Found",
      status: 500,
    };
  }
};
export const AdminLogin = async (user: UserLoginPayload) => {
  try {
    const response = await api.post("/admin/login/", user);
    if (response.status == 200) {
      return { status: 200, res: response.data };
    } else {
      return {
        res: response.data?.error || "Unable to login",
        status: 500,
      };
    }
  } catch (e) {
    return {
      res: "Credential Not Found",
      status: 500,
    };
  }
};
