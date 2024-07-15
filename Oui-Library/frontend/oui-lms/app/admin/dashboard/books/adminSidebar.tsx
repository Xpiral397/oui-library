"use client";
import {
  AddRounded,
  Delete,
  Edit,
  LockClockRounded,
  Star,
} from "@mui/icons-material";
import { Code, Image } from "@nextui-org/react";
import React from "react";
import Books from "@/public/books.jpg";
import { baseURL } from "@/app/context/api";

export interface AdminBooks {
  addedeBy: string;
  editby: string;
  modifyby: string;
  lastModified: string;
  dateModified: string;
  id: string;
  date?: string;
  cover: string;
  image: string;
  author: string;
  title: string;
  name: string;
  rate: string;
  rated: string;
  pages: string;
  rating: string;
  reviews: string;
  description: string;
}
export default function AdminRightSideSidebar({
  Book,
  info,
}: {
  Book: AdminBooks;
  info: string;
}) {
  return (
    <div className="relative text-white space-y-10 font-[300] text-[16px] rounded-lg flex flex-col text-center   w-full max-w-[300px] p-5  h-full shadow-md">
      <Code
        size="sm"
        color={"warning"}
        className="absolute top-0 right-0 mt-2 "
      >
        {info}
      </Code>
      <div className="bg-slate-100 rounded-lg py-5 px-3">
        <div className="w-full px-10">
          <Image src={baseURL + Book.image} />
        </div>
        <div>
          <h1 className=" font-[500] mt-5  text-purple-800">
            {Book.title ?? "No Title"}
          </h1>
          <p className="font-semibold text-[16px] text-slate-800 ">
            {Book.author ?? "Unknow Author"}
          </p>
        </div>
      </div>
      <div className="  rounded-lg bg-yellow-500 flex font-[400] text-[12px] py-3 px-3 ">
        <div className="items-center w-full h-full">
          <p>{Book.rated ?? 0}</p> <Star fontSize="small" color="inherit" />
        </div>
        <div className="  items-center w-full h-full">
          <p>{Book.pages ?? "0"}</p>
          <p>pages</p>{" "}
        </div>
        <div className="  items-center w-full h-full">
          <p>{Book.rating ?? "0"}</p>
          <p>ratings</p>{" "}
        </div>

        <div>
          <p>{Book.reviews ?? 0}</p>
          <p>Reviews</p>
        </div>
      </div>
      <div className="  rounded-lg bg-yellow-500 flex flex-col space-y-5 font-[400] text-[12px] py-3 px-3 ">
        <div className="flex justify-between  items-center w-full h-full">
          <div>
            <LockClockRounded fontSize="small" color="inherit" />
            <h1>Date Added:</h1>
          </div>{" "}
          <h1>{Book.date ?? 0}</h1>
        </div>

        <div className="flex justify-between  items-center w-full h-full">
          <div>
            <AddRounded fontSize="small" color="inherit" />
            <h1>Added by:</h1>
          </div>{" "}
          <h1>{Book.addedeBy ?? 0}</h1>
        </div>
        {Book.lastModified && (
          <div className="flex justify-between  items-center w-full h-full">
            <div>
              <AddRounded fontSize="small" color="inherit" />
              <h1>Modified by:</h1>
            </div>{" "}
            <h1>{Book.addedeBy ?? 0}</h1>
          </div>
        )}
        {Book.lastModified && (
          <div className="flex justify-between  items-center w-full h-full">
            <div>
              <AddRounded fontSize="small" color="inherit" />
              <h1>Time Modified:</h1>
            </div>{" "}
            <h1>{Book.dateModified ?? 0}</h1>
          </div>
        )}
      </div>
      <div className="  rounded-lg bg-yellow-500 flex font-[400] text-[12px] py-3 px-3 ">
        <div className="items-center w-full h-full text-secondary-500">
          <Edit fontSize="small" color="inherit" />
        </div>
        <div className="  items-center w-full h-full">
          <Delete fontSize="small" color="error" />
        </div>
      </div>
    </div>
  );
}
