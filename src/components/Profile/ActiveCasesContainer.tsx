"use client";

import React from "react";

interface ActiveCasesContainerProps {
    children: React.ReactNode;
    count: number;
}

const ActiveCasesContainer: React.FC<ActiveCasesContainerProps> = ({ children, count }) => {
    return (
        <div className="w-full h-full flex flex-col bg-white shadow-[0px_10px_15px_0px_rgba(0,0,0,0.25)] rounded-3xl p-6">
            
            {/* Header with Image and Text */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img 
                        src="/ActiveCasesLogo.png" 
                        alt="Active Cases Logo" 
                        className="w-8 h-8 pb-[.1rem]"
                    />
                    <h1 className="text-xl font-bold">Active Cases</h1>
                </div>
                <p className="text-purple-950 font-bold text-2xl">{count}</p>
            </div>

            {/* Cases Section */}
            <div className="flex flex-col gap-0rem mt-1">
                {children}
            </div>
        </div>
    );
};

export default ActiveCasesContainer;
