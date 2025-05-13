// utils/filterCases.ts

import { Case } from "@/interface/CaseTypes";

export function filterCases(
  cases: Case[],
  searchQuery: string,
  selectedCaseType: string,
  selectedCategory: string | null
): Case[] {
  const query = searchQuery.toLowerCase();

  return cases.filter((caseItem) => {
    const matchesCaseType =
      selectedCaseType === "all"
        ? true
        : selectedCaseType === "open"
        ? caseItem.status.toLowerCase() === "open"
        : selectedCaseType === "closed"
        ? caseItem.status.toLowerCase() === "closed"
        : false;

    const matchesCategory =
      selectedCategory === null || caseItem.category.name === selectedCategory;

    const matchesSearch =
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.category.name.toLowerCase().includes(query);

    return matchesCaseType && matchesCategory && matchesSearch;
  });
}
