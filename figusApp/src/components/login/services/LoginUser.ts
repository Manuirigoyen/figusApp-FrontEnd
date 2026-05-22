import type { LoginPayload, LoginResponse } from '../interfaces/LoginPayload';

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await fetch(
    'http://localhost:3000/api/v1/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || 'Email o contraseña incorrectos.'
    );
  }

  return response.json();
};