import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Role = "admin" | "user";

export function RoleRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/v1/auth/me",
      {
        credentials: "include",
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          setUser(null);
          return;
        }

        const data =
          await res.json();

        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  if (!user)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  if (user.role !== role)
    return (
      <Navigate
        to="/403"
        replace
      />
    );

  return <>{children}</>;
}