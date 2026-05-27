/**
 * Construye el payload de registro a partir del formulario y el token CAPTCHA.
 */
import type { RegisterPayload }
  from '../interfaces/RegisterPayload';

export const buildRegisterPayload = (
  /** Datos del formulario de registro. */
  formData: FormData,
  /** Token generado por el servicio CAPTCHA. */
  captchaToken: string,
): FormData => {

  const payload: RegisterPayload = {
    first_name: String(
      formData.get('first_name'),
    ).trim(),

    last_name: String(
      formData.get('last_name'),
    ).trim(),

    date_of_birth: String(
      formData.get('date_of_birth'),
    ),

    nationality: String(
      formData.get('country'),
    ),

    email: String(
      formData.get('email'),
    )
      .trim()
      .toLowerCase(),

    password: String(
      formData.get('password'),
    ),
  };

  const phoneNumber = String(
    formData.get('phone_number'),
  ).trim();

  if (phoneNumber) {
    payload.phone_number = phoneNumber;
  }

  const body = new FormData();

  body.append(
    'captcha_token',
    captchaToken,
  );

  Object.entries(payload).forEach(
    ([key, value]) => {
      body.append(key, value);
    },
  );

  const profilePicture =
    formData.get('profile_picture');

  if (
    profilePicture instanceof File &&
    profilePicture.size > 0
  ) {
    body.append(
      'profile_picture',
      profilePicture,
    );
  }

  return body;
};