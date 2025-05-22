export interface UserType{
  first_name: string;
  last_name: string;
  email: string;
  contact_number?: string;
}
export interface Case {
  id: string;
  title: string;
  category: Category;
  status: string;
  avatar: string;
  description: string;
  case_type: string;
  created_date: string;
  created_by: UserType;
  assigned_to: number | string | null;
  media?: string[];
  files?: string[];
  openCaseCount?: number; 
  user?: { firstName: string; email: string };
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export const categories: Category[] = [];
export const cases: Case[] = [];

export interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  openCaseCount: number;
  user: { firstName: string } | null;
}

export interface CaseFilterButtonProps {
  caseType: string;
  selectedCaseType: string;
  setSelectedCaseType: (caseType: string) => void;
  label: string;
}

export interface SidebarProps {
  selectedCaseType: string;
  setSelectedCaseType: (type: string) => void;
  categories: { id: string; name: string; color: string }[];
  selectedStatus: string | "";
  setSelectedStatus: (status: string | "") => void;
}

export interface LawData {
  id: number;
  title: string;
  chapter: string;
  tags: string[];
  content: string;
  translation: {
    language_tagalog: string;
    language_bisaya: string;
    language_waray: string;
  };
}