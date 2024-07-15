"use client";
import Link from "next/link";
import {
  Category,
  CategoryRender,
  Recommended,
} from "@/app/dashboard/discover/component";
import { Add, Cancel, Search } from "@mui/icons-material";
import { Input } from "@nextui-org/input";
import Book from "@/public/books.jpg";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import AdminRightSideSidebar, { AdminBooks } from "./adminSidebar";
import { Button } from "@nextui-org/button";
import { Books } from "@/app/context/type";
import UseBooksProvider from "@/app/context/useSelectBooks/useSelectContext";
import { useCategory } from "@/app/context/useSelectBooks/useCategory";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
import Sidebar from "@/app/dashboard/discover/sidebar";

export default function AdminPage() {
  const [show, setshow] = useState<boolean>(true);
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  const { category } = useContext(useCategory);
  return (
    <div className="relative w-full bg-white rounded-lg sm:p-12 md:p-1  z-0">
      <div className="lg:shadow-2xl sm:px-5">
        <h1 className="text-3xl text-secondary-900  font-semibold text-center mt-10 ">
          Admin Dashabord
        </h1>
        <div className="w-full h-full relative rounded-lg md:mt-40 mt-20 xl:mt-20 border-t-[200px] md:border-t-[100px] border-amber-500 ">
          <div className="w-full md:flex-row flex-col lg:space-y-0 md:space-y-3  space-y-8 flex items-center  sm:px-0 px-1 justify-around  -mt-40   lg:-mt-20 md:-mt-48 z-10 absolute top-0 right-0">
            <Input
              className="w-[300px]"
              size="sm"
              startContent={
                <div className="w-5 h-5 rounded-full bgslate-200">
                  <Search fontSize="small" color="secondary" />
                </div>
              }
              endContent={
                <Button
                  size="sm"
                  className="h-full bg-amber-500 rounded-lg py-5  -mx-2 px-3 w-full text-white font-semibold text-[13px]"
                >
                  Search Books
                </Button>
              }
            />
            {/* <div content="Add New Book"> */}
            <div className=" flex justify-between space-x-7 text-[12px]  text-secondary-700 bg-slate-50 rounded-lg py-3 px-3 ">
              <Link href={"/admin/dashboard/books/addBook"}>
                <div
                  about=""
                  className="flex flex-col justify-center whitespace-nowrap  h-full  w-full  items-center "
                >
                  <div>
                    <Add color="secondary" />
                  </div>
                  <h1>Add New Book</h1>
                </div>
              </Link>
              {/* <div
                about=""
                className="flex flex-col justify-center whitespace-nowrap  h-full  w-full  items-center "
              >
                <div>
                  <Add color="secondary" />
                </div>
                <h1>Edit book</h1>
              </div>
              <div
                about=""
                className="flex flex-col justify-center whitespace-nowrap  h-full  w-full  items-center "
              >
                <div>
                  <Add color="secondary" />
                </div>
                <h1>Edit book</h1>
              </div>
              <div
                about=""
                className="flex flex-col justify-center whitespace-nowrap  h-full  w-full  items-center "
              >
                <div>
                  <Add color="secondary" />
                </div>
                <h1>New Category</h1>
              </div> */}
            </div>
          </div>
          <Recommended
            isAdmin={true}
            RecomendBooks={
              Object.values(category?.category["Science"] ?? {}) as Books[]
            }
          />
          <CategoryRender isAdmin={true} RecomendBooks={category} />
        </div>
      </div>
    </div>
  );
}
