"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "@/app/context/api";

interface Book {
  id: number;
  title: string;
  author: string;
}

interface ReservedBook {
  id: number;
  book: Book;
  reserve_date: string;
  start_date: string;
  due_date: string;
}

const calculateFee = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = now.getTime() - due.getTime();
  const daysOverdue = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (daysOverdue <= 0) return 0;
  if (daysOverdue === 1) return 500;
  if (daysOverdue === 2) return 700;
  if (daysOverdue === 3) return 1000;
  return 1000 + (daysOverdue - 3) * 200;
};

const calculateCountdown = (dueDate: string) => {
  const now = new Date().getTime();
  const due = new Date(dueDate).getTime();
  const diff = due - now;

  if (diff <= 0) return "Due date passed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

function ReservedBooksPage() {
  const [reservedBooks, setReservedBooks] = useState<ReservedBook[]>([]);
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const response = await api.get("/routes/get_reserved_books/");
        setReservedBooks(response.data);
      } catch (error) {
        console.error("Error fetching reserved books:", error);
      }
    };

    fetchReservedBooks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReservedBooks([...reservedBooks]); // Force re-render to update countdown timers
    }, 1000);

    return () => clearInterval(interval);
  }, [reservedBooks]);

  return (
    <div className="relative p-4 flex flex-col items-center">
      <header className="text-center my-4">
        <h1 className="text-2xl font-bold">Library Reserved Books</h1>
        <p className="text-sm text-gray-600">
          Check the list of reserved books and their due dates.
        </p>
      </header>
      <div className="w-full flex justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {reservedBooks.map((reservedBook) => {
            const fee = calculateFee(reservedBook.due_date);
            const countdown = calculateCountdown(reservedBook.due_date);
            return (
              <div
                key={reservedBook.id}
                className="bg-white shadow-slate-200 shadow-2xl rounded-lg p-6 transition-transform transform hover:scale-105 w-[300px] h-auto"
              >
                <h3 className="text-xl font-semibold">
                  {reservedBook.book.title}
                </h3>
                <p className="text-md text-gray-700">
                  Author: {reservedBook.book.author}
                </p>
                <p className="text-md">Reserved: {reservedBook.reserve_date}</p>
                <p className="text-md">Due: {reservedBook.due_date}</p>
                {fee > 0 ? (
                  <p className="text-md text-red-600">
                    Fee: NGN {Number(fee).toLocaleString()}
                  </p>
                ) : (
                  <p className="text-md text-green-600">
                    Countdown: {countdown}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReservedBooksPage;
