import { IoMdCheckmark } from "react-icons/io";
import { CaseFilterButton } from "./CaseFilterButton";
import { SidebarProps } from "@/interface/CaseTypes";
import React from "react";

const BrowseCasesSidebar: React.FC<SidebarProps> = ({
  selectedCaseType,
  setSelectedCaseType,
  categories,
  selectedStatus,
  setSelectedStatus,
}) => (
  <aside className="ml-5 w-[23%] max-md:ml-0 max-md:w-full" role="complementary">
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">

      <CaseFilterButton
        caseType="open"
        selectedCaseType={selectedStatus}
        setSelectedCaseType={setSelectedStatus}
        label="Open Cases"
      />

      <CaseFilterButton
        caseType="discarded"
        selectedCaseType={selectedStatus}
        setSelectedCaseType={setSelectedStatus}
        label="Discarded Cases"
      />

      <hr className="mt-3 border-black border-opacity-30" />
      <ul className="mt-5" role="list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex gap-3 mt-6 ml-3.5 hover:underline cursor-pointer ${
              selectedCaseType === category.id
                ? "text-[#0838E5] font-bold"
                : "text-black"
            }`}
            onClick={() =>
              setSelectedCaseType(
                selectedCaseType === category.id ? "" : category.id
              )
            }
          >
            <span
              className={`flex self-center shrink-0 w-2 h-2 ${
                category.color || "bg-gray-300"
              } rounded-full`}
              aria-hidden="true"
            />
            <span>{category.name}</span>
            {selectedCaseType === category.id && (
              <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default BrowseCasesSidebar;