import type { UserConfig } from '../config/interfaces/UserConfig';

const API_BASE = import.meta.env.VITE_API_BASE;

export type LoggedUser = Pick<
  UserConfig,
  | 'id'
  | 'email'
  | 'first_name'
  | 'last_name'
  | 'profile_picture'
> & {
  role: 'user' | 'admin';
};

/**
 * Obtiene el usuario autenticado.
 */
export const getAuthenticatedUser =
  async (): Promise<LoggedUser> => {
    const response = await fetch(
      `${API_BASE}/auth/me`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        'No se pudo obtener el usuario autenticado',
      );
    }

    return (await response.json()) as LoggedUser;
  };

/**
 * Cierra sesión del usuario.
 */
export const logout =
  async (): Promise<void> => {
    const response = await fetch(
      `${API_BASE}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        'No se pudo cerrar sesión',
      );
    }
  };