"use client";
import {
  Description,
  Person,
  Star,
  ThumbDown,
  ThumbUp,
  TitleOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useState } from "react";
// import Books from "@/public/books.jpg";
import { baseURL } from "@/app/context/api";
import { Comment, Reviews } from "./component";
import { LendNewBook } from "../lend/component";
import { Books } from "@/app/context/type";
import { ReserveBooks } from "../reserves/component";

export default function Sidebar({ Book }: { Book: Books }) {
  const [reviews, setReviews] = useState<Comment[]>([
    {
      text: "Hi, love this books",
      user: {
        userid: "839",
        username: "xpiral",
        full_name: "Adebunmi Olamide",
      },
    },

    {
      text: "It lacks explantion",
      user: {
        userid: "839",
        username: "denny",
        full_name: "Rose Denny",
      },
    },
    {
      text: "Hi, iove this books",
      user: {
        userid: "839",
        username: "drake",
        full_name: "Alan Drake",
      },
    },
    {
      text: "Hi, iove this books",
      user: {
        userid: "839",
        username: "Doe376",
        full_name: "Gorge Doe",
      },
    },
  ]);

  return (
    <div className="text-white space-y-10 font-[300] text-[16px] rounded-lg flex flex-col text-center mt-5 z-[100]  w-full h-full ">
      <div className="px-3 py-5 rounded-lg bg-gradient-to-tr from-amber-500 t0-slate-50">
        <div className="w-full px-1 text-secondary-900 font-[500]">
          <span className="flex items-center space-x-3 mb-3">
            <TitleOutlined /> - <span>{Book?.title ?? "Unknow Author"}</span>
          </span>

          <Image
            src={baseURL + Book?.image}
            className="w-full h-full roundded-md"
          />
        </div>
        <div className="p-3 mt-4 flex items-center space-between bg-amber-50 rounded-lg ">
          <p className="font-semibold w-full flex items-center flex-col justify-between px-1 text-[16px] text-secondary-900 font-[500] ">
            <span className="flex items-center space-x-3">
              <span>Author</span>
            </span>
            <span>{Book?.author ?? "Unknow Author"}</span>
          </p>
          <p className="font-semibold w-full flex items-center flex-col justify-between px-1 text-[16px] text-secondary-900 font-[500] ">
            <span className="flex items-center space-x-3">
              <span>Author</span>
            </span>
            <span>{Book?.publisher ?? "Unknow Author"}</span>
          </p>
          {/* <p className="font-semibold w-full flex flex-col items-center justify-between px-1 text-[16px] text-secondary-900 font-[500] ">
            <span className="flex items-center space-x-3">
              <TitleOutlined /> <span>Title</span>
            </span>
            <span>{Book?.title ?? "Unknow Author"}</span>
          </p> */}
        </div>
      </div>
      <div className="  rounded-lg bg-yellow-500 flex  font-[400] text-[12px] py-1 px-1 ">
        <div className="items-center w-full h-full">
          <p>{Book?.rated ?? 0}</p> <Star fontSize="small" color="inherit" />
        </div>
        <div className="items-center w-full h-full ">
          <p>{Book?.total_pages ?? "0"}</p>
          <p>pages</p>{" "}
        </div>

        <div className="items-center w-full h-full ">
          <p>{Book?.rate ?? "0"}</p>
          <p>ratings</p>{" "}
        </div>

        <div>
          <p>{Book?.reviews ?? 0}</p>
          <p>Reviews</p>
        </div>
      </div>
      <Tabs radius="md" aria-label="Tabs radius">
        <Tab key={"description"} title={"Description"}>
          <Card className="max-w-[340px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={baseURL + Book?.image}
                />
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4 className="font-semibold leading-none text-small text-default-600">
                    {Book?.author}
                  </h4>
                  <h5 className="tracking-tight text-small text-default-400">
                    @{Book?.title}
                  </h5>
                </div>
              </div>
            </CardHeader>

            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>
                {`${Book?.description}, Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Libero eaque qui fugit ratione natus, nulla
            excepturi beatae molestiae facere! Cupiditate ipsum quisquam
          corporis amet veniam sint a quia est aspernatur?
           `}
              </p>
              <span className="pt-2">
                #MathemticeModling
                <span className="py-2" aria-label="computer" role="Image">
                  💻
                </span>
              </span>
            </CardBody>

            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">4</p>
                <p className=" text-default-400 text-small">
                  <ThumbUp />
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  97.1K
                </p>
                <p className="text-default-400 text-small">
                  <ThumbDown />
                </p>
              </div>
            </CardFooter>
          </Card>
        </Tab>
        <Tab key={"Review"} title={"Reviews"}>
          <Reviews comment={reviews} />
        </Tab>
        <Tab key={"lend"} title={"Lend"}>
          <LendNewBook book={Book} />
        </Tab>
        <Tab key={"reserved"} title={"Reserve For me"}>
          <ReserveBooks book={Book} />
        </Tab>
      </Tabs>
    </div>
  );
}
