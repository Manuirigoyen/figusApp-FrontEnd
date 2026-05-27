/**
 * Datos de configuración del perfil de usuario.
 */
export interface UserConfig {
  /** Identificador numérico único del usuario. */
  id: number;
  /** Nombre de pila del usuario. */
  first_name: string;
  /** Apellido del usuario. */
  last_name: string;
  /** Fecha de nacimiento en formato ISO o cadena legible. */
  date_of_birth: string;
  /** Nacionalidad del usuario. */
  nationality: string;
  /** Correo electrónico de contacto. */
  email: string;
  /** Teléfono de contacto. */
  phone_number: string;
  /** URL o ruta de la foto de perfil; puede ser nula o no estar presente. */
  profile_picture?: string | null;
}

