import { Books } from "@/app/dashboard/discover/sidebar";
import { createContext } from "react";

export interface UseSelectedBooks {
  selectedBooks: Books | null;
  setSelectedBooks: React.Dispatch<React.SetStateAction<Books | null>>;
}
const UseSelectedBookProvider = createContext<UseSelectedBooks>(
  {} as UseSelectedBooks
);

export interface useCategory {
  category: Books | null;
  setCategory: React.Dispatch<React.SetStateAction<Books | null>>;
}
const UseCategoryProvider = createContext<UseSelectedBooks>(
  {} as UseSelectedBooks
);

export default UseSelectedBookProvider;
