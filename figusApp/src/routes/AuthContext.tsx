import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUserSpinsWallet } from '../components/rulet/service/walletService';

const API_BASE = import.meta.env.VITE_API_BASE;

export interface AuthUser {
  id: number;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  spins: number;
  login: (user: AuthUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  refreshSpins: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spins, setSpins] = useState(0);

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        setSpins(0);
        return;
      }

      const data = (await response.json()) as AuthUser;

      setUser({
        id: data.id,
        role: data.role,
      });
    } catch {
      setUser(null);
      setSpins(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSpins = useCallback(async (): Promise<void> => {
    if (!user?.id) {
      setSpins(0);
      return;
    }

    try {
      const wallet = await getUserSpinsWallet(user.id);
      setSpins(wallet?.stock ?? 0);
    } catch (error) {
      console.error('Error al refrescar giros:', error);
      setSpins(0);
    }
  }, [user?.id]);

  const login = useCallback((loggedUser: AuthUser): void => {
    setUser({
      id: loggedUser.id,
      role: loggedUser.role,
    });
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setSpins(0);
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    void refreshSpins();
  }, [refreshSpins]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        spins,
        login,
        logout,
        refreshUser,
        refreshSpins,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
};