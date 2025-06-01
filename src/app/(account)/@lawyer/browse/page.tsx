"use client";
import * as React from "react";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case } from "@/interface/CaseTypes";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import Sidebar from "@/components/Cases/Sidebar";
import CaseCard from "@/components/Cases/CaseCard";
import { sortingOptions, categories } from "@/constants/caseConstants";
import { filterCases } from "@/utils/caseFilters";
import { fetchCases } from "@/services/CaseService";
import { useRouter } from "next/navigation";
import { User } from "@/interface/AuthTypes";

const BrowseCasesPage: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");

  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [status, setStatus] = useState<string | "">("all");

  const [user, setUser] = useState<User | null>(null);

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
          console.log('Fetched cases:', response.data);
          setCases(response.data as Case[]);
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

  return (
    <main className="flex flex-col text-black w-full font-[Poppins]" role="main">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={cases.length}
        user={user ? { firstName: user.first_name } : null}
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
                    onClick={() => router.push(`/browse/${caseItem.id}`)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">No cases found</p>
              )}
            </div>
          </div>

          <Sidebar
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

export default BrowseCasesPage;
