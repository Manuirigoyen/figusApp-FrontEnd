const API_BASE =
  import.meta.env.VITE_API_BASE;

/**
 * Registra un nuevo usuario en el sistema.
 *
 * Envía los datos del formulario junto
 * al token CAPTCHA utilizando FormData.
 *
 * @param payload Datos multipart del registro.
 *
 * @returns Promise resuelta cuando el registro finaliza.
 *
 * @throws Error cuando el backend responde con error.
 */
export const registerUser = async (
  payload: FormData,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE}/users`,
    {
      method: 'POST',
      credentials: 'include',
      body: payload,
    },
  );

  if (!response.ok) {
    let message =
      'No fue posible crear la cuenta ahora mismo.';

    try {
      const error =
        (await response.json()) as {
          message?: string;
        };

      message =
        error.message ??
        message;
    } catch {
      
    }

    throw new Error(message);
  }
};