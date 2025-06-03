"use client";

import React, { useEffect, useState } from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { getLawyerStatistics } from "@/services/StatisticsServices";
import { LawyerStatisticsData } from "@/interface/AuthTypes";
import { fetchCases } from "@/services/CaseService";
import { getProfile } from "@/services/ProfileServices";
import { Case } from "@/interface/CaseTypes";
import CaseCard from "@/components/Cases/ActiveCaseCard";
import { categories } from "@/constants/caseConstants";

const ActiveCasesContainer = () => {
  const [stats, setStats] = useState<LawyerStatisticsData | null>(null);
  const [cases, setCases] = useState<Case[]>([]);

  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // This only runs on client side
    setUserId(localStorage.getItem("user_id"));
    setUserType(localStorage.getItem("user_type"));
  }, []);

  useEffect(() => {
    if (!userId || !userType) return;

    const fetchData = async () => {
      console.log("Fetching data for userId:", userId, "userType:", userType);

      const [statsRes, userRes] = await Promise.all([
        getLawyerStatistics(),
        getProfile(),
        fetchCases(),
      ]);

      console.log("Stats response:", statsRes);
      console.log("User profile response:", userRes);

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      if (userRes.success) {
        const casesRes = await fetchCases();
        console.log("Cases response:", casesRes);

        if (casesRes.success && Array.isArray(casesRes.data)) {
          let filtered: Case[] = [];

          if (userType === "layman") {
            filtered = casesRes.data.filter(
              (caseItem) =>
                String(caseItem.created_by.user_id) === String(userId)
            );
            setCases(filtered);
          } else if (userType === "lawyer") {
            filtered = casesRes.data.filter(
              (caseItem) =>
                String(caseItem.assigned_to) === String(userId) &&
                caseItem.status.toLowerCase() === "ongoing"
            );
            setCases(filtered);
          }
        }
      }
    };

    fetchData();
  }, [userId, userType]);

  if (userType === "layman") {
    return (
      <div className="w-full h-[87vh] flex flex-col rounded-3xl p-[1.5rem]">
        {/* Header */}
        <div className="flex justify-between  items-center pl-[.5rem] mb-1">
          <div className="flex items-center gap-3 p-[.25rem]">
            <BsFillBriefcaseFill className="w-7 h-7 text-red" />
            <h1 className="text-2xl font-bold text-black">Submitted Cases</h1>
          </div>
          <p className="font-bold text-4xl  pr-[.5rem] text-red">
            {cases.length}
          </p>
        </div>

        {/* Case Cards */}
        <div className="overflow-y-auto max-h-[100vh] p-5">
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
            <p className="text-center text-gray-500">No submitted cases</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[50vh] flex flex-col rounded-3xl p-[1.25rem]">
        {/* Header */}
        <div className="flex justify-between items-center pl-[.5rem] mb-1">
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
  }
};

export default ActiveCasesContainer;
