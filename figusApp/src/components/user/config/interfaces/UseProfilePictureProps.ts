/**
 * Tipos utilizados para la gestión de la imagen de perfil del usuario.
 *
 * Define las propiedades necesarias para actualizar la información
 * del usuario desde los hooks relacionados con el perfil.
 */

import type { Dispatch, SetStateAction } from "react";
import type { UserConfig } from "../types/UserConfig";

/**
 * Propiedades requeridas para manejar la foto de perfil.
 */
export type UseProfilePictureProps = {
  /** Datos actuales de configuración del usuario. */
  user: UserConfig;

  /** Función para actualizar el estado del usuario. */
  setUser: Dispatch<SetStateAction<UserConfig | null>>;
};