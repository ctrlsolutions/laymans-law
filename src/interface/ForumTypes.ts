import { Category } from "@/interface/CategoryTypes";

export interface Forum {
  id: number;
  author: {
    first_name: string;
    last_name: string;
  };
  title: string;
  content: string;
  timestamp: string;
  category: Category;
  bookmark: boolean;
}

export interface SideBar {
  selectedCaseType: string;
  setSelectedCaseType: (type: string) => void;
  categories: { id: string; name: string; color: string }[];
}
