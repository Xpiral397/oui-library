"use client";
import React, { useContext, useEffect, useState } from "react";
// import Sidebar, { Books } from "../sidebar";
import { useRouter } from "next/navigation";
import Book from "@/public/books.jpg";
// import { Category, CategoryRender, Recommended } from "../component";
import { ScrollShadow } from "@nextui-org/react";
import { Books, InitialData } from "@/app/context/type";
import { loadData } from "@/app/context/clientStorage/save";
import Sidebar from "../discover/sidebar";
import { Category, CategoryRender, Recommended } from "../discover/component";
import { ArrowBackIos, ArrowOutward, Cancel } from "@mui/icons-material";
import { useCategory } from "@/app/context/useSelectBooks/useCategory";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
export type Loading = "Loading";
export type Unauthenticated = "unathenticated";
export default function Page() {
  const [store, setStore] = useState<InitialData | Loading | Unauthenticated>(
    "Loading"
  );
  const { category, setCategory } = useContext(useCategory);

  const router = useRouter();
  useEffect(() => {
    const store = loadData().auth as any;
    if (!store.auth.isAuthenticated) {
      router.push("/auth/signin");
    } else {
      setStore(store);
    }
  }, []);
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  const [show, setshow] = useState<boolean>(true);
  // const [categories, setCategories] = useState<Category>({
  //   categories: ["Fiction", "Science"], // Assuming there's only one category for simplicity
  //   category: {
  //     Fiction: Array.from({ length: 20 }, (_, index) => ({
  //       id: `book_${index + 1}`,
  //       cover: Book.src,
  //       author: `Author ${index + 1}`,
  //       title: `Book Title ${index + 1}`,
  //       name: `Book Name ${index + 1}`,
  //       rate: "5", // Example rating
  //       rated: "Rated", // Example rated status
  //       pages: "300", // Example number of pages
  //       rating: "4.5", // Example rating
  //       reviews: "100", // Example number of reviews
  //       description: `Description of book ${index + 1}`, // Example description
  //     })),
  //     Science: Array.from({ length: 20 }, (_, index) => ({
  //       id: `book_${index + 1}`,
  //       cover: Book.src,
  //       author: `Author ${index + 1}`,
  //       title: `Book Title ${index + 1}`,
  //       name: `Book Name ${index + 1}`,
  //       rate: "5", // Example rating
  //       rated: "Rated", // Example rated status
  //       pages: "300", // Example number of pages
  //       rating: "4.5", // Example rating
  //       reviews: "100", // Example number of reviews
  //       description: `Description of book ${index + 1}`, // Example description
  //     })),
  //   },
  // });

  return (
    <div className="flex flex-col w-full h-full lg:flex-row bg-slate-50">
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="w-full h-screen"
      >
        <div className="w-full h-ful">
          <div className="w-full p-2 space-y-3 rounded-lg">
            <ScrollShadow
              hideScrollBar
              orientation="vertical"
              className="w-full h-screen"
            >
              {(category && (
                <section className="w-full p-1">
                  <CategoryRender
                    isAdmin={false}
                    RecomendBooks={category as any}
                  />
                </section>
              )) || (
                <section className="w-full h-full p-1 text-center text-yellow-400 animate-pulse">
                  ....Loading
                </section>
              )}
            </ScrollShadow>
          </div>
        </div>
      </ScrollShadow>
      {selectedBooks && show && (
        <div className="absolute right-0 top- bg-gradient-to-r  from-amber-50 via-yellow-50 to-slate-50 shadow-2xl flex py-5 px-5 justify-center w-[400px] h-full z-[100] ">
          <ScrollShadow
            hideScrollBar
            orientation="vertical"
            className="w-full h-full sm:h-screen z-10"
          >
            {" "}
            <div onClick={() => setshow(!show)}>
              <Cancel
                className=" mb-10 absolute top-0 mt-2 right-1 left-0 py-1 animate-pulse text-[25px]"
                fontSize="small"
                color="secondary"
              />
            </div>
            <Sidebar Book={selectedBooks as Books} />
          </ScrollShadow>{" "}
        </div>
      )}
    </div>
  );
}
