"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CheckIn = () => {
  const router = useRouter();

  const handleCheckIn = () => {
    router.push("/admin/checks/check-in");
  };

  return (
    <div className="bg-blue-200 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">Check In</h2>
      <p>Check in new books borrowed or lent by students.</p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCheckIn}
      >
        Go to Check In
      </button>
    </div>
  );
};

const CheckOut = () => {
  const router = useRouter();

  const handleCheckOut = () => {
    router.push("/admin/checks/check-out");
  };

  return (
    <div className="bg-green-200 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">Check Out</h2>
      <p>Check for students that want to return the borrowed books.</p>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCheckOut}
      >
        Go to Check Out
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <h1 className="text-secondary-500 text-3xl font-semibold  text-center  mb-20">
        Manage New Check In & Out Sytem{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <CheckIn />
        <CheckOut />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        * Use client to manage book transactions.
      </p>
    </div>
  );
};

export default App;
