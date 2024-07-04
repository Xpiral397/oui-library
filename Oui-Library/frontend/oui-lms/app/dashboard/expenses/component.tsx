"use client";
import {
  Button,
  Image,
  Input,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import { Books } from "../reserves/sidebar";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Book,
  BookOnline,
  CardGiftcard,
  Delete,
  Edit,
  List,
  Pages,
  Recommend,
  RecommendOutlined,
  RecommendRounded,
  SafetyCheck,
  Search,
} from "@mui/icons-material";

export interface Category {
  categories: string[];
  category: {
    [key: string]: Books[];
  };
}

export default function BooksRender({
  Category,
  key,
  isAdmin = false,
}: {
  isAdmin: boolean;
  Category: Books;
  key: string;
}) {
  return (
    <div
      key={key}
      className="relative transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg sm:w-[250px] w-[200px]  h-[380px] bg-slate-200 flex  items-center justify-center flex-col"
    >
      {isAdmin && (
        <div className="absolute right-2 top-0 ml-8 mt-2 space-x-3">
          <Edit fontSize="small" color="warning" />
          <Delete fontSize="small" color="warning" />
        </div>
      )}
      <div className="w-[180px] flex items-center justify-center sm:w-full">
        <Image src={Category.cover} className="h-[200px]" />
      </div>
      <div className=" w-full px-5  ">
        <h1 className="px-3 mt-2 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.title}
        </h1>
        <h1 className="mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.author}
        </h1>
      </div>
    </div>
  );
}

export function ReservedRender({
  Category,
  key,
  isAdmin = false,
}: {
  isAdmin: boolean;
  Category: Books;
  key: string;
}) {
  return (
    <div
      key={key}
      className="relative transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg sm:w-[250px] w-[200px]  h-[500px] bg-slate-200 flex  items-center justify-center flex-col"
    >
      <div className="w-[180px] flex items-center justify-center sm:w-full">
        <Image src={Category.cover} className="h-[200px]" />
      </div>
      <div className=" w-full px-5  ">
        <h1 className="px-3 mt-2 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.title}
        </h1>
        <h1 className="mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.author}
        </h1>
      </div>
      <div className=" text-amber-500  tetx-[12px] w-full px-5 text-left ">
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Outlay: </span>N 200
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Daily Cost: </span>N 100
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Accured Plan: </span>N 2000
          {/* {new Date(Date.now()).toISOString().split("T")[0]} */}
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Due Date:</span>
          {new Date(Date.now()).toISOString().split("T")[0]}
        </h1>
      </div>
      <div className="space-y-2 flex justify-center flex-col mt-3">
        <Button
          startContent={<Edit color="warning" fontSize="small" />}
          className="text-sm rounded-md text-slate-600 font-[500] "
        >
          {" "}
          Edit Reserved Book
        </Button>
        <Button
          startContent={<Delete color="warning" fontSize="small" />}
          className="text-sm rounded-md font-[500] text-slate-600"
        >
          Opted Reserved plans
        </Button>
      </div>
    </div>
  );
}

export function LendBooksRender({
  Category,
  key,
  type,
  isAdmin = false,
}: {
  isAdmin: boolean;
  Category: Books;
  type?: string;
  key: string;
}) {
  return (
    <div
      key={key}
      className="relative transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg sm:w-[250px] w-[200px]  h-[500px] bg-slate-200 flex  items-center justify-center flex-col"
    >
      <h1 className="flex w-full justify-between absolute top-0 mt-2 px-3 text-amber-500 font-semibold  ">
        <h1>Avaliable Books </h1>
        <h1>32</h1>
      </h1>
      <div className="w-[180px] flex items-center justify-center sm:w-full">
        <Image src={Category.cover} className="h-[200px]" />
      </div>
      <div className=" w-full px-5  ">
        <h1 className="px-3 mt-2 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.title}
        </h1>
        <h1 className="mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          {Category.author}
        </h1>
      </div>
      <div className=" text-amber-500  tetx-[12px] w-full px-5 text-left ">
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Outlay: </span>N 200
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Daily Cost: </span>N 100
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>Accured Plan: </span>N 2000
          {/* {new Date(Date.now()).toISOString().split("T")[0]} */}
        </h1>
        <h1 className="flex justify-between mt-1 rounded-lg  font-semibold text-ellipsis text-center w-full">
          <span>To Be Return On:</span>
          {new Date(Date.now()).toISOString().split("T")[0]}
        </h1>
      </div>
      {type === "check-out" ? (
        <div className="absolute bottom-3 space-y-2 flex justify-center flex-col mt-6 w-full px-5">
          <Button
            startContent={<Edit color="warning" fontSize="small" />}
            className="text-sm rounded-md text-slate-600 font-[500] w-full"
          >
            {" "}
            Edit Plan
          </Button>
        </div>
      ) : (
        <div className="absolute bottom-3 space-y-2 flex justify-center flex-col mt-6 w-full px-5">
          <Button
            startContent={<Edit color="warning" fontSize="small" />}
            className="text-sm rounded-md text-slate-600 font-[500] w-full"
          >
            {" "}
            Check Out
          </Button>
        </div>
      )}
    </div>
  );
}

