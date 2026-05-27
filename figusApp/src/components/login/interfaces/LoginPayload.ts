/**
 * Datos necesarios para iniciar sesión en la aplicación.
 */
export interface LoginPayload {
  /** Correo electrónico del usuario. */
  email: string;
  /** Contraseña asociada al usuario. */
  password: string;
  /** Token CAPTCHA para validar la acción. */
  captcha_token: string;
}