import { ScrollShadow } from "@nextui-org/react";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <section className="relative sm:flex  hidden  h-screen  w-full ">
        <div className="max-w-[200px] mt-8 bg-white h-full">
          <Sidebar />
        </div>
        <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className=" max-h-screen h-screen w-full"
        >
          {children}
        </ScrollShadow>
      </section>

      <section className=" sm:hidden relative h-screen block  w-full">
        <div className="w-full absolute left-0 top-0 mt-30 z-50 h-full">
          <Sidebar />
        </div>
        {/* <ScrollShadow
          orientation="vertical"
          hideScrollBar={true}
          className=" max-h-screen h-[97vh]  w-full"
        > */}
        {children}
        {/* </ScrollShadow> */}
      </section>
    </div>
  );
}
