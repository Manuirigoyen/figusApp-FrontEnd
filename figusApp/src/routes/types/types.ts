/**
 * Definición del tipo del contexto de autenticación.
 *
 * Contiene la información del usuario autenticado,
 * estados globales y funciones relacionadas con la sesión.
 */

import type { authUser } from "../../utils/authUser";

/**
 * Contrato del contexto de autenticación utilizado
 * para compartir datos entre componentes.
 */
export interface AuthContextType {
  /** Usuario actualmente autenticado. */
  user: authUser | null;

  /** Indica si se está cargando información de autenticación. */
  loading: boolean;

  /** Cantidad de giros disponibles del usuario. */
  spins: number;

  /** Actualiza la información del usuario autenticado. */
  refreshUser: () => Promise<void>;

  /** Actualiza la cantidad de giros disponibles. */
  refreshSpins: () => Promise<void>;

  /** Cierra la sesión actual. */
  logout: () => void;
}