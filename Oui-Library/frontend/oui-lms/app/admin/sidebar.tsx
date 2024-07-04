"use client";
import React, { ReactNode, useState } from "react";
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
import { loadBindings } from "next/dist/build/swc";
import { loadData } from "../context/clientStorage/save";

export default function Sidebar() {
  const [selected, setSelect] = useState<string>("Discover");
  const [toggler, setTogggler] = useState<boolean>(true);
  const [togglerBigevice, setToggglerBigDevice] = useState<boolean>(true);
  const router = useRouter();
  const Navbars: {
    name: string;
    links: string;
    icon: ReactNode;
  }[] = [
    {
      name: "Books",
      links: "/admin/books",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Discover" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Home color="inherit" fontSize="small" />
        </div>
      ),
    },
    // {
    //   name: "Payments",
    //   links: "/category",
    //   icon: (
    //     <div
    //       className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
    //         selected === "Category" ? "bg-secondary-500" : "bg-slate-300"
    //       }`}
    //     >
    //       <Category color="inherit" fontSize="small" />
    //     </div>
    //   ),
    // },
    {
      name: "Reserved Books",
      links: "/admin/reserved",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Reserved Books" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <SafetyCheck color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Lend Books",
      links: "/admin/lend",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Lend Books" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <CreditCard color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Due Books",
      links: "/admin/due",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Subscriptions" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Payment color="inherit" fontSize="small" />
        </div>
      ),
    },
    {
      name: "Checks",
      links: "/admin/checks",
      icon: (
        <div
          className={`flex items-center w-ful h-full justify-center rounded-md py-1 px-1 text-white ${
            selected === "Checks" ? "bg-secondary-500" : "bg-slate-300"
          }`}
        >
          <Verified color="inherit" fontSize="small" />
        </div>
      ),
    },
  ];
  return (
    <div className=" w-full h-full">
      {toggler ? (
        <div className="block w-[300px] h-full md:hidden relative shadow-2xl bg-white ">
          <div
            onClick={() => setTogggler(!toggler)}
            className="z-[100] absolute right-0 -mx-4 flex justify-center items-center   top-0 mt-5 text-[10px] w-8 h-8 rounded-full bg-slate-50 animate-pulse "
          >
            <ArrowBackIos color="secondary" fontSize="inherit" />
          </div>

          <ul className="space-y-5 p-5 ">
            {Navbars.map((nav) => {
              return (
                <li
                  onClick={() => {
                    router.push(nav.links);
                  }}
                  className="flex items-center jsutify-center w-ful h-full font-semibold  space-x-3  hover:bg-slate-50"
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
      )}

      <div className="hidden w-[200px] h-full md:block">
        {togglerBigevice ? (
          <div className="relative w-[200px]  h-full shadow-2xl">
            <div
              onClick={() => setToggglerBigDevice(!togglerBigevice)}
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
                    }}
                    className="flex items-center jsutify-center w-ful h-full font-semibold  space-x-3  hover:bg-slate-50"
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
            onClick={() => setToggglerBigDevice(!togglerBigevice)}
            className="z-50 absolute right-0 mx-2 flex justify-center items-center   top-0 mt-20 text-[10px] w-8 h-8 rounded-full bg-slate-200  animate-pulse "
          >
            <ArrowBackIos color="secondary" fontSize="inherit" />
          </div>
        )}
      </div>
    </div>
  );
}
