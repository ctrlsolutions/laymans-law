"use client";
import * as React from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Case {
  id: string;
  title: string;
  category: {
    name: string;
    color: string;
  };
  status: {
    isOpen: boolean;
    color: string;
  };
  avatar: string;
  lastUpdate: {
    user: string;
    time: string;
  };
  description: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

const sortingOptions = [
  { label: "Latest first", value: "latest" },
  { label: "Oldest first", value: "oldest" },
];

const StatusIndicator: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const color = isOpen ? "bg-[#4BB328]" : "bg-[#B32828]";

  return <span className={`flex self-center shrink-0 w-2 h-2 ${color} rounded-full`} aria-hidden="true" />;
};

const cases: Case[] = [
  {
    id: "1",
    title: "Need Help in Leaving my Husband",
    category: { name: "Divorce Cases" },
    status: { isOpen: true },
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/05f94ecc6aa9da0cde7bbf9b88c7a8f8bff72e91?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e",
    lastUpdate: { user: "@chimichangas", time: "30 minutes ago" },
    description:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  },
  {
    id: "2",
    title: "Tabang unta ma akoa among yuta",
    category: { name: "Land Ownership" },
    status: { isOpen: false },
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/05f94ecc6aa9da0cde7bbf9b88c7a8f8bff72e91?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e",
    lastUpdate: { user: "@chimichangas", time: "1 hour ago" },
    description:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  },
];

const categories: Category[] = [
  { id: "faq", name: "FAQ's", color: "bg-yellow-400" },
  { id: "divorce", name: "Divorce Cases", color: "bg-lime-800" },
  { id: "land", name: "Land Ownership", color: "bg-teal-400" },
  { id: "civil", name: "Civil Rights", color: "bg-blue" },
  { id: "environmental", name: "Environmental Law", color: "bg-fuchsia-600" },
  { id: "human", name: "Human Rights", color: "bg-pink-600" },
];

const getCategoryColor = (categoryName: string) => {
  const category = categories.find((c) => c.name === categoryName);
  return category ? category.color : "bg-gray-300";
};

const SearchBar: React.FC<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative flex items-center border border-black rounded-[40px] mt-7 px-5 py-2.5 w-full h-10 
      max-w-2lg 
      sm:max-w-sm
      md:max-w-md
      lg:max-w-lg
      xl:max-w-xl"
    >
      <BaseFormInput
        name="search"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 mb-5 focus:outline-none focus:ring-0 focus:border-transparent w-full"
      />
      <CiSearch className="absolute right-4 text-blue-500 text-xl" />
    </div>
  );
};

