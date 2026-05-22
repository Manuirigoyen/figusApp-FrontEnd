import type { LoginPayload } from '../interfaces/LoginPayload';

export const buildLoginPayload = (
  formData: FormData,
  captchaToken: string,
): LoginPayload => {
  return {
    email: String(formData.get('email')).trim().toLowerCase(),
    password: String(formData.get('password')),
    captcha_token: captchaToken,
  };
};