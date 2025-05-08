"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Profile", path: "profile" },
  { name: "Security", path: "security" },
  { name: "Notifications", path: "notifications" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop(); // Get active tab from URL

  return (
    <div className="">
      {/* Tab Navigation */}
      <div className="relative flex ml-3 z-0">
        {tabs.map((tab, index) => (
          <Link
            key={tab.path}
            href={`/dashboard/settings/${tab.path}`}
            className={`px-8 py-3 font-semibold z-0 -ml-3 transition-all rounded-t-xl ${
              currentTab === tab.path
                ? "bg-[#120a3a] text-white"
                : "bg-white text-black border"
            } ${index === 0 ? `z-${5 - index}` : ""}`}
            style={{
              boxShadow:
                currentTab === tab.path ? "0 4px 6px rgba(0,0,0,0.1)" : "",
              zIndex: tabs.length - index,
            }}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Render active tab content */}
      <div className="relative z-1 -mt-1 border-2 bg-white p-0 rounded-b-3xl rounded-tr-3xl">
        {children}
      </div>
    </div>
  );
}
