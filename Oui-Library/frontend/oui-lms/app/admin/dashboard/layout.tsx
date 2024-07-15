"use client";
import { Button, ScrollShadow } from "@nextui-org/react";
import Sidebar from "../sidebar";
import AdminSidebar from "../../dashboard/discover/sidebar";
import { useContext, useEffect, useState } from "react";
import UseSelectedBookProvider, {
  UseSelectedBooks,
} from "@/app/context/useSelectBooks/useSelectBooks";
import {
  Cancel,
  CancelOutlined,
  Delete,
  Edit,
  Remove,
} from "@mui/icons-material";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setshow] = useState<boolean>(true);
  const { selectedBooks, setSelectedBooks } = useContext<UseSelectedBooks>(
    UseSelectedBookProvider
  );
  useEffect(() => {
    if (!show && selectedBooks) {
      setSelectedBooks(null);
    }
  }, [show]);
  return (
    <div className="relative">
      <section className="relative sm:flex  hidden  h-full w-full ">
        <div className="max-w-[200px] h-screen mt-8 bg-white ">
          <Sidebar />
        </div>
        <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className="max-h-screen overflow-scroll w-full"
        >
          {children}
        </ScrollShadow>
      </section>

      <section className=" sm:hidden relative h-screen block  w-full">
        <div className="w-full absolute left-0 top-0 mt-30 z-50 h-full">
          <Sidebar />
        </div>
        <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className=" max-h-screen h-[97vh]  w-full"
        >
          {children}
        </ScrollShadow>
      </section>
      {selectedBooks && (
        <div className="absolute right-0 top-0 bg-gradient-to-r  rounded-sm from-amber-100 via-yellow-50 to-slate-50 shadow-2xl flex py-5 px-5 justify-center w-[400px] h-full z-[100] ">
          <ScrollShadow
            hideScrollBar
            orientation="vertical"
            className="w-full h-full sm:h-screen z-10"
          >
            {" "}
            <div className="flex w-full justify-between">
              <Button
                startContent={<Cancel />}
                className="bg-amber-200 text-secondary-900 font-[300] px-3 py-2 "
                onClick={() => setshow(!show)}
              >
                Dismiss
              </Button>
              <Button
                startContent={<Edit />}
                className="bg-amber-200 text-secondary-900 font-[300] px-5 py-2 "
                // onClick={() => setshow(!show)}
              >
                <Link
                  href={`/admin/dashboard/books/editBook/${selectedBooks.id}`}
                >
                  Edit
                </Link>
              </Button>
              <Button
                startContent={<Delete />}
                className="bg-amber-200 text-secondary-900 font-[300] px-3 py-2 "
                onClick={() => setshow(!show)}
              >
                Delete
              </Button>
            </div>
            <AdminSidebar
              Book={selectedBooks as any}
              // info={"You are currently edting this Book"}
            />
          </ScrollShadow>{" "}
        </div>
      )}
    </div>
  );
}
