"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Suspense, useEffect } from "react";
import { loadData } from "./context/clientStorage/save";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!isLogin()) {
      router.push("/auth/signin");
      toast("This page require you to login", {
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
    } else {
      toast("Welcome back  " + loadData().auth.user.name, {
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
      router.push("/dashboard/discover");
    }
  });
  return <Suspense></Suspense>;
}
export const isLogin = (): boolean => {
  // Check if current_user.isAuthenticated exists in local storage
  return loadData().auth.isAuthenticated;
};
