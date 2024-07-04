"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Logo from "@/public/logo.png";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { InitialData } from "@/app/context/type";
import {
  initialData,
  loadData,
  logoutDataItem,
} from "@/app/context/clientStorage/save";
import { Person } from "@mui/icons-material";
import { getCurrentUser } from "@/app/context/api";
import { AdminAuthState, logout } from "@/app/context/reducers/admin";
import { set } from "date-fns";
import { getField } from "@/app/context/serilaizers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// main.ts

export const Navbar = () => {
  const [type, setType] = useState<"ADMIN" | "STUDENT" | null>(null);
  const [userData, setUserData] = useState<InitialData | null>(null);
  const router = useRouter();

  const is_admin = (): boolean => {
    return type === "ADMIN";
  };

  useEffect(() => {
    if (userData && !userData?.auth?.isAuthenticated) {
      router.push("/auth/signin");
    }
    setUserData(loadData().auth as any as InitialData);
    setType(getCurrentUser());
  }, [userData?.auth?.accessToken]);

  const logout = () => {
    toast.success("You Logged out successfully ");
    logoutDataItem();
    setUserData(loadData());
  };

  return (
    <NextUINavbar maxWidth="full" position="sticky" className="shadow-md">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-5" href="/">
            <div className="">
              <Image src={Logo.src} />
            </div>
            <p className="font-bold text-xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-teal-50 bg-clip-text text-transparent">
              OUI LMS
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2"></ul>
      </NavbarContent>

      <NavbarContent className="hidden w-full sm:flex" justify="end">
        <NavbarItem className="flex w-full justify-end">
          <Dropdown backdrop="opaque">
            {(userData?.auth?.accessToken && (
              <DropdownTrigger>
                {(() => {
                  const name = getField(userData, is_admin(), "name");
                  const department = getField(
                    userData,
                    is_admin(),
                    "department"
                  );
                  return (
                    <User
                      name={name}
                      description={department}
                      avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                      }}
                    />
                  );
                })()}
              </DropdownTrigger>
            )) || <></>}
            <DropdownMenu
              className="w-max-xl"
              variant="faded"
              aria-label="User Actions"
            >
              <DropdownItem key="user-info">
                <div className="flex flex-col items-center space-x-2">
                  <div className="flex justify-between w-full mt-3 mb-3">
                    <Person color="secondary" />
                    <span className="text-secondary-500 font-semibold">
                      Profile
                    </span>
                  </div>
                  <Divider />
                  <div className="space-y-3 p-1 w-[300px]">
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Email:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "email") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Name:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "name") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Department:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "department") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Faculty:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "faculty") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Gender:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "gender") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Number:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "number") || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">
                        Expected Year of Graduation:
                      </span>
                      <span className="font-semibold text-sm">
                        {getField(
                          userData,
                          is_admin(),
                          "expected_year_of_graduation"
                        ) || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">Matric Number:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "matric_number") ||
                          "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between w-full text-secondary-500">
                      <span className="font-semibold">User Type:</span>
                      <span className="font-semibold text-sm">
                        {getField(userData, is_admin(), "is_staff")
                          ? "Staff"
                          : "Student"}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={logout}
                  className="mt-2 w-full bg-red-500 text-slate-50 text-center font-semibold"
                >
                  Logout
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className="flex justify-end">
          <Button
            onClick={
              userData && userData?.auth?.accessToken
                ? logout
                : () => {
                    router.push("/auth/login");
                  }
            }
            className="bg-gradient-to-tr from-secondary-500 to-amber-500 text-slate-50 font-semibold"
          >
            {userData && userData?.auth?.accessToken ? "Logout" : "Login"}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex"></NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {(() => {
          const name = getField(userData, is_admin(), "name");
          const department = getField(userData, is_admin(), "department");
          if (name) {
            return (
              <User
                name={name}
                description={department}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            );
          } else {
            return <></>;
          }
        })()}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2"></div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
