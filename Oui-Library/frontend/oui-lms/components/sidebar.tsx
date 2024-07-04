"use client";
import React from "react";
import Logo from "@/public/logo.png";
import { Divider, Image } from "@nextui-org/react";

export default function Sidebar() {
  return (
    <div className="w-[300px] h-full bg-white flex flex-col px-3 py-5 ">
      <nav className="">
        <div className="flex justify-center ">
          <Image src={Logo.src} width={100} />
          <h1 className="font-[800] text-slate-purple-900 ">OUI-LMS</h1>
          <Divider className="border-slate-300border-[1px]" />
        </div>
      </nav>

      <div>
        <h1 className="font-[800] text-slate-100 ">MENUS</h1>
        <Divider className="border-slate-300border-[1px]" />
        <ul className="mx-3">
          <li>Reading Now</li>
          <li>Book Store</li>
          <li>WhishList</li>
          <li>Subscription</li>
          <li>My Account</li>
        </ul>
      </div>

      <div>
        <h1 className="font-[800] text-slate-100 ">Manage</h1>
        <Divider className="border-slate-300border-[1px]" />
        <ul className="mx-3">
          <li>Reserve Books</li>
          <li>Lendings</li>
          <li>Paymnts</li>
          <li>My Account</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
}
