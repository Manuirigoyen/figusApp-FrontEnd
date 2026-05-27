export type LoggedUser = {
  id: number;
  email: string;
  role: 'user' | 'admin';
  first_name: string;
  last_name: string;
  profile_picture: string | null;
};