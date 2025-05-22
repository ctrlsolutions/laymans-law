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
  const pathname = usePathname();
  const router = useRouter();

  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserType(localStorage.getItem("user_type"));
      setUserId(localStorage.getItem("user_id"));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await UserLogout();
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  if (!userType || !userId) return null;

  const baseTabs = [
    { key: "home", name: "Home", path: (id: string) => `/${id}`, match: (p: string, id: string) => p === `/${id}` },
    { key: "wiki", name: "Wiki", path: () => `/wiki`, match: (p: string) => p.startsWith("/wiki") },
    { key: "forum", name: "Forum", path: () => `/forum`, match: (p: string) => p.startsWith("/forum") },
    { key: "settings", name: "Settings", path: (id: string) => `/${id}/settings`, match: (p: string, id: string) => p.startsWith(`/${id}/settings`) },
    { key: "ofw-support", name: "OFW Support Section Details", path: () => `/wiki/ofw-support`, match: (p: string) => p.startsWith("/wiki/ofw-support") },
  ];

  const laymanTabs = [
    { key: "submit", name: "Submit Case", path: (id: string) => `/${id}/submit-case`, match: (p: string, id: string) => p.startsWith(`/${id}/submit-case`) },
    { key: "submitted", name: "Submitted Cases", path: (id: string) => `/${id}/submitted-cases`, match: (p: string, id: string) => p.startsWith(`/${id}/submitted-cases`) },
  ];

  const lawyerTabs = [
    { key: "browse", name: "Browse Cases", path: () => `/browse`, match: (p: string) => p.startsWith("/browse") },
    { key: "active", name: "Active Cases", path: (id: string) => `/${id}/active-cases`, match: (p: string, id: string) => p.startsWith(`/${id}/active-cases`) },
  ];

  const tabs = userType === "layman"
    ? [...baseTabs.slice(0, 1), ...laymanTabs, ...baseTabs.slice(1)]
    : [...baseTabs.slice(0, 1), ...lawyerTabs, ...baseTabs.slice(1)];

  let contentToShow;
  const standaloneRoutes = ["/wiki", "/forum", "/submit-case"];
  const isStandalonePage = standaloneRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const activeTab = tabs.find(tab => tab.match(pathname, userId))?.name || "";

  const standaloneRoutes = ["/wiki", "/forum", "/browse", "/submit-case"];
  const isStandalonePage = standaloneRoutes.some((prefix) => pathname.startsWith(prefix));

  const contentToShow = isStandalonePage ? children : userType === "layman" ? layman : lawyer;
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
          Logout
        </button>
      </div>
      <div className="h-[95vh] w-[90vw] bg-white rounded-xl z-10 ml-[23vw] mr-[20px] border-none">
        {contentToShow}
      </div>
    </div>
  );
}
