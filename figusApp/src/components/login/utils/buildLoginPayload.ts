/**
 * Construye el payload de inicio de sesión desde el formulario y el token CAPTCHA.
 */
import type { LoginPayload } from '../interfaces/LoginPayload';

export const buildLoginPayload = (
  /** Datos del formulario de ingreso. */
  formData: FormData,
  /** Token generado por el servicio CAPTCHA. */
  captchaToken: string,
): LoginPayload => {
  return {
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    password: String(formData.get('password') ?? ''),
    captcha_token: captchaToken,
  };
};