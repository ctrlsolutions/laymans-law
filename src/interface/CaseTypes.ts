export interface UserType {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number?: string;
}

export interface CaseAttachment {
  id: string;
  file: string;
  description: string;
  uploaded_at: string;
}
export interface Case {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: string;
  case_type: string;
  created_date: string;
  created_by: UserType;
  created_by_id: string;
  assigned_to: UserType | null;
  openCaseCount?: number;
  user?: { firstName: string; email: string };
  image: string | null;
  document: string | null;
  video: string | null;
  attachments: CaseAttachment[];

  avatar: string;
  media?: string[];
  files?: string[];
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
  code: string;
  full_law: string;
  case_type: string;
  tags: string | string[];
  summary?: {
    summary: string;
  };
  translation?: {
    language_tagalog: string;
    language_bisaya: string;
    language_waray: string;
    language_chavacano?: string;
  };
}
export interface SubmitCaseFormData {
  title: string;
  case_type: string;
  description: string;
}
