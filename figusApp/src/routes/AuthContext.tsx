/**
 * Contexto global de autenticación.
 *
 * Permite compartir el estado y acciones relacionadas con el usuario
 * autenticado entre los componentes de la aplicación.
 */

import { createContext } from "react";
import type { AuthContextType } from "./types/types";

/**
 * Contexto de autenticación con tipado seguro.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);