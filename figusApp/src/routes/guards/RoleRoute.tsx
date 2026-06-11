import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface RoleRouteProps {
  children: React.ReactNode;
  role: "admin" | "user";
}

/**
 * Guarda de rutas que verifica si un usuario tiene el rol necesario.
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