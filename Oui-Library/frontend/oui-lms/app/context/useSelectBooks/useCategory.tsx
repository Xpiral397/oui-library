"use client";
import { Books } from "@/app/dashboard/discover/sidebar";
import { Category } from "@/app/dashboard/expenses/component";
import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export interface useCategory {
  category: Category | null;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

export const useCategory = createContext<useCategory>({} as useCategory);

export default function UseCategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/routes/get_category/science/");
        console.log(res);
        if (res.status === 200) {
          setCategory(res.data);
          // alert(res.data());
          console.log(category, "opooooo");
        }
      } catch (e) {
        toast.error("Unable to fetch book from library");
      }
    })();
  }, []);
  return (
    <useCategory.Provider value={{ category, setCategory }}>
      {children}
    </useCategory.Provider>
  );
}
