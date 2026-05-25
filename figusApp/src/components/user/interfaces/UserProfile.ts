export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  nationality: string;
  phone_number?: string;
  profile_picture?: string;
  role: 'user' | 'admin';
}