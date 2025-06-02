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

export interface FormSelectChoice {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  label: string;
  name: string;
  color?: string;
  width?: string;
  height?: string;
  textSize?: string;
  value: string;
  choices: FormSelectChoice[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormButtonProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  textSize?: string;
  width?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
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
  replies?: Reply[];
}
