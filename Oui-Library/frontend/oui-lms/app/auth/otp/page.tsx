"use client";
import {
  Code,
  Image,
  Input,
  Select,
  Selection,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Books from "@/public/books.jpg";
import {
  Call,
  CastForEducationOutlined,
  DisabledByDefault,
  Email,
  Lock,
  Password,
  Person,
  Token,
} from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { resendOTP } from "@/app/context/auth/resendOTP";
import { verifyOTP } from "@/app/context/auth/verifyOTP";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Years = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() + i,
  toString()
);

export default function SiginCar() {
  const [faculty, setFaculty] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [matric, setMatric] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [has_graduate, setHasGraduate] = useState<boolean>();
  const [level, setLevel] = useState<string>("");
  const [expected, yearOfGraduation] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [re_password, setRePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [has, setHas] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [OTPdisabled, setOTPdisabled] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const router = useRouter();
  const [error, setError] = useState<any>({
    Name: "",
    Matric: "",
    Tel: "",
    Email: "",
    Password: "",
    RePassword: "",
    Faculty: "",
    Gender: "",
    Department: "",
    Expected: "",
    Level: "",
  });

  function convertToMinutesSeconds(seconds: number) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (has) {
      setError((prevError: any) => ({
        ...prevError,
        Name: !Name.length ? "Name is required" : "",
        Matric: !matric || matric.length != 6 ? "OTP Required" : "",
        Tel: !tel ? "Mobile number is required" : "",
        Email: !email ? "Email is required" : "",
        Faculty: !faculty ? "Faculty is required" : "",
        Department: !department ? "Department is required" : "",
        Gender: !gender ? "Gender is required" : "",
        Expected: !expected ? "Expected field is required" : "",
        Level: !level ? "Level is required" : "",
        Password:
          password && password.length < 5
            ? "Password must be at least 5 characters"
            : password && password.length > 5
            ? ""
            : "Password must be at least 5 characters",
        RePassword: re_password !== password ? "Passwords do not match" : "",
      }));
    }

    setDisabled(false);
    setLoading(false);
  }, [loading, disabled, OTPdisabled]);

  useEffect(() => {
    const CountDown = setInterval(() => {
      if (time !== 0) setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(CountDown);
  }, [time]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-between items-center space-x-[10%] mr-10 ">
        {/* <Image src={Books.src} className="lg:flex hidden w-[500px]" /> */}
        <div className=" min-w-[300px] md:min-w-[500px] h-full rounded-lg shadow-2xl bg-zinc-50 flex flex-col px-3 py-5 ">
          <div className="flex items-center  space-x-4">
            <Image width={100} src={Logo.src} />
            <div>
              <p className="text-slate-600 font-[800] bg-purple-100 rounded-lg py-4 px-5">
                ODUDUWA UNIVERSITY LIBRARY MANAGEMENT
                <p className="font-[400] text-sm text-zinc-900">
                  Ipetumodu P.M.B 5544, ile-ife, Osun State
                </p>
                <span className="bg-red-100 rounded-md mt-2  mb-5 px-1 py-1 text-yellow-500">
                  UNIVERSITY LIBRARY
                </span>
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <form className="w-[450px] space-y-10 mt-10">
              <div className="flex flex-col space-y-3 w-full justify-center ">
                <div>
                  <label
                    className="text-center text-red-300 font-[700] text-[14px]"
                    htmlFor="name"
                  >
                    Input OTP Here Send To Your Email Here *
                  </label>
                  <Input
                    classNames={{
                      inputWrapper:
                        "font-[700] border border-slate-300 focus:outline-none",
                    }}
                    onChange={(e) => setMatric(e.target.value)}
                    isInvalid={error.Matric != ""}
                    errorMessage={error.Matric}
                    variant="bordered"
                    color="default"
                    startContent={<Token color="warning" />}
                    type="number"
                  />
                </div>
              </div>
              <div className="  cursor-pointer flex items-center justify-between space-x-3">
                <Button
                  onClick={() => {
                    (async () => {
                      const resend_succesfully = await resendOTP();
                      if (resend_succesfully == 200) {
                        toast("OTP was sent successfully", {
                          type: "success",
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        setTime((e) => 60);
                      } else {
                        toast("Error Sending OTP ", {
                          type: "error",
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }
                      setLoading(true);
                      // setTime((e) => 60);
                    })();
                  }}
                  disabled={time !== 0}
                  isLoading={loading}
                  className=" cursor-pointer w-l/5 bg-white text-slate-500 tex-sm]"
                >
                  Resend OTP
                </Button>
                <span className="tex-[10px] text-slate-500 animate animate-pulse">
                  {convertToMinutesSeconds(time)}
                </span>
              </div>
              <div className="flex justify-between space-x-3">
                <Button
                  onClick={() => {
                    setLoading(true);
                    setHas(true);
                    setDisabled(true);
                    (async () => {
                      const code = await verifyOTP(matric);
                      if (code == 200) {
                        router.push("/auth/signin");
                        toast("Account Verification was successfull", {
                          type: "success",
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      } else {
                        toast(
                          "Account Verification Failed, OTP Verification Failed",
                          {
                            type: "error",
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      }
                    })();
                  }}
                  disabled={disabled}
                  isLoading={loading}
                  className="bg-purple-700 w-full text-white font-[700]"
                >
                  Verify
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
