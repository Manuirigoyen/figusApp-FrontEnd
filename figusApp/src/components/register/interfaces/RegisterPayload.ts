export interface RegisterPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone_number?: string;
  password: string;
}