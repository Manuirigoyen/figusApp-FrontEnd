import type { LoginPayload } from '../interfaces/LoginPayload';
import type { LoginResponse } from '../interfaces/LoginResponse';

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Authenticates user with email and password.
 * @param payload User credentials and CAPTCHA token
 * @returns Promise resolving to user data and authentication token
 * @throws Error when authentication fails
 */
export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || 'No fue posible iniciar sesión ahora mismo.',
    );
  }

  return data as LoginResponse;
};