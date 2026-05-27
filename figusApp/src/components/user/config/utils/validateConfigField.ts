import { COUNTRIES } from  './../../../../constants/countries';

/**
 * Valida que el nombre tenga al menos dos caracteres.
 */
export const validateName = (value: string): boolean => {
  return value.trim().length >= 2;
};

/**
 * Verifica que el email tenga formato válido.
 */
export const validateEmail = (value: string): boolean => {
  const v = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

/**
 * Valida el formato de teléfono básico con dígitos, espacios y signos.
 */
export const validatePhone = (value: string): boolean => {
  const v = value.trim();
  return /^[+0-9\s-]{7,20}$/.test(v);
};

/**
 * Comprueba que la fecha sea válida y parseable.
 */
export const validateDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

/**
 * Verifica que la nacionalidad exista en la lista de países.
 */
export const validateNationality = (value: string): boolean => {
  return COUNTRIES.some(c => c.code === value);
};

/**
 * Valida que ambas contraseñas coincidan y cumplan requisitos mínimos.
 */
export const validatePasswordPair = (
  password: string,
  confirmPassword: string,
): boolean => {
  return (
    password.length >= 8 &&
    password === confirmPassword &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  );
};