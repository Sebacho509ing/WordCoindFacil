import { User } from 'firebase/auth';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

export interface FormInputs {
  email: string;
  password: string;
  username?: string;
}

export interface AuthError {
  code: string;
  message: string;
}