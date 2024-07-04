"use client";

import { ScrollShadow } from "@nextui-org/react";

import EditBookPage from "../EditBooks";
import { useState } from "react";
import AdminRightSideSidebar, { AdminBooks } from "../../adminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [books, setBooks] = useState<AdminBooks>({} as AdminBooks);
  return (
    <section className="flex justify-between items-center h-full  w-full">
      <EditBookPage bookId="" />

      <AdminRightSideSidebar
        Book={books}
        info={"You are editing this book currently"}
      />
    </section>
  );
}
