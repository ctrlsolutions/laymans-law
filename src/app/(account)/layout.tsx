"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserLogout } from "@/services/AuthServices";
import { toast } from "react-toastify";

export default function AccountLayout({
  lawyer,
  layman,
  children,
}: {
  lawyer: React.ReactNode;
  layman: React.ReactNode;
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    try {
      await UserLogout();

      router.push("/login");
    } catch (error) {
      toast.error("Failed to lsog out. Please try again.");
    }
  };

  const pathname = usePathname();
  const router = useRouter();

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

  if (!userType || !userId) return null;
  const tabs =
    userType === "layman"
      ? [
          { key: "home", name: "Home", path: (id: string) => `/${id}` },
          {
            key: "submit",
            name: "Submit Case",
            path: () => `/submit-case`,
          },
          {
            key: "submitted",
            name: "Submitted Cases",
            path: (id: string) => `/${id}`,
          },
          { key: "wiki", name: "Wiki", path: () => `/wiki` },
          { key: "forum", name: "Forum", path: () => `/forum` },
          {
            key: "settings",
            name: "Settings",
            path: (id: string) => `/${id}/settings`,
          },
        ]
      : [
          { key: "home", name: "Home", path: (id: string) => `/${id}` },
          { key: "browse", name: "Browse Cases", path: () => `/browse` },
          {
            key: "active",
            name: "Active Cases",
            path: (id: string) => `/${id}/active-cases`,
          },
          { key: "wiki", name: "Wiki", path: () => `/wiki` },
          { key: "forum", name: "Forum", path: () => `/forum` },
          {
            key: "settings",
            name: "Settings",
            path: (id: string) => `/${id}/settings`,
          },
        ];

  const activeTab =
    tabs.find((tab) => pathname === tab.path(userId))?.name || "";

  const sidebarBg = userType === "lawyer" ? "bg-blue/60" : "bg-red/60";

  return (
    <div
      className="flex h-screen items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url("/bg-base.png")` }}
    >
      {/* Sidebar */}

      <div
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[22vw] ${sidebarBg} ml-8 p-6 pl-0 rounded-3xl flex flex-col justify-between font-extrabold`}
      >
        <img src="/logo.png" alt="Logo" className="max-w-full h-auto m-10" />
        {/* navlinks */}
        <div className="flex flex-col text-center pb-[10vh] text-[1.1rem]">
          {tabs.map((tab, index) => (
            <Link
              href={tab.path(userId)}
              key={index}
              className={`w-full h-[5vh] p-7 hover:text-2xl transition-all duration-350 ease-in-out flex items-center justify-center ml-4 rounded-l-3xl ${
                activeTab === tab.name
                  ? "bg-white text-black text-[1.3rem]"
                  : "bg-transparent text-white"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <button className="text-[1.1rem] ml-4" onClick={handleLogout}>
          {" "}
          Logout
        </button>
      </div>
      <div className="h-[95vh] w-[90vw] bg-white pt-5 rounded-xl z-10 ml-[23vw] mr-[20px] border-none">
        {userType === "layman" ? layman : lawyer}
      </div>
    </div>
  );
}
