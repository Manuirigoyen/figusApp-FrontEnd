import type { UserConfig } from '../config/types/UserConfig';

const API_BASE =
  import.meta.env.VITE_API_BASE;

/**
 * Usuario autenticado del sistema.
 */
export type LoggedUser = UserConfig;

/**
 * Obtiene el usuario autenticado actual.
 *
 * Realiza una petición autenticada utilizando
 * cookies de sesión HTTP.
 *
 * @returns Datos completos del usuario autenticado.
 * @throws Error cuando la sesión es inválida
 * o la petición falla.
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
 * Finaliza la sesión del usuario actual.
 *
 * Elimina la sesión autenticada del backend.
 *
 * @returns Promise de finalización.
 * @throws Error cuando el logout falla.
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