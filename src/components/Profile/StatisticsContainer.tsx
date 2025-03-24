"use client";
import * as React from "react";
import { RiDonutChartFill } from "react-icons/ri";

interface StatisticsContainerProps {
    children: React.ReactNode;
}

const StatisticsContainer: React.FC<StatisticsContainerProps> = ({ children }) => {
    return (
        <div className="w-full pt-[1rem] p-4">
            <h2 className="w-full text-2xl font-bold flex items-center gap-2 mb-4 text-black">
                <RiDonutChartFill className="h-7 w-7"/>
                Statistics
            </h2>
            {children}
        </div>
    );
}

export default StatisticsContainer