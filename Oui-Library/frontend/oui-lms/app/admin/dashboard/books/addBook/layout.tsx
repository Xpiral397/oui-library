import { ScrollShadow } from "@nextui-org/react";

import AdminRightSideSidebar from "../adminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" py-6  w-full">
      {/* <ScrollShadow
        orientation="vertical"
        hideScrollBar={true}
        className="h-full  w-full"
      > */}
      {children}
      {/* </ScrollShadow> */}
      {/* <AdminRightSideSidebar current={"Add"} /> */}
    </section>
  );
}
