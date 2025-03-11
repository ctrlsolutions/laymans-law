"use client";
import { useState } from "react";

const Cases: React.FC = () => {
    const [selected, setSelected] = useState("Newest");

    return (
        <>
        <div className="w-[48%] flex-grow p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl h-[30%] text-black flex flex-col items-center">
            <div className="flex justify-between w-full mb-3">
                <h1 className=" font-extrabold text-xl">Submitted Cases</h1> 
                <p className="font-extrabold text-red text-2xl">142</p>
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

            <div className="flex-grow w-full overflow-y-auto overflow-x-hidden mt-3">
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                <div className="h-[10vh] bg-white shadow-[0px_4px_20px_0px_rgba(0,1,0.15,0.15)] rounded-3xl m-3">
                </div>
                
            </div>
           
        </div>
        </>
    )
};

export default Cases;