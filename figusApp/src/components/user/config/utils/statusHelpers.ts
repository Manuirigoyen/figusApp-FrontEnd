/**
 * Extrae un mensaje legible de un `Error` o devuelve el texto por defecto.
 */
export const getErrorMessage = (
  error: unknown,
  fallback = 'Ocurrió un error',
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

/**
 * Ejecuta un callback y devuelve el id del timer para su posible cancelación.
 */
export const withAutoClear = (
  callback: () => void,
  timeout = 2500,
): number => {
  return window.setTimeout(callback, timeout);
};