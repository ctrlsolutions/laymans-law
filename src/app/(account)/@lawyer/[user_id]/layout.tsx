"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LawyerDetails from "@/app/(account)/@lawyer/[user_id]/@details/page";
import LawyerNotifs from "@/app/(account)/@lawyer/[user_id]/@notifications/page";
import LawyerCases from "@/app/(account)/@lawyer/[user_id]/@active_cases/page";
import LawyerStats from "@/app/(account)/@lawyer/[user_id]/@stats/page";

export default function LawyerHomePage({
  children,
  details,
  notifications,
  active_cases,
  stats,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  notifications: React.ReactNode;
  active_cases: React.ReactNode;
  stats: React.ReactNode;
}) {
  const pathName = usePathname();

  const lastSegment = ["settings", "active-cases"].some((segment) =>
    pathName.includes(segment)
  );
  console.log("Current Path:", lastSegment);
  console.log("Details Component:", details);

  return (
    <div>
      {!lastSegment ? (
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-4">
            <LawyerDetails />
            <LawyerStats />
          </div>
          <div className="flex flex-col gap-4">
            <LawyerNotifs />
            <LawyerCases />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
