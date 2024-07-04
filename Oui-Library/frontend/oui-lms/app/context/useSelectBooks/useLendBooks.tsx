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
export interface PreferanceState {
  preferance: Preferance | null;
  setPreferance: React.Dispatch<React.SetStateAction<Preferance | null>>;
}
export interface UseLenBooks {
  preferance: Preferance | null;
  setPreferance: React.Dispatch<React.SetStateAction<Preferance | null>>;
}

const UsePreferance = createContext<PreferanceState>({} as PreferanceState);

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
