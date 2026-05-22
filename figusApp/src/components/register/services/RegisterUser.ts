export const registerUser = async (
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