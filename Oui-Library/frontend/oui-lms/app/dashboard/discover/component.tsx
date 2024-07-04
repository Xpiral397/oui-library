"use client";
import { Image, Input, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

import React, { useContext } from "react";

import {
  ArrowBackIos,
  ArrowForwardIos,
  Book,
  BookOnline,
  Delete,
  Edit,
  List,
  MenuBook,
  Pages,
  Person,
  RateReview,
  ReadMore,
  Recommend,
  RecommendOutlined,
  RecommendRounded,
  RemoveRedEye,
  Search,
  Star,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
import api, { baseURL } from "@/app/context/api";
import { Books, User } from "@/app/context/type";

export interface Category {
  categories: string[];
  category: {
    [key: string]: Books[];
  };
}
export interface userComment {
  userid: string;
  full_name: string;
  username: string;
}
export interface Comment {
  text: string;
  user: userComment;
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
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  return (
    <div
      onClick={() => {
        console.log(Category, "jfiroo");
        setSelectedBooks(Category);
      }}
      key={key}
      className="relative transform hover:scale-105 transition-transform duration-300 shadow-mds rounded-lg sm:w-[250px] w-[200px]  h-[420px]  bg-gradient-to-r from-slate-100 to-transparent flex  items-start justify-between flex-col"
    >
      {!isAdmin && (
        <div className="absolute top-0 mt-2 ml-8 space-x-3 right-2">
          <Edit fontSize="small" color="warning" />
          <Delete fontSize="small" color="warning" />
        </div>
      )}
      <div className="flex justify-right  mx-1  mt-1 mb-2 text-[12px]  text-amber-500 w-full space-x-4 ">
        <h1 className="flex items-center h-full mt-1 space-x-3 font-[400] text-center rounded-lg text-ellipsis ">
          <p>
            <ReadMore color="inherit" fontSize="small" />
          </p>
          <p>{Category.total_pages}</p>
        </h1>
        <h1 className="flex items-center h-full mt-1 space-x-3 font-semibold text-center rounded-lg text-ellipsis ">
          <p>
            <RemoveRedEye color="inherit" fontSize="small" />
          </p>
          <p>34</p>
        </h1>
      </div>
      <div className="w-[180px] flex items-center justify-center sm:w-full">
        <Image src={baseURL + Category.image} className="h-[250px]" />
      </div>
      <div className="w-full  text-sm text-slate-600">
        <h1 className="w-full px-3 mt-2 font-semibold text-center rounded-lg text-ellipsis">
          {Category.title}
        </h1>
        <h1 className="flex justify-between w-full mt-1 font-semibold text-center rounded-lg text-ellipsis">
          <p>
            <Person /> Author
          </p>
          <p>{Category.author}</p>
        </h1>
        <div className="flex items-center justify-between h-10 p-1 ">
          <h1 className="text-yellow-500 text-[15px]  flex space-x-2 px-3 mt-2 rounded-lg  font-semibold text-ellipsis text-center">
            <Star fontSize="inherit" />
            <Star fontSize="inherit" />
            <Star fontSize="inherit" />
            <Star fontSize="inherit" />
          </h1>
          <div className="flex space-x-3  text-zin-400 font-[400] text-sm ">
            <h1 className="flex justify-between w-full mt-1 space-x-2 text-center rounded-lg text-ellipsis">
              <p>
                <ThumbUp fontSize="inherit" style={{ fontWeight: "200" }} />
              </p>
              <p>{Category.likes}</p>
            </h1>
            <h1 className="flex justify-between w-full mt-1 space-x-2 text-center rounded-lg text-ellipsis">
              <p>
                <ThumbDown fontSize="inherit" />
              </p>
              <p>{Category.unlike}</p>
            </h1>
          </div>
        </div>
      </div>{" "}
      <div className="w-full flex justify-between space-x-1 items-center ">
        <Button isDisabled className="w-full rounded-md">
          Lend
        </Button>
        <Button className="w-full rounded-md">Reserved</Button>
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
    <div className="flex flex-col items-center justify-center w-full h-full p-3 border rounded-lg shadow-md bg-slate-50 boder-slate-500">
      <div className="flex justify-between w-full">
        <div className="flex space-x-2">
          <RecommendRounded color="warning" />
          <p className="font-[600] text-amber-500">Recomended</p>
        </div>
        <span className="rounded-md bg-blue-50">
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
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {RecomendBooks?.slice(0, 3).map((category, index) => (
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

export function CategoryRender({
  RecomendBooks,
  isAdmin,
}: {
  RecomendBooks: Category | null;
  isAdmin: boolean;
}) {
  console.log(RecomendBooks?.category["Science"], RecomendBooks?.category);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-3 border rounded-lg shadow-lg bg-slate-50 border-slate-200">
      <div className="flex justify-between w-full">
        <p className="flex space-x-2">
          <Recommend color="warning" />
          <p>Categorise</p>
        </p>
        <span className="rounded-sm bg-blue-50">
          <List color="warning" />
        </span>
      </div>
      <div className="flex items-center justify-center w-full mt-10 mb-8 sm:w-1/2">
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
        <Tabs radius="md" aria-label="Tabs radius">
          {RecomendBooks?.categories.map((cateogry) => (
            <Tab key={cateogry} title={cateogry}>
              <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 xl:gap-10 ">
                {RecomendBooks?.category[cateogry]?.map((category, index) => (
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

export function Reviews({ comment }: { comment: Comment[] }) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return comment.map((comment) => {
    return (
      <Card className="max-w-[340px] mb-10">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://nextui.org/avatars/avatar-1.png"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h4 className="font-semibold leading-none text-small text-default-600">
                {comment.user.full_name}
              </h4>
              <h5 className="tracking-tight text-small text-default-400">
                @{comment.user.username}
              </h5>
            </div>
          </div>
          <Button
            className={
              (isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : "") + "py-2 px-4 rounded-md"
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Like" : "unlike"}
          </Button>
        </CardHeader>

        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>
            {comment.text}
            This ony the Textook that has the proper explantion of Mathematice
            modelling
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
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">
              <ThumbDown />
            </p>
          </div>
        </CardFooter>
      </Card>
    );
  });
}
