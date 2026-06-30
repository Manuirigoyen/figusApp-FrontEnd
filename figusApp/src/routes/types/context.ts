/**
 * Representa la información básica del usuario autenticado.
 */
export interface authUser {
  id: number;
  role: "admin" | "user";
}

/**
 * Contexto de autenticación utilizado para compartir datos 
 * de la sesión entre componentes.
 */
export interface AuthContextType {
  /** Usuario actualmente autenticado. */
  user: authUser | null;

  /** Indica si se está cargando información de la sesión. */
  loading: boolean;

  /** Cantidad de giros disponibles del usuario. */
  spins: number;

  /** Actualiza la información del usuario autenticado. */
  refreshUser: () => Promise<void>;

  /** Actualiza la cantidad de giros disponibles. */
  refreshSpins: () => Promise<void>;

  /** Cierra la sesión actual y limpia el estado. */
  logout: () => void;
}