"use client";
import { useState } from "react";

interface CaseContainerProps {
    children: React.ReactNode;
    count: number;
}

const CaseContainer: React.FC<CaseContainerProps> = ({ children, count }) => {
    const [selected, setSelected] = useState("Newest");

    return (
        <>
        <div className="w-full h-[70%] m-3 p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl text-black flex flex-col items-center">
            <div className="flex justify-between w-full mb-3">
                <h1 className=" font-extrabold text-xl">Submitted Cases</h1> 
                <p className="font-extrabold text-red text-2xl">{count}</p>
            </div>
            <div className="relative self-start">
                <select
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm cursor-pointer"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
            {children}
        </div>
        </>
    )
};

export default CaseContainer;