const API_BASE =
  import.meta.env.VITE_API_BASE;

/**
 * Registers a new user in the system.
 * Sends form data and CAPTCHA token as multipart FormData.
 * @param payload Multipart form data containing user registration details
 * @returns Promise resolving when registration completes successfully
 * @throws Error when backend responds with an error
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
      // Silent catch for JSON parse errors
    }

    throw new Error(message);
  }
};