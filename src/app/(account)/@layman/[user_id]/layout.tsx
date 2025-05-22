"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
  const isCasesPage = pathName.includes("case");
  console.log("Current Path:", usePathname());

  return (
    <div>
      {!isSettingsPage ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            {details}
            {notifications}
          </div>
        
          <div className="row-span-2 h-full">
            {submitted_cases}
          </div>
        </div>
      ) : ( 
        children
      )
    }
    </div>
  )
}