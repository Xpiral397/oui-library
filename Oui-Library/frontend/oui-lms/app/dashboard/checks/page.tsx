"use client";
import React, { useState, useEffect } from "react";
import Notification from "./component";
import { CancelTwoTone } from "@mui/icons-material";
const NotificationComponent = () => {
  const [clearOut, setClearOut] = useState<any>([
    {
      1: {
        name: "Charlse Slay",
        title: "Number of wills",
        date: "02/03/2015",
        type: "lending added",
        on: "04/05/2024",
        from: "02/05/2024",
        to: "05/06/2012",
      },
    },
    {
      2: {
        name: "John Doe",
        title: "The Great Gatsby",
        date: "02/10/2015",
        type: "lending cancle",
        on: "04/07/2024",
        from: "02/08/2024",
        to: "05/09/2012",
      },
    },
    {
      3: {
        name: "Alice Smith",
        title: "To Kill a Mockingbird",
        date: "03/15/2016",
        type: "lending add",
        on: "04/10/2024",
        from: "02/11/2024",
        to: "05/12/2012",
      },
    },
    {
      4: {
        name: "Bob Johnson",
        title: "Pride and Prejudice",
        date: "05/20/2017",
        type: "Reservation edit",
        on: "04/15/2024",
        from: "02/13/2024",
        to: "05/14/2012",
      },
    },
    {
      5: {
        name: "Emma Brown",
        title: "1984",
        date: "07/25/2018",
        type: "Books Reservations add",
        on: "04/20/2024",
        from: "02/16/2024",
        to: "05/17/2012",
      },
    },
  ]);

  useEffect(() => {}, [clearOut]);

  return (
    <div className="flex flex-col md:px-10 justify-center items-center h-screen w-full">
      <h1 className="text-2xl text-blue-800 mt-60 font-[500]">
        OUI Library Account Managnment Notification
      </h1>
      <div className="w-full bg-white relative  rounded p-4">
        <Notification details={clearOut} />
      </div>
    </div>
  );
};

export default NotificationComponent;
