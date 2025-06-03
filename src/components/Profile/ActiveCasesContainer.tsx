"use client";

import React, { useEffect, useState } from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { getLawyerStatistics } from "@/services/StatisticsServices";
import { LawyerStatisticsData, User } from "@/interface/AuthTypes";
import { fetchCases } from "@/services/CaseService";
import { getProfile } from "@/services/ProfileServices";
import { Case } from "@/interface/CaseTypes";
import CaseCard from "@/components/Cases/ActiveCaseCard";
import { categories } from "@/constants/caseConstants";

const LawyerDashboardStats = () => {
  const [stats, setStats] = useState<LawyerStatisticsData | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, userRes, casesRes] = await Promise.all([
        getLawyerStatistics(),
        getProfile(),
        fetchCases(),
      ]);

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      if (userRes.success && userRes.data) {
        const userData = userRes.data;
        setUser(userData);

        const casesRes = await fetchCases();
        console.log("Fetched cases:", casesRes);

        if (casesRes.success && Array.isArray(casesRes.data)) {
          const filtered = (casesRes.data as Case[]).filter(
            (caseItem: Case) => {
              console.log("User ID:", userId);
              console.log("Case ID:", caseItem.id);
              console.log("Case assigned_to:", caseItem.assigned_to);
              console.log("Case status:", caseItem.status);

              return (
                String(caseItem.assigned_to) === String(userId) &&
                caseItem.status.toLowerCase() === "ongoing"
              );
            }
          );

          console.log("Filtered cases:", filtered);
          setCases(filtered);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col rounded-3xl p-[1.25rem]">
      {/* Header */}
      <div className="flex justify-between items-center pl-[.5rem] mb-2">
        <div className="flex items-center gap-3 p-[.25rem]">
          <BsFillBriefcaseFill className="w-7 h-7 text-blue" />
          <h1 className="text-2xl font-bold text-black">Active Cases</h1>
        </div>
        <p className="font-bold text-4xl pr-[.5rem] text-blue">
          {stats?.cases_active ?? 0}
        </p>
      </div>

      {/* Case Cards */}
      <div className="overflow-y-auto max-h-[50vh] p-5">
        {cases.length > 0 ? (
          cases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              categories={categories}
              onClick={() => console.log("Clicked case:", caseItem.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No active cases</p>
        )}
      </div>
    </div>
  );
};

export default LawyerDashboardStats;
