import { createContext, useContext, useEffect, useState } from "react";
import { getUserSpinsWallet } from '../components/rulet/service/walletService'; 

const API_BASE = import.meta.env.VITE_API_BASE;

export interface AuthUser {
  id: number;
  role: "admin" | "user";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  spins: number;
  refreshSpins: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spins, setSpins] = useState(0);

  const refreshSpins = async () => {
    if (user?.id) {
      try {
        const wallet = await getUserSpinsWallet(user.id);
        setSpins(wallet?.stock ?? 0);
      } catch (error) {
        console.error("Error al refrescar giros:", error);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
        if (response.ok && isMounted) {
          const data: AuthUser = await response.json();
          setUser(data);
        }
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void fetchUser();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (user) {
      refreshSpins();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, spins, refreshSpins }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};