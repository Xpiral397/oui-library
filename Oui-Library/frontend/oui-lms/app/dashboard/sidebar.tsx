"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import { Image } from "@nextui-org/react";
import {
  ArrowBackIos,
  Category,
  CreditCard,
  Home,
  Payment,
  SafetyCheck,
  Verified,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar({ sm }: { sm?: boolean }) {
  const [selected, setSelect] = useState<string>("discover");
  const [toggler, setTogggler] = useState<boolean>(sm ?? true);
  const router = useRouter();
  const Navbars: {
    name: string;
    links: string;
    icon: ReactNode;
  }[] = [
    {
      name: "Discover",
      links: "/dashboard/discover",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "discover" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Home color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Category",
      links: "/dashboard/category",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "category" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Category color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Reserved Books",
      links: "/dashboard/reserves",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "reserves" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <SafetyCheck color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Lend Books",
      links: "/dashboard/lend",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "lend" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <CreditCard color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Expenditure",
      links: "/dashboard/expenses",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "expenses" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Payment color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Checks",
      links: "/dashboard/checks",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "checks" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Verified color="inherit" fontSize="small" />
        </div>
      ),
    },
  ];

  return toggler ? (
    <div className="bg-white relative w-[250px] h-full shadow-md">
      <div
        onClick={() => setTogggler(!toggler)}
        className="absolute right-0 -mx-4 flex justify-center items-center   top-0 mt-5 text-[10px] w-8 h-8 rounded-full bg-slate-50 animate-pulse "
      >
        <ArrowBackIos color="secondary" fontSize="inherit" />
      </div>

      <ul className="space-y-5 p-5 ">
        {Navbars.map((nav) => {
          return (
            <li
              onClick={() => {
                router.push(nav.links);
                setSelect(nav.links.split("/")[2]);
              }}
              className=" cursor-pointer flex items-center jsutify-center w-ful h-full font-semibold  space-x-3  hover:bg-slate-50"
            >
              <div>{nav.icon}</div>
              {selected == nav.name ? (
                <span className="text-slate-800">{nav.name}</span>
              ) : (
                <span className="text-slate-500">{nav.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div
      onClick={() => setTogggler(!toggler)}
      className="absolute left-0 mx-2 flex justify-center items-center   top-0 mt-20 text-[10px] w-8 h-8 rounded-full bg-slate-200 z-50 animate-pulse "
    >
      <ArrowBackIos color="secondary" fontSize="inherit" />
    </div>
  );
}
