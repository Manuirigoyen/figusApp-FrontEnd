import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Protege rutas autenticadas.
 * Usa /auth/validate como verificación de sesión.
 */
export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/validate`, {
          method: "GET",
          credentials: "include",
        });

        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    void validateSession();
  }, []);

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}