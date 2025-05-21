import { IoMdCheckmark } from "react-icons/io";
import { SideBar } from "@/interface/ForumTypes";
import { MdOutlineBookmarks, MdForum } from "react-icons/md";
import { useRouter } from "next/navigation";
import React from "react";

const ForumSideBar: React.FC<SideBar> = ({
  selectedCaseType,
  setSelectedCaseType,
  categories,
}) => {
  const router = useRouter();
  return (
    <aside
      className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
      role="complementary"
    >
      <nav className="flex flex-col mt-3 w-full text-xs font-medium">
        {/* Start a Discussion Button */}
        <button
          className="bg-red text-white text-md py-4 px-4 rounded-lg font-semibold mb-4 hover:bg-red-700 transition shadow-xl"
          onClick={() => router.push("/forum/create")}
        >
          Start a Discussion
        </button>
        {/* Navigation Buttons */}
        <button
          onClick={() => setSelectedCaseType("all")}
          className={`flex gap-1 mt-1.5 items-center hover:underline ${
            selectedCaseType === "all"
              ? "text-[#0838E5] font-bold"
              : "text-black"
          }`}
        >
          <MdForum className="text-xl" />
          <span className="font-semibold">All Discussion</span>
          {selectedCaseType === "all" && (
            <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
          )}
        </button>
        <button
          onClick={() => setSelectedCaseType("closed")}
          className={`flex gap-1.5 mt-1.5 items-center hover:underline ${
            selectedCaseType === "closed"
              ? "text-[#0838E5] font-bold"
              : "text-black"
          }`}
        >
          <MdOutlineBookmarks className="text-xl" />
          <span className="font-semibold">Favorites</span>
          {selectedCaseType === "closed" && (
            <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
          )}
        </button>

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
                className={`flex self-center shrink-0 w-2 h-2 ${category.color} rounded-full`}
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
};

export default ForumSideBar;
