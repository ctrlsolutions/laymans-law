"use client";

import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";

interface NotificationContainerProps {
  children: React.ReactNode;
  count: number;
  color?: "red" | "blue";
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  children,
  count,
  color = "blue",
}) => {
  return (
    <div className="bg-white w-full h-full flex flex-col rounded-3xl">
      {/* Header with Icon and Text */}
      <div className="bg-white flex justify-between items-center mx-[1.5rem] mt-[1rem]">
        <div className="flex items-center gap-3">
          <IoNotificationsSharp
            className={`w-7 h-7 ${color === "red" ? "text-red" : "text-blue"}`}
          />
          <h1 className="text-2xl font-bold text-black">Notifications</h1>
        </div>
        <p
          className={`font-bold text-4xl pr-[.5rem] ${
            color === "red" ? "text-red" : "text-blue"
          }`}
        >
          {count}
        </p>
      </div>

      {/* Cases Section */}
      <div className="bg-white flex flex-col gap-[0rem] mt-[1rem] pb-[0.5rem] ml-[2.2rem] mr-[2.2rem]">
        {children}
      </div>
    </div>
  );
};

export default NotificationContainer;
