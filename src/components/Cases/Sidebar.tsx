"use client";
import { IoMdCheckmark } from "react-icons/io";
import { colorMap } from "@/interface/CaseTypes";
import { CaseFilterButton } from "./CaseFilterButton";
import { SidebarProps } from "@/interface/CaseTypes";
import React from "react";

const Sidebar: React.FC<SidebarProps> = ({
    selectedCaseType,
    setSelectedCaseType,
    selectedCategory,
    setSelectedCategory,
    categories,
}) => (
    <aside
        className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
        role="complementary"
    >
        <nav className="flex flex-col mt-3 w-full text-xs font-medium">
        <CaseFilterButton
            caseType="all"
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            label="All Cases"
        />

        <CaseFilterButton
            caseType="open"
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            label="Open Cases"
        />

        <CaseFilterButton
            caseType="closed"
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            label="Closed Cases"
        />

        <hr className="mt-3 border-black border-opacity-30" />

        <ul className="mt-5" role="list">
            {categories.map((category) => (
            <li
                key={category.id}
                className={`flex gap-3 mt-6 ml-3.5 hover:underline cursor-pointer ${
                selectedCategory === category.name
                    ? "text-[#0838E5] font-bold"
                    : "text-black"
                }`}
                onClick={() =>
                setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                )
                }
            >
                <span
                    className={`flex self-center shrink-0 w-2 h-2 ${colorMap[category.color] || "bg-gray-300"} rounded-full`}
                    aria-hidden="true"
                />
                <span>{category.name}</span>
                {selectedCategory === category.name && (
                <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
                )}
            </li>
            ))}
        </ul>
        </nav>
    </aside>
);

export default Sidebar;

