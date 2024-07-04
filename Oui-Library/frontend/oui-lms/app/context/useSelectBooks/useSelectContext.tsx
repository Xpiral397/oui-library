"use client";
import React, { ReactNode, use, useEffect, useState } from "react";
import SelectProvider from "./useSelectBooks";
import { Books } from "@/app/dashboard/discover/sidebar";
import { set } from "date-fns";
import api from "../api";
import { setupDevBundler } from "next/dist/server/lib/router-utils/setup-dev-bundler";

export default function UseBooksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedBooks, setSelectedBooks] = useState<Books | null>(null);

  return (
    <SelectProvider.Provider value={{ selectedBooks, setSelectedBooks }}>
      {children}
    </SelectProvider.Provider>
  );
}
