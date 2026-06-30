import { createContext, useContext } from "react";
import type { AuthContextType } from "../types/context";

/**
 * Contexto global de autenticación.
 * 
 * Actúa como el canal de comunicación que comparte el estado del usuario,
 * el flujo de carga y el stock de giros entre los componentes.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Hook personalizado para acceder al contexto de autenticación.
 *
 * Facilita el consumo del estado global y sus acciones asociadas (`user`, `logout`, etc.)
 * desde cualquier componente de la interfaz (como la Ruleta o el Header) sin necesidad de pasar props manualmente.
 *
 * @throws {Error} Si el hook se invoca en un componente que no está envuelto por el `AuthProvider`.
 * @returns {AuthContextType} El objeto de contexto con el estado y funciones de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
};