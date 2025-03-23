"use client";

import React from "react";
import ActiveCasesComponent from "./ActiveCasesComponent";

interface ActiveCasesContainerProps {
    count: number;
}

const ActiveCasesContainer: React.FC<ActiveCasesContainerProps> = ({ count }) => {
    return (
        <div className="flex flex-col gap-4">
            
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

            {/* Active Cases Components */}
            <div className="flex flex-col gap-4 mt-2">
                <ActiveCasesComponent 
                    title="Petition for Dissolution of Marriage"
                    username="@chimichangas"
                    time="30 minutes ago"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non."
                    caseType="Divorce Cases"
                />
                <ActiveCasesComponent 
                    title="Petition for Dissolution of Marriage"
                    username="@chimichangas"
                    time="30 minutes ago"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non."
                    caseType="Divorce Cases"
                />
            </div>
        </div>
    );
};

export default ActiveCasesContainer;
