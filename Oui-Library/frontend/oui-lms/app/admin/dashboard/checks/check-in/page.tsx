"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/dashboard/discover/sidebar";

import { useRouter } from "next/navigation";
import Book from "@/public/books.jpg";
import { Category, CategoryRender, DuePlans } from "../component/component";
import { ScrollShadow } from "@nextui-org/react";
import { Books, InitialData } from "@/app/context/type";
import { loadData } from "@/app/context/clientStorage/save";
import { Cancel, Person } from "@mui/icons-material";
import { Input } from "@nextui-org/input";
export type Loading = "Loading";
export type Unauthenticated = "unathenticated";
export default function Page() {
  const [show, setshow] = useState<boolean>(false);
  const [store, setStore] = useState<InitialData | Loading | Unauthenticated>(
    "Loading"
  );
  const router = useRouter();
  useEffect(() => {
    const store = loadData();
    if (!store.auth.isAuthenticated) {
      router.push("/auth/signin");
    } else {
      setStore(store);
    }
  }, []);
  const [selectedBooks, setSelectedBooks] = useState<Books>({} as Books);
  const [matricNumber, setStudentMatricNumber] = useState<string | null>(null);

  return (
    <div className=" flex lg:flex-row flex-col bg-slate-50 w-full h-full ">
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="w-full h-screen"
      >
        <div className="w-full h-full">
          <h1 className="text-secondary-500 text-3xl font-semibold  text-center  mb-20">
            Books Checks-in Selection
          </h1>
          <div className="w-max-lg flex justify-end  mt-20 px-4 ">
            <div>
              <Input
                startContent={<Person fontSize="small" color="secondary" />}
                onChange={(e) => setStudentMatricNumber(e.target.value)}
                placeholder={"Student Matric Number"}
              />
            </div>
          </div>
        </div>
      </ScrollShadow>

      {selectedBooks && show && (
        <div className="absolute right-0 top-0 bg-white shadow-2xl flex py-5 px-5 justify-center w-[400px] h-full  ">
          <div onClick={() => setshow(!show)}>
            <Cancel
              className=" mb-10 absolute top-0 mt-2 right-1 left-0 py-1 animate-pulse text-[25px]"
              fontSize="small"
              color="secondary"
            />
            <Sidebar Book={selectedBooks} />
          </div>
        </div>
      )}
    </div>
  );
}
