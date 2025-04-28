import { Case } from "@/interface/CaseTypes";

export function filterCases(
  cases: Case[],
  searchQuery: string,
  sortOrder: string,
  selectedCaseType: string,
  status: string | ""
): Case[] {
  return cases
    .filter((caseItem) => {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.description.toLowerCase().includes(query) ||
        caseItem.case_type.toLowerCase().includes(query) ||
        caseItem.status.toLowerCase().includes(query);

      const matchesCaseType =
        !selectedCaseType || selectedCaseType === "all"
          ? true
          : caseItem.case_type.toLowerCase() === selectedCaseType.toLowerCase();

      const matchesStatus =
        !status || status === "all"
          ? true
          : caseItem.status.toLowerCase() === status.toLowerCase();

      return matchesQuery && matchesCaseType && matchesStatus;
    })
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
