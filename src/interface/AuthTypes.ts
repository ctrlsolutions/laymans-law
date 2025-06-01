export interface LoginData {
  email: string;
  password: string;
  [key: string]: string;
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  gender: string;
  birth_date: string;
  password: string;
  confirm_password: string;
  user_type: string;
  roll_number?: string;
  roll_signed_date?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  [key: string]: any;
}

export interface ProfileSettingsData {
  first_name: string;
  last_name: string;
  contact_number?: string;
  gender?: string;
  birth_date?: string;
  user_type?: string;
  roll_number?: string;
  roll_signed_date?: string;
}

export interface PasswordChangeData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_number?: string;
  gender?: string;
  birth_date?: string;
  user_type: string;
  roll_number?: string;
  roll_signed_date?: string;
}
