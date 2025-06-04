"use client";
import * as React from "react";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case } from "@/interface/CaseTypes";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import ActiveCasesSidebar from "@/components/Cases/ActiveCasesSidebar";
import CaseCard from "@/components/Cases/CaseCard";
import { sortingOptions, categories } from "@/constants/caseConstants";
import { fetchCases } from "@/services/CaseService";
import { useRouter, useParams } from "next/navigation";
import { User } from "@/interface/AuthTypes";
import { filterCases } from "@/utils/caseFilters";

const placeholderSuggestions = [
  "Search your accepted cases...",
  "Search by case status: open, closed, ongoing, discarded...",
  "Search by case type: family law, criminal law...",
  "Search by case title or description...",
];

const ActiveCasesPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.user_id as string;

  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");
  const [status, setStatus] = useState<string | "">("all");

  const openCaseCount = filteredCases.filter(
    (c) => c.status === "ongoing"
  ).length;

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

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      const response = await fetchCases();
      if (isMounted) {
        if (response.success && response.data) {
          const allCases = response.data as Case[];
          const openAndClosedCases = allCases.filter(
            (c) => c.status === "ongoing" || c.status === "closed"
          );
          setCases(openAndClosedCases);
        } else {
          setError(response.message || "Failed to load cases");
        }
        setLoading(false);
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
          setUser(response.data as User);
        } else {
          console.error("Error fetching user data:", response.message);
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholderSuggestions.length;
      setPlaceholderText(placeholderSuggestions[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const [placeholderText, setPlaceholderText] = useState(
    placeholderSuggestions[0]
  );

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins]"
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={user ? { firstName: user.first_name } : null}
        placeholderText={placeholderText}
      />

      <section
        className="self-center mt-10 pb-10 w-full h-[75vh] max-w-[976px] flex gap-5 max-md:flex-col"
        aria-label="Case listings"
      >
        <div className="flex gap-5 max-md:flex-col pb-5 w-full">
          <div className="w-[90%] max-md:w-full flex flex-col p-0">
            <div className="mb-4">
              <BaseFormSelect
                label=""
                name="sortOrder"
                value={sortOrder}
                choices={sortingOptions}
                onChange={(e) => setSortOrder(e.target.value)}
                width="150px"
                textSize="text-xs"
              />
            </div>

            <div className="overflow-y-auto max-h-[calc(75vh-3rem)] pr-1">
              {loading ? (
                <p className="text-center text-gray-500 mt-20">
                  Loading cases...
                </p>
              ) : error ? (
                <p className="text-center text-red-500 mt-20">{error}</p>
              ) : filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <CaseCard
                    key={caseItem.id}
                    caseItem={caseItem}
                    categories={categories}
                    onClick={() =>
                      router.push(`/${userId}/active-cases/${caseItem.id}/`)
                    }
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  No cases found
                </p>
              )}
            </div>
          </div>

          <ActiveCasesSidebar
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            categories={categories}
            selectedStatus={status}
            setSelectedStatus={setStatus}
          />
        </div>
      </section>
    </main>
  );
};

export default ActiveCasesPage;
