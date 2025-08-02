export interface UserData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  date_of_birth?: string;
  address?: string;
  enrollment_date: string;
  roles?: ("admin" | "user")[];
  status: "active" | "inactive";
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserInput {
  name: string;
  avatar?: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  date_of_birth?: string;
  address?: string;
  enrollment_date: string;
  roles?: ("admin" | "user")[];
  status: "active" | "inactive";
}

export interface LoginData {
  accessToken: string;
  user: UserData;
  expiredAt?: number;
}
