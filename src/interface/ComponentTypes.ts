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
