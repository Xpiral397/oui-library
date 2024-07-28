"use client";
import { ScrollShadow } from "@nextui-org/react";
import Sidebar from "./sidebar";
import { ReactNode, useContext } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <section className="relative md:flex  hidden  h-screen  w-full ">
        <div className="max-w-[250px] mt-8 bg-white h-full">
          <Sidebar />
        </div>
        <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className=" max-h-screen h-screen w-full"
        >
          <Slot children={children} />
        </ScrollShadow>
      </section>

      <section className=" md:hidden relative h-screen block">
        <div className="absolute left-0 top-0 mt-30 z-50 h-full ">
          <Sidebar sm={false} />
        </div>
        <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className="h-full bg-red-400 w-full"
        >
          <Slot children={children} />
        </ScrollShadow>
      </section>
    </div>
  );
}

function Slot({ children }: { children: ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}
