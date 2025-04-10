// constants/caseFilters.ts
import { Case } from "@/interface/CaseTypes";

export function filterAndSortCases(
  cases: Case[],
  searchQuery: string,
  sortOrder: string,
  selectedCaseType: string,
  selectedCategory: string | null
): Case[] {
  return cases
    .filter((caseItem) => {
      const query = searchQuery.toLowerCase();
      return (
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.description.toLowerCase().includes(query)
      );
    })
    .filter((caseItem) =>
      selectedCaseType === "all"
        ? true
        : caseItem.case_type === selectedCaseType
    )
    .filter((caseItem) =>
      selectedCategory === null
        ? true
        : caseItem.category.name === selectedCategory
    )

    .sort((a, b) => {
      if (sortOrder === "latest") {
        return (
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
        );
      } else if (sortOrder === "oldest") {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        );
      }
      return 0;
    });
}