export function Recommended({
  RecomendBooks,
  isAdmin = false,
}: {
  RecomendBooks: Books[];
  isAdmin?: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <RecommendRounded color="secondary" />
          <p className="font-[600] text-secondary-500">Recomended Books</p>
        </div>
        <span className="bg-blue-50 rounded-md">
          <p className="text-[12px] flex items-center space-x-3 text-blue-500 text-sm rounded-lg p-2">
            <h1 className="text-[12px]">See All</h1>
            <span className="flex ">
              {
                <h1 className="text-[12px]">
                  <ArrowForwardIos color="secondary" fontSize="inherit" />
                </h1>
              }
            </span>
          </p>
        </span>
      </div>{" "}
      <div className="w-full h-full items-center flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
          {RecomendBooks.map((category, index) => (
            <BooksRender
              key={category?.id ?? index}
              isAdmin
              Category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Reserved({
  RecomendBooks,
  isAdmin,
}: {
  RecomendBooks: Books[];
  isAdmin: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <SafetyCheck color="secondary" />
          <p className="font-[600] text-secondary-500">Reserved Books</p>
        </div>
        <span className="bg-blue-50 text-sm rounded-sm font-[500] text-secondary-500">
          <span>Total:</span> N 2000
        </span>
      </div>
      {/* </div> */}
      <div className="flex justify-center items-center  w-full sm:w-1/2 mt-10 mb-8">
        <Input
          className=""
          size="md"
          startContent={
            <div className="w-5 h-5 rounded-full bgslate-200">
              <Search fontSize="small" color="secondary" />
            </div>
          }
        />
        {/* </div> */}
      </div>

      <div className="w-full h-full items-center flex justify-center text-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
          {RecomendBooks.map((category, index) => (
            <ReservedRender
              key={category?.id ?? index}
              isAdmin
              Category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LendBooks({
  RecomendBooks,
  type,
  isAdmin,
}: {
  RecomendBooks: Books[];
  type?: string;
  isAdmin: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <CardGiftcard color="secondary" />
          <p className="font-[600] text-secondary-500">Lent Books</p>
        </div>
        <span className="bg-blue-50 text-sm rounded-sm font-[500] text-secondary-500">
          <span>Total:</span> N 2000
        </span>
      </div>
      {/* </div> */}
      <div className="flex justify-center items-center  w-full sm:w-1/2 mt-10 mb-8">
        <Input
          className=""
          size="md"
          startContent={
            <div className="w-5 h-5 rounded-full bgslate-200">
              <Search fontSize="small" color="secondary" />
            </div>
          }
        />
        {/* </div> */}
      </div>
      <h1 className="mt-10 mb-10 text-2xl font-semibold text-secondary-500 text-center ">
        {type !== "check-out" ? "User Lent Books" : "User Check In Books"}
      </h1>
      <div className="w-full h-full items-center flex justify-center text-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
          {RecomendBooks.map((category, index) => (
            <LendBooksRender
              type={type}
              key={category?.id ?? index}
              isAdmin
              Category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryRender({
  RecomendBooks,
  isAdmin,
}: {
  RecomendBooks: Category;
  isAdmin: boolean;
}) {
  return (
    <div className="bg-slate-50 border-slate-200 border rounded-lg shadow-lg  p-3 flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <p className="flex space-x-2">
          <Recommend color="secondary" />
          <p>Books Category</p>
        </p>
        <span className="bg-blue-50 rounded-sm">
          <List color="secondary" />
        </span>
      </div>
      <div className="flex justify-center items-center  w-full sm:w-1/2 mt-10 mb-8">
        <Input
          className=""
          size="md"
          startContent={
            <div className="w-5 h-5 rounded-full bgslate-200">
              <Search fontSize="small" color="secondary" />
            </div>
          }
        />
      </div>

      <ScrollShadow>
        {" "}
        <Tabs radius="md" aria-label="Tabs radius">
          {RecomendBooks.categories.map((cateogry) => (
            <Tab key={cateogry} title={cateogry}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-10 ">
                {RecomendBooks.category[cateogry].map((category, index) => (
                  <BooksRender
                    isAdmin={isAdmin}
                    key={category?.id ?? index}
                    Category={category}
                  />
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </ScrollShadow>
    </div>
  );
}
