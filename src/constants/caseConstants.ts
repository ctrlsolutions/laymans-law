import { Category } from "@/interface/CaseTypes";

export const sortingOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];

export const categories: Category[] = [
  { id: "family", name: "Family Law", color: "bg-yellow-400" },
  { id: "criminal", name: "Criminal Law", color: "bg-lime-400" },
  { id: "labor", name: "Labor Law", color: "bg-teal-400" },
  { id: "civil", name: "Civil Law", color: "bg-blue" },
  {
    id: "commercial",
    name: "Commercial and Business Law",
    color: "bg-fuchsia-600",
  },
  { id: "other", name: "Others", color: "bg-pink-600" },
];

export const wikiLaw: Category[] = [
  { id: "family", name: "Family Law", color: "bg-yellow-500" },
  { id: "criminal", name: "Criminal Law", color: "bg-lime-700" },
  { id: "labor", name: "Labor Law", color: "bg-teal-500" },
  { id: "civil", name: "Civil Law", color: "bg-blue" },
  {
    id: "commercial",
    name: "Commercial and Business Law",
    color: "bg-fuchsia-800",
  },
  { id: "other", name: "Others", color: "bg-pink-800" },
];
