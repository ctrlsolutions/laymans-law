"use client";
import * as React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { cases, Category } from "@/interface/CaseTypes";
import CaseCard from "@/app/dashboard/case/CaseCard";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import Header from "@/components//Profile/Header";

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
  const openCaseCount = cases.filter((c) => c.status.isOpen).length;
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // const [username, setUsername] = useState<string | null>(null); //needed for the real-time username fetching commented out only kay temp ra ang data

  // useEffect(() => { 
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch("/api/user"); // Replace with the actual API endpoint soon
  //       const data = await response.json();
  //       setUsername(data.name);
  //     } catch (error) {
  //       console.error("Failed to fetch user", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const filteredCases = cases.filter((caseItem) => {
    const query = searchQuery.toLowerCase();
  
    const matchesCaseType =
      selectedCaseType === "all"
        ? true
        : selectedCaseType === "open"
        ? caseItem.status.isOpen
        : !caseItem.status.isOpen;
  
    const matchesCategory =
      selectedCategory === null || caseItem.category.name === selectedCategory;
  
    const matchesSearch =
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.category.name.toLowerCase().includes(query);
  
    return matchesCaseType && matchesCategory && matchesSearch;
  });  

  const sortedCases = [...filteredCases].sort((a, b) => {
      if (sortOrder === "latest") {
        return b.lastUpdate.time.localeCompare(a.lastUpdate.time); 
      } else {
        return a.lastUpdate.time.localeCompare(b.lastUpdate.time); 
      }
  });

  return (
    <main className="flex flex-col text-black w-full max:w-100vw font-[Poppins]" role="main">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} openCaseCount={openCaseCount} />
      <section className="self-center mt-10 pb-10 w-full max-w-[976px] h-[calc(100vh-40px)] max-h-[65vh] flex flex-col" aria-label="Case listings">
        <div className="flex gap-5 max-md:flex-col pb-5 overflow-y-auto overflow-x-hidden">
          <div className="w-[77%] max-md:w-full">
            <div className="flex flex-col">
              <BaseFormSelect
                label=""
                name="sortOrder"
                value={sortOrder}
                choices={sortingOptions}
                onChange={(e) => setSortOrder(e.target.value)}
                width="130px"
              />
              {sortedCases.length > 0 ? (
                sortedCases.map((caseItem) => <CaseCard key={caseItem.id} caseItem={caseItem} categories={categories} />)
              ) : (
                <p className="text-center text-gray-500 mt-20">No cases found</p>
              )}
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
