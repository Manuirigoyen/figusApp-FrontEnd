import type { UpdateUserPayload } from '../interfaces/UpdateUserPayload';

/**
 * Normaliza un valor de campo antes de enviarlo al backend.
 * - `email`: trim + lowercase
 * - `nationality`: trim + uppercase
 * - `date_of_birth`: se mantiene tal cual
 * - otros: trim
 */
export const normalizeValue = (
  field: keyof UpdateUserPayload,
  value: string,
): string => {
  switch (field) {
    case 'email':
      return value.trim().toLowerCase();

    case 'nationality':
      return value.trim().toUpperCase();

    case 'date_of_birth':
      return value;

    default:
      return value.trim();
  }
};