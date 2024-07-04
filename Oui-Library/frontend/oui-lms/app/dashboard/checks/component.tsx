// NotificationComponent.tsx
import React, { useState, useEffect } from "react";
import { subDays, formatDistance } from "date-fns";
import { Cancel } from "@mui/icons-material";

const Notification: React.FC<{ details: string }> = ({ details }) => {
  const [clearOut, setClearOut] = useState<any>(details);

  useEffect(() => {
    // Your useEffect code...
  }, [clearOut]);

  const LendingAddNotification: React.FC<{ details: any }> = ({ details }) => {
    const { name, title, date, from, to } = details;
    const timeAgo = formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
    });

    return (
      <div className="flex justify-between w-full bg-teal-100 border-teal-500 border-l-4 p-4 mb-2 rounded-md">
        <p className="text-teal-900">
          <span className="font-semibold">{name}</span> lent the book "{title}"{" "}
          {timeAgo}. From {from} to {to}.
        </p>
        <Cancel color={"error"} />
      </div>
    );
  };

  const LendingCancelNotification: React.FC<{ details: any }> = ({
    details,
  }) => {
    const { name, title, date } = details;
    const timeAgo = formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
    });

    return (
      <div className="flex justify-between w-full bg-red-100 border-red-500 border-l-4 p-4 mb-2 rounded-md">
        <p className="text-red-900">
          <span className="font-semibold">{name}</span> cancelled the lending of
          the book "{title}" {timeAgo}.
        </p>

        <Cancel color={"error"} />
      </div>
    );
  };

  const ReservationEditNotification: React.FC<{ details: any }> = ({
    details,
  }) => {
    const { name, title, date } = details;
    const timeAgo = formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
    });

    return (
      <div className="flex justify-between w-full bg-yellow-100 border-yellow-500 border-l-4 p-4 mb-2 rounded-md">
        <p className="text-yellow-900">
          Reservation for the book "{title}" by{" "}
          <span className="font-semibold">{name}</span> was edited {timeAgo}.
        </p>
        <Cancel color={"error"} />
      </div>
    );
  };

  const BooksReservationAddNotification: React.FC<{ details: any }> = ({
    details,
  }) => {
    const { name, title, date, from, to } = details;
    const timeAgo = formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
    });

    formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
    return (
      <div className="justify-between flex w-full bg-blue-100 border-blue-500 border-l-4 p-4 mb-2 rounded-md">
        <p className="text-blue-900">
          <span className="font-semibold">{name}</span> added a reservation for
          the book "{title}" {timeAgo}. From {from} to {to}.
        </p>
        <Cancel color={"error"} />
      </div>
    );
  };

  return (
    <div className="flex justify-center items-start mt-10 h-screen">
      <div className="w-full">
        {/* Render notifications based on type */}
        {clearOut.map((transaction: any, index: number) =>
          Object.values(transaction).map((details: any) => {
            const { type } = details;
            switch (type) {
              case "lending add":
                return <LendingAddNotification key={index} details={details} />;
              case "lending cancel":
                return (
                  <LendingCancelNotification key={index} details={details} />
                );
              case "Reservation edit":
                return (
                  <ReservationEditNotification key={index} details={details} />
                );
              case "Books Reservations add":
                return (
                  <BooksReservationAddNotification
                    key={index}
                    details={details}
                  />
                );
              default:
                return null;
            }
          })
        )}
      </div>
    </div>
  );
};

export default Notification;
