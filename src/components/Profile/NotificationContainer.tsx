"use client";

import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";

interface NotificationContainerProps {
    children: React.ReactNode;
    count: number;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ children, count }) => {
    return (
        <div className="w-full h-full flex flex-col rounded-3xl p-[.25rem]">
                    
        {/* Header with Icon and Text */}
        <div className="flex justify-between items-center pl-[.5rem]">
            <div className="flex items-center gap-3 p-[.25]">
                <IoNotificationsSharp className="text-purple-950 w-7 h-7" />
                <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <p className="text-purple-950 font-bold text-4xl pr-[.5rem] pb-[.5rem]">{count}</p>
        </div>

        {/* Cases Section */}
        <div className="flex flex-col gap-[0rem] mt-[.25rem]">
            {children}
        </div>
        </div>
    );
};

export default NotificationContainer;
