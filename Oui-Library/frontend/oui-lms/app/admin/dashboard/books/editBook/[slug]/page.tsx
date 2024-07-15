"use client";

import { ScrollShadow } from "@nextui-org/react";

import EditBookPage from "../EditBooks";
import { useState } from "react";
import AdminRightSideSidebar, { AdminBooks } from "../../adminSidebar";

export default function DashboardLayout(children: any) {
  const [books, setBooks] = useState<AdminBooks>({} as AdminBooks);
  // alert(JSON.stringify(children));
  return (
    <section className="flex justify-between items-center h-full  w-full">
      <EditBookPage bookId={children.params.slug[0]} />
    </section>
  );
}
