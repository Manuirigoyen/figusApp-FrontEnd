/**
 * Respuesta esperada del backend al iniciar sesión.
 */
export interface LoginResponse {
  /** Token JWT o similar usado para autenticar al usuario. */
  access_token: string;

  /** Información básica del usuario autenticado. */
  user: {
    /** Identificador numérico del usuario. */
    id: number;
    /** Correo electrónico del usuario. */
    email: string;
    /** Rol asignado al usuario en la aplicación. */
    role: 'admin' | 'user';
  };
}