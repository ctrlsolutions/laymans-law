import { Category } from "@/interface/CaseTypes";

export const sortingOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];

export const categories: Category[] = [
  { id: "family", name: "Family Law", color: "yellow" },
  { id: "criminal", name: "Criminal Law", color: "lime" },
  { id: "labor", name: "Labor Law", color: "teal" },
  { id: "civil", name: "Civil Law", color: "blue" },
  { id: "commercial", name: "Commercial and Business Law", color: "fuchsia" },
  { id: "other", name: "Others", color: "pink" },
];
