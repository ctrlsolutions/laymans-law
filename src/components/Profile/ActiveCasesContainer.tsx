"use client";

import React from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";

interface ActiveCasesContainerProps {
    children: React.ReactNode;
    count: number;
}

const ActiveCasesContainer: React.FC<ActiveCasesContainerProps> = ({ children, count }) => {
    return (
        <div className="w-full h-full flex flex-col rounded-3xl p-[.25rem]">
            
            {/* Header with Icon and Text */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 pl-[.75rem] pb-[1rem] pt-[1rem] pr-[.5rem]">
                    <BsFillBriefcaseFill className="text-purple-950 w-7 h-7" />
                    <h1 className="text-2xl font-bold">Active Cases</h1>
                </div>
                <p className="text-purple-950 font-bold text-4xl pr-[1rem]">{count}</p>
            </div>

            {/* Cases Section */}
            <div className="flex flex-col gap-0rem mt-1">
                {children}
            </div>
        </div>
    );
};

export default ActiveCasesContainer;
