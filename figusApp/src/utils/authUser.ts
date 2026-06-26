/**
 * Configuración base de la API y definición del modelo
 * de usuario autenticado utilizado en la aplicación.
 */

export const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Representa la información básica del usuario autenticado.
 */
export interface authUser {
  id: number;
  role: "admin" | "user";
}