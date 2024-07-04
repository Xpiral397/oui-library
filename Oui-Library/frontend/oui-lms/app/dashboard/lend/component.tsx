"use client";
import {
  Button,
  Image,
  Input,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import {
  ArrowBackIos,
  ArrowForwardIos,
  BabyChangingStation,
  Book,
  BookOnline,
  CardGiftcard,
  Delete,
  Edit,
  EventAvailable,
  List,
  Money,
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
          <span>To Be Return On:</span>
          {new Date(Date.now()).toISOString().split("T")[0]}
        </h1>
      </div>
      <div className="absolute bottom-3 space-y-2 flex justify-center flex-col mt-6 w-full px-5">
        <Button
          startContent={<Edit color="warning" fontSize="small" />}
          className="text-sm rounded-md text-slate-600 font-[500] w-full"
        >
          {" "}
          Edit Plan
        </Button>
      </div>
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
  isAdmin,
}: {
  RecomendBooks: Books[];
  isAdmin: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 shadow-md border boder-slate-500  flex flex-col items-center w-full h-full justify-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <CardGiftcard color="secondary" />
          <p className="font-[600] text-secondary-500">Lend Books</p>
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
            <LendBooksRender
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

import { RangeCalendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import api from "@/app/context/api";
import { Books } from "@/app/context/type";
import { toast } from "react-toastify";

export function LendNewBook({ book }: { book: Books }) {
  const [startDate, setStartDate] = useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  const [endDate, setEndDate] = useState<CalendarDate>(
    today(getLocalTimeZone()).add({ weeks: 1 })
  );
  const [duePrice, setDuePrice] = useState<number>(500);
  const [availableQuantity, setAvailableQuantity] = useState<number>(
    book.quantity - book.lent
  );
  const [lent, setLent] = useState<boolean>(false);

  useEffect(() => {
    const daysBetween = endDate.day - startDate.day;
    const newDuePrice = 50 + daysBetween * 50;
    setDuePrice(newDuePrice);
  }, [startDate, endDate]);

  const handleDateChange = (range: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setStartDate(range.start);
    setEndDate(range.end);
  };

  const handleSubmit = async (bookId: string) => {
    // setLent(true);
    const data = {
      bookId,
      duePrice,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    };
    const toastId = toast.loading("Requesting for lending plan ");
    try {
      await api.post(`/api/lend_new_book/${book.id}`, data).then((response) => {
        if (response.status === 200) {
          setLent(true);
          toast.dismiss(toastId);
          toast.success("Book lent sucessfully");
        } else {
          toast.dismiss(toastId);
          toast.error("Unable to lend book: " + book.name + "try again later");
        }
      });
    } catch (error) {
      console.error("Error lending book:", error);
      toast.dismiss(toastId);
      toast.error("Unable to lend book: " + book.title + " try again later");
      // alert("Failed to lend book");
    }
  };
  if (book.quantity <= 0) {
    return (
      <div className="p-4 max-w-xs mx-auto text-violet-500 space-y-5">
        <BabyChangingStation fontSize="large" />
        <div>
          <span className="font-[500] text-medium">
            We are sorry at the moment, but this Books is not currently
            avaliable
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xs mx-auto text-violet-500 space-y-5">
      <div className="mb-4 flex px-2 justify-between w-full ">
        <p>
          {<Money />} <span>Lent</span>
        </p>
        <p>{lent}</p>
      </div>
      <h2 className="text-lg font-bold text-left ">Available Books</h2>
      <div className="mb-4 flex px-2 justify-between w-full font-[500] ">
        <p>
          <EventAvailable color="inherit" /> Available Books{" "}
        </p>
        <p>{book.quantity}</p>
      </div>
      <div className="mb-4">
        <RangeCalendar
          aria-label="Select Dates"
          value={{ start: startDate, end: endDate }}
          onChange={handleDateChange}
        />
      </div>
      <div className="mb-4 text-sm font-[500]">
        <p>Due Price: N{duePrice}</p>
      </div>
      <div className="mb-4">
        {!lent && (
          <button
            onClick={() => handleSubmit(book.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Lend Book
          </button>
        )}
      </div>
    </div>
  );
}