const NotificationIcon: React.FC<{ notificationCount: number; isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ notificationCount, isOpen, setIsOpen }) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  const togglePreview = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block select-none" ref={notificationRef}>
      <div onClick={togglePreview} className="relative cursor-pointer">
        <CiBellOn size={28} className="text-black mt-8" />
        {notificationCount > 0 && (
          <>
            <span className="z-10 absolute w-2 h-2 top-1 right-1 bg-[#B32828] rounded-full"></span>
          </>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-3 border border-gray-200 z-[9999]">
          <p className="text-sm font-semibold">Notifications</p>
          <ul className="mt-2">
            {cases.length > 0 ? (
              cases.map((c) => (
                <li key={c.id} className="flex items-center space-x-3 text-xs text-gray-700 py-2 border-b last:border-b-0">
                  <img src={c.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-gray-500 text-[10px]">{c.lastUpdate.user} • {c.lastUpdate.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-xs text-gray-500 py-2 text-center">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const CaseCard: React.FC<{ caseItem: Case }> = ({ caseItem }) => (
  <article className="mt-8 z-0">
    <div className="relative ml-[580px] flex justify-center items-center px-1.5 py-1 bg-white border border-gray-300 rounded-lg shadow-sm w-fit z-0">
      <span className={`mr-2 flex shrink-0 w-2 h-2 ${getCategoryColor(caseItem.category.name)} rounded-full`} aria-hidden="true"></span>
      <span className="mr-2 text-[9.8px] font-bold">{caseItem.category.name}</span>
    </div>
    <div className="flex z-0 gap-5 justify-between items-start px-9 py-7 mt-[-10px] w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90">
      <img src={caseItem.avatar} alt="" className="w-[70px] rounded-full" />
      <div className="flex flex-col text-xs">
        <h2 className="text-xl font-bold">{caseItem.title}</h2>
        <div className="flex gap-1 mt-3 font-light">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f62326b4ac842495a4827f224d60986da492d5c8?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-2"
            aria-hidden="true"
          />
          <p>
            Latest update from <strong className="font-bold">{caseItem.lastUpdate.user}</strong> {caseItem.lastUpdate.time}
          </p>
        </div>
        <p className="mt-4 font-[275]">{caseItem.description}</p>
      </div>
      <div className="flex gap-2 px-2.5 py-2.5 text-base font-bold bg-white rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:bg-blue-700">
        <StatusIndicator isOpen={caseItem.status.isOpen} />
        <span className="pl-1 pr-4  text-base font-extrabold">{caseItem.status.isOpen ? "Open" : "Close"}</span>
      </div>
    </div>
  </article>
);

const Sidebar: React.FC = () => (
  <aside
    className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
    role="complementary"
  >
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">
      <div className="flex justify-between w-full text-blue-700">
        <button className="flex gap-1 mt-1.5 items-center hover:underline">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e03529fdda8df1e9cb5db7f312b9b67dd7af7e?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-[40px]"
            aria-hidden="true"
          />
          <span className="font-bold">All Cases</span>
        </button>
      </div>
      <button className="flex gap-2 mt-1.5 items-center hover:underline">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/336295d086557bc98363f10135593159985ebaf5?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
          alt=""
          className="w-[35px]"
          aria-hidden="true"
        />
        <span className="font-bold">Open Cases</span>
      </button>
      <div className="mt-2 px-0.5 w-full">
        <button className="flex gap-1.5 items-center hover:underline">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/484d9451c2db607d65c70da6fcf0bfd683cf8ee8?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt=""
            className="w-[35px]"
            aria-hidden="true"
          />
          <span className="font-bold">Closed Cases</span>
        </button>
        <hr className="mt-3 border-black border-opacity-30" />
        <ul className="mt-5" role="list">
          {categories.map((category) => (
            <li key={category.id} className="flex gap-3 mt-6 ml-3.5 hover:underline">
              <span className={`flex self-center shrink-0 w-2 h-2 ${category.color} rounded-full`} aria-hidden="true" />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </aside>
);

const InputDesign: React.FC = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  // const [username, setUsername] = useState<string | null>(null); //needed for the real-time username fetching commented out only kay temp ra ang data
  const openCaseCount = cases.filter((c) => c.status.isOpen).length;

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
    
    return (
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.category.name.toLowerCase().includes(query) ||
      (query === "open" && caseItem.status.isOpen) ||
      ((query === "closed" || query === "close") && !caseItem.status.isOpen)
    );
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
      <header className="pt-2.5 pr-2.5 pb-px pl-2.5 w-full bg-white rounded-[30px_30px_0px_0px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex max-md:flex-col">
          <div className="w-[77%] max-md:w-full">
            <div className="flex flex-wrap gap-6 text-xs">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5676b5cbc1d09b6b170298efcc84d833fd17cbb2?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
                alt="Logo"
                className="w-[139px] object-contain cursor-pointer"
                onClick={() => router.push("/dashboard/home")}
              />
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
          <div className="flex">
            <div className={`relative transition-transform duration-100 ${isOpen ? '' : 'hover:scale-90'}`}>
              <NotificationIcon notificationCount={openCaseCount} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div
              className="z-0 flex position-fixed gap-3 ml-5 items-start text-xs font-medium cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => router.push("/dashboard/account")}
              >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5990c8fddf80298658964bf5d965e28f274456d?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
                alt="Profile"
                className="z-10 w-[60px] rounded-full mt-3"
                />
              {/* <span className="my-auto">{username || "Guest"}</span> */}
              <span className="my-auto">rexhermoso</span> {/*this is temporary */}
            </div>
          </div>
        </div>
      </header>

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
                sortedCases.map((caseItem) => <CaseCard key={caseItem.id} caseItem={caseItem} />)
              ) : (
                <p className="text-center text-gray-500 mt-20">No cases found</p>
              )}
            </div>
          </div>
          <Sidebar />
        </div>
      </section>
    </main>
  );
};

export default InputDesign;
