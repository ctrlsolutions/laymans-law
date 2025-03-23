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
        <div className="w-full h-full bg-blue flex flex-col flex-wrap justify-between content-between">
          LAYMAN page
          {details}
          {notifications}
          {submitted_cases}
        </div>
      ) : ( 
        children
      )
    }
    </div>
  )
}