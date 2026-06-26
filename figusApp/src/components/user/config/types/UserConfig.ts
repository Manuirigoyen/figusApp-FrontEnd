/**
 * Representa el usuario autenticado del sistema.
 *
 * Centraliza toda la información necesaria para:
 * - autenticación
 * - autorización
 * - configuración de cuenta
 * - perfil de usuario
 * - renderizado de UI
 */
export type UserConfig = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'user' | 'admin';
  profile_picture: string | null;
  phone_number: string;
  nationality: string;
  date_of_birth: string;
};

