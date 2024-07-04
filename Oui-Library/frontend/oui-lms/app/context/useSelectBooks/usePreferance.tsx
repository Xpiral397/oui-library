import { Books } from "@/app/dashboard/discover/sidebar";
import { createContext, ReactNode, useState } from "react";

export interface Preferance {
  genre: string[];
  like: string[];
  loved: string[];
  hated: string[];
  category: string[];
  recomended: string[];
  currentSelection: string | null;
}
export interface UsePreferance {
  preferance: Preferance | null;
  setPreferance: React.Dispatch<React.SetStateAction<Preferance | null>>;
}

const UsePreferance = createContext<UsePreferance>({} as UsePreferance);

export default function UserPreferanceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferance, setPreferance] = useState<Preferance | null>(null);

  return (
    <UsePreferance.Provider value={{ preferance, setPreferance }}>
      {children}
    </UsePreferance.Provider>
  );
}
