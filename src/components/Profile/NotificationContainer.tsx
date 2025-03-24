"use client";

import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";

interface NotificationContainerProps {
    children: React.ReactNode;
    count: number;
    color?: "red" | "blue";
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ children, count, color="blue" }) => {
    return (
        <div className="w-full h-full flex flex-col rounded-3xl p-[.25rem]">
                    
        {/* Header with Icon and Text */}
        <div className="flex justify-between items-center pl-[.5rem]">
            <div className="flex items-center gap-3 p-[.25]">
                <IoNotificationsSharp className={`w-7 h-7 ${color === "red" ? "text-red" : "text-blue"}`} />
                <h1 className="text-2xl font-bold text-black">Notifications</h1>
            </div>
            <p className={`font-bold text-4xl pr-[.5rem] pb-[.5rem] ${color === "red" ? "text-red" : "text-blue"}`}>{count}</p>
        </div>

        {/* Cases Section */}
        <div className="flex flex-col gap-[0rem] mt-[.25rem]">
            {children}
        </div>
        </div>
    );
};

export default NotificationContainer;
