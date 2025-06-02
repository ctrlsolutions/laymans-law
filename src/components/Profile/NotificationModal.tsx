"use client";

import React from "react";
import NotificationComponent from "./NotificationComponent";
import { IoNotificationsSharp, IoChevronUpOutline } from "react-icons/io5"; 

interface NotificationModalProps {
    notifications: {
        id: number;
        title: string;
        username: string;
        timeAgo: string;
        description: string;
        category: string;
    }[];
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose }) => {
    return (
        <div className="fixed inset-3 flex items-center justify-end z-50">
            <div className="bg-white w-[42.5vw] h-[91vh] p-6 rounded-3xl shadow-lg transition-all duration-300 mr-10 relative">
                
                {/* Header with Icon and Count */}
                <div className="flex justify-between items-center pl-[.5rem]">
                    <div className="flex items-center gap-3 p-[.25]">
                        <IoNotificationsSharp className="text-purple-950 w-7 h-7" />
                        <h1 className="text-2xl font-bold">Notifications</h1>
                    </div>
                    <p className="text-purple-950 font-bold text-4xl pr-[.5rem] pb-[.5rem]">
                        {notifications.length}
                    </p>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto overflow-x-hidden h-[81vh] pr-4">
                    {notifications.map((notification) => (
                        <NotificationComponent 
                            key={notification.id} 
                            notification={notification} 
                        />
                    ))}
                </div>

                {/* Collapse Icon at Bottom Center */}
                <button 
                    onClick={onClose} 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-purple-950"
                >
                    <IoChevronUpOutline className="w-10 h-10" />
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;
