"use client";
import * as React from "react";

interface InformationContainerProps {
    children: React.ReactNode;
}

const InformationContainer: React.FC<InformationContainerProps> = ({ children }) => {
    return (
        <div className="w-full pt-[1rem] p-4">
            {children}
        </div>
    );
}

export default InformationContainer;