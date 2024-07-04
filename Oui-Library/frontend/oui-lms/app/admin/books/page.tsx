"use client";
import Link from "next/link";
import {
  Category,
  CategoryRender,
  Recommended,
} from "@/app/dashboard/discover/component";
import { Add, Search } from "@mui/icons-material";
import { Input } from "@nextui-org/input";
import Book from "@/public/books.jpg";
import { Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { AdminBooks } from "./adminSidebar";
import { Books } from "@/app/dashboard/discover/sidebar";
import { Button } from "@nextui-org/button";

export default function AdminPage() {
  const [books, setBoks] = useState<AdminBooks>({} as AdminBooks);
  //   const [selectedBooks, setSelectedBooks] = useState<Books>({} );
  const [categories, setCategories] = useState<Category>({
    categories: ["Fiction", "Science"], // Assuming there's only one category for simplicity
    category: {
      Fiction: Array.from({ length: 20 }, (_, index) => ({
        id: `book_${index + 1}`,
        cover: Book.src,
        author: `Author ${index + 1}`,
        title: `Book Title ${index + 1}`,
        name: `Book Name ${index + 1}`,
        rate: "5", // Example rating
        rated: "Rated", // Example rated status
        pages: "300", // Example number of pages
        rating: "4.5", // Example rating
        reviews: "100", // Example number of reviews
        description: `Description of book ${index + 1}`, // Example description
      })),
      Science: Array.from({ length: 20 }, (_, index) => ({
        id: `book_${index + 1}`,
        cover: Book.src,
        author: `Author ${index + 1}`,
        title: `Book Title ${index + 1}`,
        name: `Book Name ${index + 1}`,
        rate: "5", // Example rating
        rated: "Rated", // Example rated status
        pages: "300", // Example number of pages
        rating: "4.5", // Example rating
        reviews: "100", // Example number of reviews
        description: `Description of book ${index + 1}`, // Example description
      })),
    },
  });
  return (
    <div className="w-full bg-white rounded-lg sm:p-12 md:p-1  z-0">
      <div className="lg:shadow-2xl sm:px-5">
        <h1 className="text-3xl text-secondary-500  font-semibold text-center mt-10 ">
          Admin Dashabord
        </h1>
        <div className="w-full h-full relative rounded-lg md:mt-40 mt-20 xl:mt-20 border-t-[200px] md:border-t-[100px] border-secondary-500 ">
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
                  className="h-full bg-secondary-500 rounded-lg py-5  -mx-2 px-3 w-full text-white font-semibold text-[13px]"
                >
                  Search Books
                </Button>
              }
            />
            {/* <div content="Add New Book"> */}
            <div className=" flex justify-between space-x-7 text-[12px]  text-secondary-700 bg-slate-50 rounded-lg py-3 px-3 ">
              <Link href={"/admin/books/addBook"}>
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
              </div>
            </div>
          </div>
          <CategoryRender isAdmin={true} RecomendBooks={categories} />
          <Recommended
            isAdmin={true}
            RecomendBooks={
              Object.values(categories.category["Science"]) as Books[]
            }
          />
        </div>
      </div>
    </div>
  );
}
