import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] =
    useState<
      null | boolean
    >(null);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/v1/auth/validate",
      {
        method: "GET",
        credentials:
          "include",
      }
    )
      .then((res) => {
        setAuth(res.ok);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (auth === null)
    return null;

  if (!auth)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  return <>{children}</>;
}