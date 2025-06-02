"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function LaymanHomePage({
  children,
  details,
  notifications,
  submitted_cases,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  notifications: React.ReactNode;
  submitted_cases: React.ReactNode;
}) {
  const pathName = usePathname();
  const isSettingsPage = pathName.includes("settings");
  const isCasesPage = pathName.includes("submitted-cases");
  console.log("Current Path:", usePathname());

  return (
    <div>
      {isSettingsPage || isCasesPage ? (
        children
      ) : (
        <div className="grid grid-cols-2 gap-4 px-6 py-10">
          <div className="flex flex-col space-y-4">
            {details}
            {notifications}
          </div>
          <div className="row-span-2 h-full">{submitted_cases}</div>
        </div>
      )}
    </div>
  );
}
