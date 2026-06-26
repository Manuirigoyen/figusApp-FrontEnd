/**
 * Hook personalizado para acceder al contexto de autenticación.
 *
 * Permite consumir los datos y funciones del AuthProvider
 * desde cualquier componente de la aplicación.
 */

import { useContext } from "react";
import { AuthContext } from "../AuthContext";

/**
 * Obtiene el estado global de autenticación.
 *
 * @throws Error si se utiliza fuera de un AuthProvider.
 * @returns Datos y funciones del contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
};