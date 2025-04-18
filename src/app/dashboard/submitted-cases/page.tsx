"use client";
import * as React from "react";
import { IoMdCheckmark } from "react-icons/io";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case, Category } from "@/interface/CaseTypes";
import LaymanCaseCard from "@/components/Cases/LaymanCaseCard";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import { fetchCases } from "@/services/CaseService";
import SubmittedCaseModal from "@/components/Case/SubmittedCaseModal";

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
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}> = ({ selectedCategory, setSelectedCategory }) => (
  <aside className="ml-5 w-[23%] max-md:ml-0 max-md:w-full" role="complementary">
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">
      <hr className="mt-3 border-black border-opacity-30" />
      <ul className="mt-5" role="list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex gap-3 mt-6 ml-3.5 hover:underline cursor-pointer ${
              selectedCategory === category.name ? "text-[#0838E5] font-bold" : "text-black"
            }`}
            onClick={() =>
              setSelectedCategory(selectedCategory === category.name ? null : category.name)
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const [cases, setCases] = useState<Case[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const filteredCases = cases.filter((caseItem) => {
    const query = searchQuery.toLowerCase();
    const matchesCategory =
      selectedCategory === null || caseItem.category.name === selectedCategory;
    const matchesSearch =
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.category.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    } else {
      return new Date(a.created_date).getTime() - new Date(b.created_date).getTime();
    }
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      const response = await fetchCases();
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

  return (
    <main className="flex flex-col text-black w-full font-[Poppins]" role="main">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={cases.length}
        user={user}
      />

      <section
        className="self-center mt-10 pb-10 w-full h-[75vh] max-w-[976px] flex gap-5 max-md:flex-col"
        aria-label="Case listings"
      >
        {/* Main Content */}
        <div className="flex gap-5 max-md:flex-col pb-5 w-full">
          {/* Left Section (Cases + Sort Dropdown) */}
          <div className="w-[77%] max-md:w-full flex flex-col pr-2">
            {/* Sort Dropdown (static) */}
            <div className="mb-4">
              <BaseFormSelect
                label=""
                name="sortOrder"
                value={sortOrder}
                choices={sortingOptions}
                onChange={(e) => setSortOrder(e.target.value)}
                width="130px"
              />
            </div>

            {/* Scrollable Cases List */}
            <div className="overflow-y-auto max-h-[calc(75vh-3rem)] pr-1">
              {isModalOpen && selectedCase && (
                <SubmittedCaseModal
                  onClose={() => setIsModalOpen(false)}
                  caseData={selectedCase}
                />
              )}
              {casesLoading ? (
                <p className="text-center text-gray-500 mt-20">Loading cases...</p>
              ) : casesError ? (
                <p className="text-center text-red-500 mt-20">{casesError}</p>
              ) : sortedCases.length > 0 ? (
                sortedCases.map((caseItem) => (
                  <LaymanCaseCard
                    key={caseItem.id}
                    caseItem={caseItem}
                    categories={categories}
                    onClick={() => openModal(caseItem)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">No cases found</p>
              )}
            </div>
          </div>

          {/* Right Section (Sidebar) */}
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>
    </main>
  );
};

export default InputDesign;