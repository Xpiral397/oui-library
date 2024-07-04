"use client";
import { Books } from "@/app/dashboard/discover/sidebar";
import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export interface UsePreferance {
  recomended: Books[] | null;
  setRecomendedBooks: React.Dispatch<React.SetStateAction<Books[] | null>>;
}

const UsePreferance = createContext<UsePreferance>({} as UsePreferance);

export default function UseRecomendationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recomended, setRecomendedBooks] = useState<Books[] | null>(null);
  useEffect(() => {
    try {
      api.get("/routes/get_recomended_books/science").then((res) => {
        setRecomendedBooks(res.data);
      });
    } catch (e: any) {
      toast.error("unable to fetch books");
    }
  }, []);
  return (
    <UsePreferance.Provider value={{ recomended, setRecomendedBooks }}>
      {children}
    </UsePreferance.Provider>
  );
}
