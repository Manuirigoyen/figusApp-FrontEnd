import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

interface RoleRouteProps {
  children: React.ReactNode;
  role: "admin" | "user";
}

/**
 * Guarda de rutas que verifica si un usuario tiene el rol necesario.
 * @param children - Elementos hijos a renderizar si la autorización es exitosa.
 * @param role - El rol requerido ('admin' o 'user') para acceder a esta ruta.
 * @returns El contenido protegido o una redirección si no está autorizado.
 */
export function RoleRoute({ children, role }: RoleRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}