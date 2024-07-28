import React, { useEffect, useState } from "react";
import { RangeCalendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import api from "@/app/context/api";
import { Books } from "@/app/context/type";
import { toast } from "react-toastify";
import {
  BabyChangingStation,
  Money,
  EventAvailable,
  SafetyCheck,
} from "@mui/icons-material";

export function ReserveBooks({ book }: { book: Books }) {
  const [startDate, setStartDate] = useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  const [endDate, setEndDate] = useState<CalendarDate>(
    today(getLocalTimeZone()).add({ weeks: 1 })
  );
  const [duePrice, setDuePrice] = useState<number>(500);
  const [availableQuantity, setAvailableQuantity] = useState<number>(
    book.quantity - book.lent
  );
  const [lent, setLent] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<CalendarDate | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const daysBetween = endDate.day - startDate.day;
    const newDuePrice = 50 + daysBetween * 50;
    setDuePrice(newDuePrice);
  }, [startDate, endDate]);

  useEffect(() => {
    try {
      api
        .get(`/routes/reserved/${book.id}/`)
        .then((response) => {
          if (response.status === 200) {
            setLent(true);
            const { start_date: startDate, due_date: end } = response.data;
            const start = startDate.split("-");
            const endDate = end.split("-");
            setStartDate(
              new CalendarDate(
                Number(start[0]),
                Number(start[1]),
                Number(start[2])
              )
            );
            setDueDate(
              new CalendarDate(
                Number(endDate[0]),
                Number(endDate[1]) - 1, // Adjust month since CalendarDate months are 1-based
                Number(endDate[2])
              )
            );
            updateCountdown(
              new CalendarDate(
                Number(endDate[0]),
                Number(endDate[1]),
                Number(endDate[2])
              )
            );
          } else {
            setLent(false);
          }
        })
        .catch((response) => {
          setLent(false);
        });
    } catch (e) {
      setLent(false);
    }
  }, [book.id, lent]);

  const handleDateChange = (range: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setStartDate(range.start);
    setEndDate(range.end);
  };

  const handleSubmit = async (bookId: string) => {
    const daysBetween = endDate.day - startDate.day;
    if (startDate < today(getLocalTimeZone()) || daysBetween > 12) {
      toast.error(
        "Please select a valid date range. Start date should not be in the past and the duration should not exceed 12 days."
      );
      return;
    }

    const data = {
      bookId,
      duePrice,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    };
    const toastId = toast.loading("Requesting for reservinging plan ");
    try {
      await api
        .post(`/routes/reserve_new_book/${book.id}/`, data)
        .then((response) => {
          if (response.status === 200) {
            setLent(true);
            // setDueDate(
            //   new CalendarDate(
            //     Number(response.data.due_date.split("-")[0]),
            //     Number(response.data.due_date.split("-")[1]),
            //     Number(response.data.due_date.split("-")[2])
            //   )
            // );
            toast.dismiss(toastId);
            toast.success("Book lent successfully");
          } else {
            toast.dismiss(toastId);
            toast.error(
              "Unable to reserved book: " + book.title + " try again later"
            );
          }
        });
    } catch (error) {
      console.error("Error rserving book:", error);
      toast.dismiss(toastId);
      toast.error(
        "Unable to reserved book: " + book.title + " try again later"
      );
    }
  };

  const updateCountdown = (dueDate: CalendarDate) => {
    const now = new Date();
    const due = new Date(dueDate.toString());
    const difference = due.getTime() - now.getTime();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${days}d ${hours}h ${minutes}m`);
    } else {
      setCountdown("Overdue");
    }
  };

  useEffect(() => {
    if (dueDate) {
      const interval = setInterval(() => {
        updateCountdown(dueDate);
      }, 60000); // Update every minute

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [dueDate, book.id]);

  if (book.quantity <= 0) {
    return (
      <div className="p-4 max-w-xs mx-auto text-violet-500 space-y-5">
        <BabyChangingStation fontSize="large" />
        <div>
          <span className="font-[500] text-medium">
            We are sorry at the moment, but this book is not currently
            available.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xs mx-auto text-violet-500 space-y-5">
      <div className="mb-4 flex px-2 justify-between w-full ">
        <p>
          {<SafetyCheck />} <span>Reserved</span>
        </p>
        <p>{lent ? "Yes" : "No"}</p>
      </div>
      <h2 className="text-lg font-bold text-left ">Available Books</h2>
      <div className="mb-4 flex px-2 justify-between w-full font-[500] ">
        <p>
          <EventAvailable color="inherit" /> Available Books{" "}
        </p>
        <p>{availableQuantity}</p>
      </div>
      <div className="mb-4">
        <RangeCalendar
          aria-label="Select Dates"
          value={{ start: startDate, end: endDate }}
          onChange={handleDateChange}
        />
      </div>
      <div className="mb-4 text-sm font-[500]">
        <p>Due Price: N{duePrice}</p>
      </div>
      <div className="mb-4">
        {!lent && (
          <button
            onClick={() => handleSubmit(book.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Reserved Book
          </button>
        )}
      </div>
      {lent && (
        <div className="mt-4 text-red-500 font-bold">
          <p>Due Date Countdown: {countdown}</p>
        </div>
      )}
    </div>
  );
}
