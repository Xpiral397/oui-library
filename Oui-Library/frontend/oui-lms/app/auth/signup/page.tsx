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
import { Department } from "./config";
import { Step } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Yaldevi } from "next/font/google";
import { error } from "console";
import { signup } from "@/app/context/auth/signup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signupData } from "@/app/context/reducers/auth";
import { useDispatch } from "react-redux";

const Years = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() + i,
  toString()
);

export default function SiginCar() {
  const router = useRouter();
  const dispatch = useDispatch();
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
  const [signning, setSignning] = useState<boolean>(false);
  const [_username, setUsername] = useState<string>("");
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
    username: "",
  });

  useEffect(() => {
    if (has) {
      setError((prevError: any) => ({
        ...prevError,
        Name: !Name.length ? "Name is required" : "",
        Matric: !matric ? "Matric is required" : "",
        Tel: !tel ? "Mobile number is required" : "",
        Email: !email ? "Email is required" : "",
        Faculty: !faculty ? "Faculty is required" : "",
        Department: !department ? "Department is required" : "",
        Gender: !gender ? "Gender is required" : "",
        Expected: !expected ? "Expected field is required" : "",
        Level: !level ? "Level is required" : "",
        _username: !_username ? "username is required" : "",
        Password:
          password && password.length < 5
            ? "Password must be at least 5 characters"
            : password && password.length > 5
            ? ""
            : "Password must be at least 5 characters",
        RePassword: re_password !== password ? "Passwords do not match" : "",
      }));
    }
    setDisabled((e) => Object.values(error).every((e) => e == ""));
    // setLoading(false);
  }, [
    Name,
    loading,
    disabled,
    matric,
    tel,
    email,
    faculty,
    department,
    gender,
    expected,
    level,
    _username,
    password,
    re_password,
  ]);
  const signupUser = async () => {
    // console.log(Object.values(error).every((e) => e?.length == 0));
    if (!Object.values(error).every((e) => (e as any)?.length == 0))
      toast("Credential were not well filled!", {
        position: "top-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    else {
      setLoading(true);
      const signupUser = await signup({
        name: _username,
        full_name: Name,
        matric_number: matric,
        email,
        password,
        department,
        gender,
        expected_year_of_graduation: expected,
        number: tel,
        level,
        faculty,
      });

      console.log(loading, disabled);
      if (signupUser.status == 200) {
        try {
          dispatch(signupData({ matric_number: matric }));
        } catch (e) {
          console.log("error");
        }
        toast(
          "Registration Completed!, 🦄 Wow so easy!, Verify OTP sent to your gmail",
          {
            type: "success",
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
        router.push("/auth/otp");
      } else {
        toast("Registration Failed!", {
          position: "top-right",
          type: "error",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toast(signupUser.error, {
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-full rounded-lg">
      {/* <Image src={Books.src} className="lg:flex hidden w-[500px]" /> */}
      <div className=" h-full  sm:shadow-2xl bg-zinc-50 flex flex-col  px-3 py-5 ">
        <div className="flex items-center  space-x-4">
          <Image width={100} src={Logo.src} />
          <div>
            <p className="font-[800] bg-purple-100 rounded-lg py-4 px-5">
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
          <form className="w-[300px] lg:w-[450px] space-y-10 mt-10">
            <div className="flex flex-col space-y-3 w-full justify-center ">
              <div className="flex justify-between space-x-1">
                <div>
                  <label
                    className="text-red-300 font-[700] text-[14px]"
                    htmlFor="name"
                  >
                    Username *
                  </label>
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={error._username != ""}
                    errorMessage={error._username}
                    variant="bordered"
                    classNames={{
                      inputWrapper:
                        "border border-slate-300 focus:outline-none",
                      mainWrapper:
                        "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                    }}
                    startContent={<Person color="warning" />}
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="text-red-300 font-[700] text-[14px]"
                    htmlFor="name"
                  >
                    Name *
                  </label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={error.Name != ""}
                    errorMessage={error.Name}
                    variant="bordered"
                    className=""
                    classNames={{
                      inputWrapper:
                        "border border-slate-300 focus:outline-none",
                      mainWrapper:
                        "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                    }}
                    startContent={<Person color="warning" />}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-red-300 font-[700] text-[14px]"
                  htmlFor="name"
                >
                  Matric No *
                </label>
                <Input
                  autoCapitalize="characters"
                  onChange={(e) => setMatric(e.target.value)}
                  isInvalid={error.Matric != ""}
                  errorMessage={error.Matric}
                  classNames={{ inputWrapper: "font-[700]" }}
                  variant="bordered"
                  color="default"
                  startContent={<Token color="warning" />}
                  type="text"
                />
              </div>
              <div>
                <label
                  className="text-red-300 font-[700] text-[14px]"
                  htmlFor="name"
                >
                  Tel *
                </label>
                <Input
                  classNames={{
                    inputWrapper: "border border-slate-300 focus:outline-none",
                  }}
                  onChange={(e) => setTel(e.target.value)}
                  errorMessage={error.Tel}
                  isInvalid={error.Tel != ""}
                  variant="bordered"
                  startContent={<Call color="warning" />}
                  type="tel"
                />
              </div>
              <div>
                <label
                  className="text-red-300 font-[700] text-[14px]"
                  htmlFor="name"
                >
                  Email
                </label>
                <Input
                  classNames={{
                    inputWrapper: "border border-slate-300 focus:outline-none",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="bordered"
                  startContent={<Email color="warning" />}
                  type="name"
                  errorMessage={error.Email}
                  isInvalid={error.Email != ""}
                />
              </div>
              {/* <div>
                  <label
                    className="text-red-300 font-[700] text-[14px]"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    variant="bordered"
                     startContent={<Person su />}
                    type="name"
                  />
                </div> */}

              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Select
                  variant="bordered"
                  onChange={(e) => setFaculty(e.target.value)}
                  label="Select A Faculty"
                  className="max-w-xs"
                  isRequired
                  errorMessage={error.Faculty}
                  isInvalid={error.Faculty != ""}
                >
                  {Object.keys(Department).map((_faculty) => (
                    <SelectItem key={_faculty} value={_faculty}>
                      {_faculty}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  variant="bordered"
                  onChange={(e) => setDepartment(e.target.value)}
                  isRequired
                  disabled={faculty?.toString().length === 0}
                  label="Department"
                  placeholder="Select Your Department"
                  className="max-w-xs"
                  errorMessage={error.Departments}
                  isInvalid={error.Department != ""}
                >
                  {faculty ? (
                    Object.values(
                      Department[faculty?.toString() as keyof typeof Department]
                    ).map((_departemnt) => (
                      <SelectItem key={_departemnt} value={_departemnt}>
                        {_departemnt}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key={""} value={""}>
                      Select A Faculty First
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="flex space-x-2 w-full ">
                <Select
                  variant="bordered"
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                  className="max-w-xs"
                  isRequired
                  errorMessage={error.Gender}
                  isInvalid={error.Gender != ""}
                >
                  {["Male", "Female"].map((_gender) => (
                    <SelectItem key={_gender} value={_gender}>
                      {_gender}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  variant="bordered"
                  startContent={<Step />}
                  onChange={(e) => setLevel(e.target.value)}
                  // placeholder="Level *"
                  label="Level "
                  className="max-w-xs"
                  errorMessage={error.Level}
                  isInvalid={error.Level != ""}
                  isRequired
                >
                  {["100", "200", "300", "400", "500", "600", "700"].map(
                    (_gender) => (
                      <SelectItem key={_gender} value={_gender}>
                        {_gender}
                      </SelectItem>
                    )
                  )}
                </Select>
                <Select
                  variant="bordered"
                  onChange={(e) => yearOfGraduation(e.target.value)}
                  placeholder=""
                  label="Graduation Year"
                  className="max-w-xs"
                  isRequired
                  errorMessage={error.Expected}
                  isInvalid={error.Expected != ""}
                >
                  {["2024", "2025", "2026", "2027", "2028", "2029", "2030"].map(
                    (_gender) => (
                      <SelectItem key={_gender} value={_gender}>
                        {_gender}
                      </SelectItem>
                    )
                  )}
                </Select>
              </div>

              <div>
                <label
                  className="text-red-300 font-[700] text-[14px]"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  classNames={{
                    inputWrapper: "border border-slate-300 focus:outline-none",
                  }}
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                  errorMessage={error.Password}
                  isInvalid={error.Password != ""}
                  startContent={<Lock color="warning" />}
                  type="password"
                />
              </div>
              <div>
                <label
                  className="text-red-300 font-[700] text-[14px]"
                  htmlFor="password"
                >
                  Retype Your Password
                </label>
                <Input
                  classNames={{
                    inputWrapper: "border border-slate-300 focus:outline-none",
                  }}
                  autoComplete="password"
                  onChange={(e) => setRePassword(e.target.value)}
                  variant="bordered"
                  errorMessage={error.RePassword}
                  isInvalid={error.RePassword != ""}
                  type="password"
                  startContent={<Lock color="warning" />}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                setLoading(true);
                setHas(true);
                setDisabled((e) => true);
                signupUser();
                console.log(Object.values(error));
              }}
              variant="bordered"
              // disabled={disabled}
              isLoading={loading}
              className="bg-purple-700 w-full text-white font-[700]"
            >
              Sign Up
            </Button>
            <div className="text-center text-purple-500 font-[500]">
              <h1 className="mt-10 space-x-2 bg-purpe-400">
                Already have account?{" "}
                <span>
                  <a href="/auth/signin">Login</a>
                </span>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
