"use client";
import {
  Button,
  Divider,
  Image,
  Input,
  ScrollShadow,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
// import { Books } from "../../../../dashboard/reserves/sidebar";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Book,
  BookOnline,
  BookRounded,
  Delete,
  Edit,
  LanOutlined,
  List,
  MoneyOff,
  Pages,
  Paid,
  Person,
  Recommend,
  RecommendOutlined,
  RecommendRounded,
  RunningWithErrors,
  SafetyCheck,
  Search,
} from "@mui/icons-material";
// import { LendBooksRender } from "@/app/dashboard/expenses/component";
import { Books } from "@/app/context/type";

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

export function AdminReservedRender({
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

export function DuePlans({
  RecomendBooks,
  isAdmin,
}: {
  RecomendBooks: Books[];
  isAdmin: boolean;
}) {
  const [student, setStudent] = useState<any>("Olamide Adebunmi");
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <Book color="secondary" />
          <p className="font-[600] text-secondary-500">Total Due Books</p>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <span className="bg-blue-50 text-sm rounded-md flex space-x-2 font-[500] text-secondary-500">
            <span>
              <BookRounded color="secondary" fontSize="small" />
            </span>
            <h1>32</h1>
          </span>
          <span className="bg-blue-50 text-sm font-[500] text-secondary-500 p-1 items-center rounded-md flex space-x-2">
            <span>
              <Paid color="secondary" fontSize="small" />
            </span>{" "}
            <h1>6532</h1>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center  w-full sm:w-1/2 mt-10 mb-8">
        <Input
          placeholder="Student Matric Number"
          className=" max-w-lg"
          size="sm"
          startContent={
            <div className="w-5 h-5 rounded-full bgslate-200">
              <Search fontSize="small" color="secondary" />
            </div>
          }
          endContent={
            // <div className="w-5 h-5 rounded-full ">
            <Button className="-mx-5" size="sm" color="secondary">
              Get Student
            </Button>
            // </div>
          }
        />
      </div>
      <div className="flex justify-between w-full  text-secondary-500">
        <User
          name="Jane Doe"
          description=<div className="text-[12px]">
            <p>Computer Science</p>
            <p className="text-[10px]">U/22/CS/0015</p>
          </div>
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        <div>
          <div className="flex text-[12px] justify-end items-center space-x-3">
            <div className="flex flex-col items-center h-full">
              <h1 className="font-semibold]">Lent</h1>
              <span className="mt-2 bg-blue-50 text-sm rounded-md flex space-x-2 font-[500] text-secondary-500">
                <span>
                  <Book color="secondary" fontSize="small" />
                </span>
                <h1 className="text-[12px]">3</h1>
              </span>
              <span className=" mt-3 bg-blue-50 text-sm font-[500] text-secondary-500 p-1 items-center rounded-md flex space-x-2">
                <span>
                  <Paid color="secondary" fontSize="small" />
                </span>{" "}
                <h1 className="text-[12px]">5</h1>
              </span>
            </div>
            <div className="flex flex-col items-center h-full">
              <h1 className="font-semibold]">Reserved</h1>
              <span className="mt-2 bg-blue-50 text-sm rounded-md flex space-x-2 font-[500] text-secondary-500">
                <span>
                  <SafetyCheck color="secondary" fontSize="small" />
                </span>
                <h1 className="text-[12px]">3</h1>
              </span>
              <span className="mt-3 bg-blue-50 text-sm font-[500] text-secondary-500 p-1 items-center rounded-md flex space-x-2">
                <span>
                  <Paid color="secondary" fontSize="small" />
                </span>
                <h1 className="text-[12px]">6</h1>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="space-y-5 w-full">
        {" "}
        <div className="mt 10 p-1 w-full only: shadow-inner rounded-lg">
          <h1 className="font-semibold text-secondary-500 text-3xl text-center mt-10">
            User Lent Books
          </h1>
          <div className="mt-20 w-full h-full items-center flex justify-center text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
              {/* {RecomendBooks.map((category, index) => (
                // <LendBooksRender
                //   key={category?.id ?? index}
                //   isAdmin={true}
                //   Category={category}
                // />
              ))} */}
            </div>
          </div>
        </div>
        <div className="mt 10 p-1 w-full only: shadow-inner rounded-lg">
          <h1 className="font-semibold text-secondary-500 text-3xl text-center mt-10">
            User Reserved Books
          </h1>
          <div className="mt-20 w-full h-full items-center flex justify-center text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
              {RecomendBooks.map((category, index) => (
                <AdminReservedRender
                  key={category?.id ?? index}
                  isAdmin
                  Category={category}
                />
              ))}
            </div>
          </div>
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
  const [student, setStudent] = useState<any>("Olamide Adebunmi");
  return (
    <div className="bg-slate-50 border-slate-200 border rounded-lg shadow-lg  p-3 flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <p className="flex space-x-2">
          <Recommend color="secondary" />
          <p>Categorise</p>
        </p>
        <span className="bg-blue-50 rounded-sm">
          <List color="secondary" />
        </span>
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
