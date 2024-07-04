"use client";
import { Star } from "@mui/icons-material";
import { Image, User } from "@nextui-org/react";
import React from "react";
import Books_ from "@/public/books.jpg";
import { Button } from "@nextui-org/button";
import { Books } from "@/app/context/type";

export default function Sidebar({
  Book,
  checkInFor,
  type,
}: {
  type?: string;
  Book: Books;
  checkInFor?: string | null;
}) {
  return (
    <div className="text-white space-y-10 font-[300] text-[16px] rounded-lg flex flex-col text-center mt-5   w-full h-full ">
      <div className="bg-slate-100 rounded-lg py-5 px-3">
        <div className="w-full px-10">
          <Image src={Books_.src} />
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
      {checkInFor && (
        <div className="flex justify-between">
          <User
            name="Jane Doe"
            description="Computer Science"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
          />
          <Button className="text-secondary-500">
            {type === "check out" ? "Check out" : "Check In"}
          </Button>
        </div>
      )}
    </div>
  );
}
