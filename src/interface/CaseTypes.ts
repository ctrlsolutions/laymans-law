// Existing interfaces
export interface Case {
    id: string;
    title: string;
    category: Category;
    status: string;
    avatar: string;
    description: string;
    case_type: string;
    created_date: string;
    created_by: string;
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
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    categories: Category[];
}
