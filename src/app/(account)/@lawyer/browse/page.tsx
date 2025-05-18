"use client";

import React, { useEffect, useState } from "react";
import { Case } from "@/interface/CaseTypes";
import { fetchCases } from "@/services/CaseService";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import Sidebar from "@/components/Cases/Sidebar";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import CaseCard from "@/components/Cases/CaseCard";
import { sortingOptions, categories } from "@/constants/caseConstants";
import { filterCases } from "@/utils/caseFilters";

const CasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");

  const [cases, setCases] = useState<Case[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [status, setStatus] = useState<string | "">("all");

  useEffect(() => {
    if (cases.length > 0) {
      const filtered = filterCases(
        cases,
        searchQuery,
        sortOrder,
        selectedCaseType,
        status
      );
      console.log("Filtered cases:", filtered);
      setFilteredCases(filtered);
    }
  }, [cases, searchQuery, selectedCaseType, sortOrder, status]);

  const openCaseCount = filteredCases.filter((c) => c.status === "open").length;

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      const response = await fetchCases();
      if (isMounted) {
        if (response.success && response.data) {
          console.log("Fetched pisti cases:", response.data);
          setCases(response.data);
        } else {
          setCasesError(response.message || "Failed to load cases");
        }
        setCasesLoading(false);
      }
    };

    loadCases();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (isMounted) {
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error("Error fetching user data:", response.message);
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const openModal = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins]"
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={user}
      />

      <section
        className="self-center mt-10 pb-10 w-full max-w-[976px] h-[calc(100vh-40px)] max-h-[65vh] flex flex-row justify-between"
        aria-label="Case listings"
      >
        <div className="flex flex-col gap-2">
          <BaseFormSelect
            label=""
            name="sortOrder"
            value={sortOrder}
            choices={sortingOptions}
            onChange={(e) => setSortOrder(e.target.value)}
            width="130px"
          />
          <div className="flex gap-5 max-md:flex-col pb-5 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div className="w-full max-md:w-full">
              {casesLoading ? (
                <p className="text-center text-gray-500 mt-20">
                  Loading cases...
                </p>
              ) : casesError ? (
                <p className="text-center text-red-500 mt-20">{casesError}</p>
              ) : filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <CaseCard
                    key={caseItem.id}
                    caseItem={caseItem}
                    categories={categories}
                    onClick={() => openModal(caseItem)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  No cases found
                </p>
              )}
            </div>
          </div>
        </div>
        <Sidebar
          selectedCaseType={selectedCaseType}
          setSelectedCaseType={setSelectedCaseType}
          categories={categories}
          selectedStatus={status}
          setSelectedStatus={setStatus}
        />
      </section>
    </main>
  );
};

export default CasePage;
