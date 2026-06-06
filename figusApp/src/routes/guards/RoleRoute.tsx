import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

type Role = "admin" | "user";

interface AuthUser {
  role: Role;
}

interface RoleRouteProps {
  children: React.ReactNode;
  role: Role;
}

/**
 * Protege rutas por rol.
 */
export function RoleRoute({ children, role }: RoleRouteProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data: AuthUser = await response.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchUser();
  }, []);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}