/**
 * Envía datos de registro al backend para crear un nuevo usuario.
 */
export const registerUser = async (
  /** FormData con los campos del registro y CAPTCHA. */
  payload: FormData,
): Promise<void> => {
  const response = await fetch(
    'http://localhost:3000/api/v1/users',
    {
      method: 'POST',
      credentials: 'include',
      body: payload,
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message ||
        'No fue posible crear la cuenta ahora mismo.',
    );
  }
};