"use client";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case, Category } from "@/interface/CaseTypes";
import CaseCard from "@/components/Cases/CaseCard";
import { useEffect, useRef ,useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import { fetchCases } from "@/services/CaseService";
import { useRouter } from "next/navigation";
import AcceptCaseModal from "@/components/Case/AcceptCaseModal";

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
}> = ({ selectedCaseType, setSelectedCaseType, selectedCategory, setSelectedCategory }) => (
  <aside
    className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
    role="complementary"
  >
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">
        <button 
          onClick={() => setSelectedCaseType("all")}
          className={`flex gap-1 mt-1.5 items-center hover:underline ${
            selectedCaseType === "all" ? "text-[#0838E5] font-bold" : "text-black"
          }`}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e03529fdda8df1e9cb5db7f312b9b67dd7af7e?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-[40px]"
            aria-hidden="true"
          />
          <span className="font-bold">All Cases</span>
          {selectedCaseType === "all" && <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />}
        </button>
        <button 
          onClick={() => setSelectedCaseType("open")}
          className={`flex gap-2 mt-1 items-center hover:underline ${
            selectedCaseType === "open" ? "text-[#0838E5] font-bold" : "text-black"
          }`}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/336295d086557bc98363f10135593159985ebaf5?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-[35px]"
            aria-hidden="true"
          />
          <span className="font-bold">Open Cases</span>
          {selectedCaseType === "open" && <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />}
        </button>
        <button 
          onClick={() => setSelectedCaseType("closed")}
          className={`flex gap-1.5 mt-1.5 items-center hover:underline ${
            selectedCaseType === "closed" ? "text-[#0838E5] font-bold" : "text-black"
          }`}        
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/484d9451c2db607d65c70da6fcf0bfd683cf8ee8?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-[35px]"
            aria-hidden="true"
          />
          <span className="font-bold">Closed Cases</span>
          {selectedCaseType === "closed" && <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />}
        </button>
        <hr className="mt-3 border-black border-opacity-30" />
        <ul className="mt-5" role="list">
          {categories.map((category) => (
            <li 
              key={category.id} 
              className={`flex gap-3 mt-6 ml-3.5 hover:underline cursor-pointer ${
                selectedCategory === category.name ? "text-[#0838E5] font-bold" : "text-black"
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            >
              <span className={`flex self-center shrink-0 w-2 h-2 ${category.color} rounded-full`} aria-hidden="true" />
              <span>{category.name}</span>
              {selectedCategory === category.name && <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />}
            </li>          
          ))}
        </ul>
    </nav>
  </aside>
);


const InputDesign: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [selectedCaseType, setSelectedCaseType] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const [cases, setCases] = useState<Case[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredCases = cases.filter((caseItem) => {
    const query = searchQuery.toLowerCase();
    
    // Log the selectedCaseType and caseItem.status for debugging
    console.log('Selected Case Type:', selectedCaseType);
    console.log('Case Status:', caseItem.status);  // Make sure this matches the expected value (closed or open)
  
    // Check if the case type matches the selected type
    const matchesCaseType = selectedCaseType === "all"
      ? true
      : selectedCaseType === "open"
      ? caseItem.status.toLowerCase() === "open"
      : selectedCaseType === "closed"
      ? caseItem.status.toLowerCase() === "closed"  // Ensure caseItem.status is exactly "closed"
      : false;
  
    // Check if the case category matches
    const matchesCategory = selectedCategory === null || caseItem.category.name === selectedCategory;

  
    // Search query check (title or category name)
    const matchesSearch = caseItem.title.toLowerCase().includes(query) || caseItem.category.name.toLowerCase().includes(query);
  
    // Return true only if all conditions match
    return matchesCaseType && matchesCategory && matchesSearch;
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
    let isMounted = true; // Flag to track mount status
  
    const loadCases = async () => {
      const response = await fetchCases();
      if (isMounted) {  // Only update if still mounted
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
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    let isMounted = true; // Flag to track mount status

    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (isMounted) {  // Only update if still mounted
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
      isMounted = false; // Cleanup on unmount
    };
  }, []);

const router = useRouter();

  const openCaseCount = filteredCases.filter((c) => c.status === "open").length;
 
  return (
    <main className="flex flex-col text-black w-full max:w-100vw font-[Poppins]" role="main">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        openCaseCount={openCaseCount} 
        user={user} 
      />
      <section className="self-center mt-10 pb-10 w-full max-w-[976px] h-[calc(100vh-40px)] max-h-[65vh] flex flex-col" aria-label="Case listings">
        <div className="flex gap-5 max-md:flex-col pb-5 overflow-y-auto overflow-x-hidden">
          <div className="w-[77%] max-md:w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col justify-start">
                <BaseFormSelect
                  label=""
                  name="sortOrder"
                  value={sortOrder}
                  choices={sortingOptions}
                  onChange={(e) => setSortOrder(e.target.value)}
                  width="130px"
                />
                {isModalOpen && (
                  <AcceptCaseModal
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
                    <CaseCard
                      key={caseItem.id}
                      caseItem={caseItem}
                      categories={categories}
                      onClick={() => {
                        console.log("Clicked Case Item:", caseItem); // Log the entire object being clicked
                        console.log("Attempting to navigate with ID:", caseItem.id); // Log the specific ID

                        if (caseItem.id) {
                          router.push(`/browse/${caseItem.id}`);
                        } else {
                          console.error("ERROR: Cannot navigate because caseItem.id is missing!", caseItem);
                          alert("Sorry, there was an error opening this case. The Case ID is missing.");
                        }
                      }
                      }
                    />

                  ))                  
                ) : (
                  <p className="text-center text-gray-500 mt-20">No cases found</p>
                )}
              </div>
            </div>    
          </div>
          
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
