import { useCallback, useEffect, useState } from 'react';
import { getUserSpinsWallet } from '../../components/rulet/service/walletService';
import { API_BASE, type authUser } from '../../utils/authUser';
import { AuthContext } from '../AuthContext';

/**
 * Componente raíz de la aplicación que renderiza la estructura principal del layout.
 * Proporciona la arquitectura general con encabezado, rutas principales y pie de página.
 * @returns Componente de React que renderiza el layout de la aplicación con Header, AppRoutes y Footer
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<authUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spins, setSpins] = useState(0);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
      const data = response.ok ? await response.json() : null;
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const userId = user?.id;

  const refreshSpins = useCallback(async () => {
    if (!userId) {
      setSpins(0);
      return;
    }
    try {
      const wallet = await getUserSpinsWallet(userId);
      setSpins(wallet?.stock ?? 0);
    } catch (error) {
      console.error('Error al refrescar giros:', error);
      setSpins(0);
    }
  }, [userId]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setSpins(0);
  }, []);

  useEffect(() => {
    const initUser = async () => await refreshUser();
    initUser();
  }, [refreshUser]);

  useEffect(() => {
    const initSpins = async () => await refreshSpins();
    initSpins();
  }, [refreshSpins]);

  return (
    <AuthContext.Provider value={{ user, loading, spins, refreshUser, refreshSpins, logout }}>
      {children}
    </AuthContext.Provider>
  );
}