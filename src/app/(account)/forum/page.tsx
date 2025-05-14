"use client";
import * as React from "react";
import { IoMdCheckmark } from "react-icons/io";
import {
  MdOutlineBookmarks,
  MdForum,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case, Category } from "@/interface/CaseTypes";
import ForumCard from "@/components/Forum/ForumCard";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import { fetchForums } from "@/services/ForumServices";
import { useRouter } from "next/navigation";
import AcceptCaseModal from "@/components/Case/AcceptCaseModal";
import { FaCheckSquare, FaRegSquare, FaBookmark } from "react-icons/fa";

const sortingOptions = [
  { label: "Latest first", value: "latest" },
  { label: "Oldest first", value: "oldest" },
];

const categories: Category[] = [
  { id: "faq", name: "FAQ's", color: "bg-yellow-400" },
  { id: "divorce", name: "Divorce Cases", color: "bg-lime-800" },
  { id: "land", name: "Land Ownership", color: "bg-teal-400" },
  { id: "civil", name: "Civil Rights", color: "bg-blue" },
  { id: "environmental", name: "Environmental Law", color: "bg-fuchsia-600" },
  { id: "human", name: "Human Rights", color: "bg-pink-600" },
];

const Sidebar: React.FC<{
  selectedCaseType: string;
  setSelectedCaseType: (type: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}> = ({
  selectedCaseType,
  setSelectedCaseType,
  selectedCategory,
  setSelectedCategory,
}) => (
  <aside
    className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
    role="complementary"
  >
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">
      {/* Start a Discussion Button */}
      <button
        className="bg-red text-white text-md py-4 px-4 rounded-lg font-semibold mb-4 hover:bg-red-700 transition shadow-xl"
        onClick={() => alert("Start a discussion clicked")}
      >
        Start a Discussion
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={() => setSelectedCaseType("all")}
        className={`flex gap-1 mt-1.5 items-center hover:underline ${
          selectedCaseType === "all" ? "text-[#0838E5] font-bold" : "text-black"
        }`}
      >
        <MdForum className="text-xl" />
        <span className="font-semibold">All Discussion</span>
        {selectedCaseType === "all" && (
          <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
        )}
      </button>

      <button
        onClick={() => setSelectedCaseType("open")}
        className={`flex gap-2 mt-1 items-center hover:underline ${
          selectedCaseType === "open"
            ? "text-[#0838E5] font-bold"
            : "text-black"
        }`}
      >
        <MdOutlineMarkEmailUnread className="text-xl" />
        <span className="font-semibold">Unread</span>
        {selectedCaseType === "open" && (
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
              className={`flex self-center shrink-0 w-2 h-2 ${category.color} rounded-full`}
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

const InputDesign: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allReadChecked, setAllReadChecked] = useState(false);
  const router = useRouter();

  const openModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const filteredCases = cases.filter((caseItem) => {
    const query = searchQuery.toLowerCase();
    const matchesCaseType =
      selectedCaseType === "all"
        ? true
        : selectedCaseType === "open"
        ? caseItem.status.toLowerCase() === "open"
        : selectedCaseType === "closed"
        ? caseItem.status.toLowerCase() === "closed"
        : false;
    const matchesCategory =
      selectedCategory === null || caseItem.category.name === selectedCategory;
    const matchesSearch =
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.category.name.toLowerCase().includes(query);
    return matchesCaseType && matchesCategory && matchesSearch;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortOrder === "latest") {
      return (
        new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      );
    } else {
      return (
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
      );
    }
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      const response = await fetchForums();
      if (isMounted) {
        if (response.success && response.data) {
          setCases(response.data);
        } else {
          setCasesError(response.message || "Failed to load cases");
        }
        setCasesLoading(false);
      }
    };

    loadCases();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (isMounted) {
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error("Error fetching user data:", response.message);
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const openCaseCount = filteredCases.filter((c) => c.status === "open").length;

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins]"
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={user}
      />

      <section
        className="self-center mt-10 pb-10 w-full max-w-[1080px] h-[calc(100vh-40px)] max-h-[77vh] flex flex-col"
        aria-label="Case listings"
      >
        <div className="flex gap-5 max-md:flex-col h-full overflow-hidden">
          {/* Left Content */}
          <div className="w-[77%] h-[100%] max-md:w-full flex flex-col">
            {/* Top Controls */}
            <div className="flex justify-between gap-4 mb-6 max-md:flex-col mr-6">
              <BaseFormSelect
                label=""
                name="sortOrder"
                value={sortOrder}
                choices={sortingOptions}
                onChange={(e) => setSortOrder(e.target.value)}
                width="130px"
              />

              {/* Checkbox: Mark All As Read */}
              <button
                className="flex items-center gap-2 text-sm font-semibold hover:underline"
                onClick={() => setAllReadChecked(!allReadChecked)}
              >
                {allReadChecked ? (
                  <FaCheckSquare className="text-blue-600 text-lg" />
                ) : (
                  <FaRegSquare className="text-gray-500 text-lg" />
                )}
                Mark All as Read
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedCase && (
              <AcceptCaseModal
                onClose={() => setIsModalOpen(false)}
                caseData={selectedCase}
              />
            )}

            {/* Scrollable Case List */}
            <div className="flex-1 overflow-y-auto pr-5">
              {casesLoading ? (
                <p className="text-center text-gray-500 mt-20">
                  Loading cases...
                </p>
              ) : casesError ? (
                <p className="text-center text-red-500 mt-20">{casesError}</p>
              ) : sortedCases.length > 0 ? (
                sortedCases.map((caseItem) => (
                  <ForumCard
                    key={caseItem.id}
                    caseItem={caseItem}
                    categories={categories}
                    onClick={() =>
                      router.push(`/dashboard/case/${caseItem.id}`)
                    }
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  No cases found
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>
    </main>
  );
};

export default InputDesign;
