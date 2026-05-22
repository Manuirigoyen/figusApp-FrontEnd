export interface LoginPayload {
  email: string;
  password: string;
  captcha_token: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'user' | 'admin';
    profile_picture?: string;
  };
}