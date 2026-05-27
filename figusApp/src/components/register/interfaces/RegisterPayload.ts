/**
 * Datos necesarios para registrar un nuevo usuario.
 */
export interface RegisterPayload {
  /** Nombre de pila del nuevo usuario. */
  first_name: string;
  /** Apellido del nuevo usuario. */
  last_name: string;
  /** Fecha de nacimiento del nuevo usuario. */
  date_of_birth: string;
  /** Nacionalidad del nuevo usuario. */
  nationality: string;
  /** Correo electrónico del nuevo usuario. */
  email: string;
  /** Teléfono de contacto opcional. */
  phone_number?: string;
  /** Contraseña para la cuenta. */
  password: string;
}