export interface Forum {
  id: number;
  author: {
    user_id: number;
    first_name: string;
    last_name: string;
  };
  title: string;
  content: string;
  timestamp: string;
  updated_at: string;
  category: string;
  bookmark: boolean;
  bookmark_count: number;
}

export const cases: Forum[] = [];

export interface SideBar {
  selectedCaseType: string;
  setSelectedCaseType: (type: string) => void;
  categories: { id: string; name: string; color: string }[];
}
