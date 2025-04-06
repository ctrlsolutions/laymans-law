"use client";
import React, { useEffect, useRef } from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { cases } from "@/interface/CaseTypes";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  openCaseCount: number;
  user: { firstName: string } | null; 
}

const SearchBar: React.FC<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative flex items-center border border-black rounded-[40px] px-5 py-2.5 w-full h-10 max-w-2lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <BaseFormInput
        label=""
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

const NotificationIcon: React.FC<{
  notificationCount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ notificationCount, isOpen, setIsOpen }) => {
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);

  const togglePreview = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block select-none" ref={notificationRef}>
      <div onClick={togglePreview} className="relative cursor-pointer">
        <CiBellOn size={28} className="text-black mt-2" />
        {notificationCount > 0 && (
          <span className="z-10 absolute w-2 h-2 top-1 right-1 bg-[#B32828] rounded-full"></span>
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-3 border border-gray-200 z-[9999]">
          <p className="text-sm font-semibold">Notifications</p>
          {notificationCount > 0 ? (
            <ul className="mt-2">
              {cases.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center space-x-3 text-xs text-gray-700 py-2 border-b last:border-b-0"
                >
                  <img
                    src={c.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="font-semibold cursor-pointer"
                      onClick={() => router.push("/dashboard/home")}
                    >
                      {c.title}
                    </p>
                    <p className="text-gray-500 text-[10px]">
                      {c.created_by} • {c.created_by}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 text-sm mt-5 p-2 pb-6">No Notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, openCaseCount, user }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="p-2.5 w-full bg-white rounded-t-[30px] shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5676b5cbc1d09b6b170298efcc84d833fd17cbb2?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
              alt="Logo"
              className="w-[120px] sm:w-[139px] object-contain cursor-pointer"
              onClick={() => router.push("/dashboard/home")}
            />
            <div className="w-full">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-5 md:mt-0">
          <div className={`relative transition-transform duration-100 ${isOpen ? "" : "hover:scale-90"}`}>
            <NotificationIcon notificationCount={openCaseCount} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer transition-transform duration-200 hover:scale-105 mr-5"
            onClick={() => router.push("/dashboard/account")}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5990c8fddf80298658964bf5d965e28f274456d?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
              alt="Profile"
              className="w-10 sm:w-[60px] rounded-full"
            />
            <span className="text-sm font-medium">{user?.firstName || "Guest"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
