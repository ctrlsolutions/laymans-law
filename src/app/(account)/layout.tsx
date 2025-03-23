"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  lawyer,
  layman,
}: {
  lawyer: React.ReactNode;
  layman: React.ReactNode;
}) {

  //handle active tab highlight
  const tabs = [
    { name: "Home", path: (id: string) => `/${id}`}, 
    { name: "Case", path: () => `/dashboard/case`}, 
    { name: "Forum", path: () => `/dashboard/forum`}, 
    { name: "Wiki", path: () => `/dashboard/wiki`}, 
    { name: "Settings", path: (id: string) => `/${id}/settings`},
  ];
  const pathname = usePathname();
  const activeTab = tabs.find(tab => pathname.includes(tab.name.toLowerCase()))?.name || "Home";

  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("user_type");
      const storedUserId = localStorage.getItem("user_id");
      setUserType(storedUserType);
      setUserId(storedUserId);
    }
  }, []);

  if (!userType) return null;
  if (!userId) return null;

  return (
    <div
      className="flex h-screen items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url("/bg_blue.png")` }}
    >
      {/* Sidebar */}

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[22vw] bg-blue/30 ml-8 p-6 pl-0 rounded-3xl flex flex-col justify-between font-extrabold">
        <img src="/logo.png" alt="Logo" className="max-w-full h-auto m-10" />
        {/* navlinks */}
        <div className="flex flex-col text-center pb-[10vh] text-[1.1rem]">
          {tabs.map((tab, index) => (
            <Link 
              href={tab.path(userId)}
              key={index}
              className={`w-full h-[5vh] p-7 hover:text-2xl transition-all duration-350 ease-in-out flex items-center justify-center ml-4 rounded-l-3xl ${activeTab === tab.name ? 'bg-white text-black text-[1.3rem]' : 'bg-blue/30 text-white'}`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <button className="text-[1.1rem] ml-4"> Logout</button>
      </div>
      <div className="h-[95vh] w-[90vw] bg-black p-10 pt-5 rounded-xl z-10 ml-[23vw] mr-[20px] border-none">{userType === "layman" ? layman : lawyer} {userType}</div>
    </div>
  );
};