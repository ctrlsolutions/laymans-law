"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LawyerDetails from "@/app/(account)/@lawyer/[user_id]/@details/page";
import LawyerNotifs from "@/app/(account)/@lawyer/[user_id]/@notifications/page";
import LawyerCases from "@/app/(account)/@lawyer/[user_id]/@active_cases/page";
import LawyerStats from "@/app/(account)/@lawyer/[user_id]/@stats/page";

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

  const lastSegment = ["settings", "active-cases"].some((segment) =>
    pathname.includes(segment)
  );
  console.log("Current Path:", lastSegment);
  console.log("Details Component:", lawyer);

  return (
    <div>
      {userType === "lawyer" ? lawyer : layman}
      {!lastSegment ? (
        <div className="grid grid-cols-2 gap-4 px-6 py-10">
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
