export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  color?: string;
  icon?: string;
  width?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

export interface FormSelectProps {
  label: string;
  name: string;
  color?: string;
  width?: string;
  height?: string;
  textSize?: string;
  value: string;
  choices: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormButtonProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  width?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface SubmitCaseFormData {
  title: string;
  legalTopic: string;
  caseType: string;
  details: string;
  file: File | null;
}

export interface Comment {
  id: number;
  post: number;
  author: number;
  author_username: string;
  content: string;
  created_at: string;
  updated_at: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: number;
  author_username: string;
  content: string;
  created_at: string;
}
