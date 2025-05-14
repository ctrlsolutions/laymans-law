export interface ForumPost {
  id: number;
  author: {
    first_name: string;
    last_name: string;
  };
  title: string;
  content: string;
  timestamp: string;
  category: string;
  bookmark: boolean;
}
