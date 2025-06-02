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
            path: (id: string) => `/${id}/submitted-cases`,
            matchNested: true
          },
          { key: "wiki", name: "Wiki", path: () => `/wiki` },
          { key: "forum", name: "Forum", path: () => `/forum` },
          {
            key: "ofw-support",
            name: "OFW Support",
            path: () => `/wiki/ofw-support`,
          },
          {
            key: "settings",
            name: "Settings",
            path: (id: string) => `/${id}/settings`,
            matchNested: true,
          },
        ]
      : [
          { key: "home", name: "Home", path: (id: string) => `/${id}` },
          { key: "browse", name: "Browse Cases", path: () => `/browse`,  matchNested: true},
          {
            key: "active",
            name: "Active Cases",
            path: (id: string) => `/${id}/active-cases`,
            matchNested: true
          },
          { key: "wiki", name: "Wiki", path: () => `/wiki` },
          { key: "forum", name: "Forum", path: () => `/forum` },
          {
            key: "settings",
            name: "Settings",
            path: (id: string) => `/${id}/settings`,
            matchNested: true,
          },
          {
            key: "ofw-support",
            name: "OFW Support",
            path: () => `/wiki/ofw-support`,
          },
        ];

  const activeTab = tabs.find((tab) => {
    const tabPath = tab.path(userId);
    return tab.matchNested ? pathname.startsWith(tabPath) : pathname === tabPath;
  })?.name || "";

  let contentToShow;
  const standaloneRoutes = ["/wiki", "/forum"];
  const isStandalonePage = standaloneRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isStandalonePage) {
    contentToShow = children;
  } else {
    contentToShow = userType === "layman" ? layman : lawyer;
  }

  const sidebarBg = userType === "lawyer" ? "bg-blue/60" : "bg-red/60";

  return (
    <div
      className="flex h-screen items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url("/bg-base.png")` }}
    >
      <div
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-[88vh] w-[22vw] ${sidebarBg} ml-8 p-6 pl-0 rounded-3xl flex flex-col justify-between font-extrabold`}
      >
        <img src="/logo.png" alt="Logo" className="max-w-full h-auto m-10" />
        <div className="flex flex-col text-center pb-[10vh] text-[1.1rem]">
          {tabs.map((tab, index) => (
            <Link
              href={tab.path(userId)}
              key={index}
              className={`w-full h-[5vh] p-6 hover:text-xl transition-all duration-350 ease-in-out flex items-center justify-center ml-4 rounded-l-3xl ${
                activeTab === tab.name
                  ? "bg-white text-black text-[1.3rem]"
                  : "bg-transparent text-white hover:bg-white hover:text-black hover:font-bold hover:shadow-lg"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <button
          className="text-[1.1rem] ml-4 hover:text-xl hover:font-bold hover"
          onClick={handleLogout}
        >
          {" "}
          Logout
        </button>
      </div>
      <div className="h-[95vh] w-[90vw] bg-white rounded-xl z-10 ml-[23vw] mr-[20px] border-none">
        {contentToShow}
      </div>
    </div>
  );
}
