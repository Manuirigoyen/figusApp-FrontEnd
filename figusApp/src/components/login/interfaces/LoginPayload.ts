export interface LoginPayload {
  email: string;
  password: string;
  captcha_token: string;
}

// El back ya NO devuelve access_token, solo el user o un mensaje
export interface LoginResponse {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'user' | 'admin';
    profile_picture?: string;
  };
  message?: string;
}