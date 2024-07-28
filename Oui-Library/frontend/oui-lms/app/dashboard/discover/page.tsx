"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useRouter } from "next/navigation";
import { useCategory } from "@/app/context/useSelectBooks/useCategory";
import Book from "@/public/books.jpg";
import { Category, CategoryRender, Recommended } from "./component";
import { ScrollShadow } from "@nextui-org/react";
import { Books, InitialData } from "@/app/context/type";
import { loadData } from "@/app/context/clientStorage/save";
import { Cancel } from "@mui/icons-material";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
import { tree } from "next/dist/build/templates/app-page";
export type Loading = "Loading";
export type Unauthenticated = "unathenticated";
export default function Page() {
  const [show, setshow] = useState<boolean>(true);
  const [store, setStore] = useState<InitialData | Loading | Unauthenticated>(
    "Loading"
  );
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  const { category, setCategory } = useContext(useCategory);

  const router = useRouter();
  useEffect(() => {
    const store = loadData().auth as any as InitialData;
    // alert(store.auth.isAuthenticated);
    if (!store.auth?.isAuthenticated) {
      router.push("/auth/signin");
    } else {
      setStore(store);
      setshow(true);
    }
  }, [selectedBooks, category]);

  return (
    <div className="flex flex-col w-full h-full lg:flex-row bg-slate-50">
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="w-full h-full sm:h-screen z-10"
      >
        <div className="w-full h-full">
          <div className="w-full md:p-5 space-y-3 rounded-lg">
            <section className="w-full p-1 bg-inherit">
              <Recommended
                RecomendBooks={
                  (() => {
                    let m = Object.values(
                      category?.category ?? {
                        a: [] as Books[],
                      }
                    )[0];
                    console.log(m, "strong");
                    return m;
                  })() as Books[]
                }
              />
            </section>
          </div>

          <div className="w-full p-2 md:p-5  space-y-3 rounded-lg">
            <section className="w-full md:p-1">
              <CategoryRender isAdmin={false} RecomendBooks={category} />
            </section>
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
                className="mb-10 w-5 h-96 z-[100]  absolute -top-[10.2rem] ml-5  right-1 left-0 py-1 animate-pulse text-[25px]"
                fontSize="small"
                color="warning"
              />
            </div>
            <Sidebar Book={selectedBooks as Books} />
          </ScrollShadow>{" "}
        </div>
      )}
    </div>
  );
}
