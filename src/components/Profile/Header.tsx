"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { cases } from "@/interface/CaseTypes";
import { HeaderProps } from "@/interface/CaseTypes";

const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchQuery, setSearchQuery }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <div className="relative flex items-center border border-black rounded-full px-5 py-2.5 w-full h-10 mt-7 
      sm:max-w-xs
      md:max-w-xs md:mr-8
      lg:max-w-lg 
      xl:max-w-xl xl:mr-16
      max-sm:mt-0">
      <BaseFormInput
        label=""
        name="search"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
        className="w-full px-4 py-0 mb-5 focus:outline-none focus:ring-0"
      />
      <CiSearch className="absolute right-4 text-blue-500 text-xl" aria-label="Search icon" />
    </div>
  );
};

const NotificationIcon: React.FC<{
  notificationCount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ notificationCount, isOpen, setIsOpen }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setIsOpen]);

  return (
    <div className="relative inline-block select-none" ref={ref}>
      <div onClick={toggleOpen} className="relative cursor-pointer">
        <CiBellOn size={28} className="text-black mt-8 max-sm:mt-0" aria-label="Notifications" />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full z-10" />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-3 border border-gray-200 z-[9999]">
          <p className="text-sm font-semibold">Notifications</p>
          {notificationCount > 0 ? (
            <ul className="mt-2 divide-y">
              {cases.map(c => (
                <li key={c.id} className="flex items-center gap-3 text-xs py-2">
                  <Image
                    src={c.avatar}
                    alt={`${c.created_by.first_name} ${c.created_by.last_name}`}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="font-semibold cursor-pointer"
                      onClick={() => router.push("/")}
                    >
                      {c.title}
                    </p>
                    <p className="text-gray-500 text-[10px]">
                      {c.created_by.first_name} • {c.created_by.last_name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 text-sm mt-5">No Notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  openCaseCount,
  user,
}) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const userId = params?.user_id as string;

  const goToProfile = () => router.push(`/${userId}`);
  const goToHome = () => router.push("/");

  return (
    <header className="p-4 sm:p-5 w-full bg-white rounded-t-[30px] shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="w-full md:w-4/5">
          <div className="hidden sm:flex flex-wrap gap-6 text-xs md:flex-nowrap items-start justify-between">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5676b5cbc1d09b6b170298efcc84d833fd17cbb2?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
              alt="App Logo"
              width={140}
              height={40}
              className="object-contain cursor-pointer transition-transform duration-200 hover:scale-105 
                md:w-26 md:h-30"
              onClick={goToHome}
            />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5676b5cbc1d09b6b170298efcc84d833fd17cbb2?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
            alt="App Logo"
            width={140}
            height={40}
            className="max-xl:hidden max-lg:hidden max-md:hidden object-contain cursor-pointer transition-transform duration-200 hover:scale-105 mx-auto
              md:w-26 md:h-30"
            onClick={goToHome}
          />
          <div className="flex sm:hidden max-sm:mt-4 items-center justify-between gap-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="mt-2">
              <NotificationIcon
                notificationCount={openCaseCount}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-end mt-4 md:mt-0 md:mr-10">
          <div className="hidden sm:block relative transition-transform duration-100 hover:scale-90">
            <NotificationIcon
              notificationCount={openCaseCount}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          <div
            className="hidden sm:flex gap-4 mx-2 items-start text-xs font-medium cursor-pointer transition-transform duration-200 hover:scale-105 md:mr-6"
            onClick={goToProfile}
          >
            <Image
              src="/blank-profile.svg"
              alt="User profile"
              width={80}
              height={80}
              className="rounded-full mt-3 md:w-14 md:h-14 md:mt-4"
            />
            <span className="my-auto mt-10">{user?.firstName || "Guest"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
