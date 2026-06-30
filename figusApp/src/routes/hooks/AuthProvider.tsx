import { useCallback, useEffect, useState } from 'react';
import { getUserSpinsWallet } from '../../components/rulet/service/walletService';
import type { authUser } from "../types/context";
import { AuthContext } from "./useAuth";

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Proveedor del Contexto de Autenticación (`AuthProvider`).
 *
 * Gestiona el estado global de la sesión del usuario, el flujo de carga (loading) 
 * y la sincronización de la billetera de giros (spins). Se conecta con el backend 
 * en Render para validar credenciales y con Supabase para el stock de la ruleta.
 *
 * @param props.children - Componentes hijos que tendrán acceso al estado global de autenticación.
 * @returns Un componente Proveedor de React (`AuthContext.Provider`) que envuelve la aplicación.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<authUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spins, setSpins] = useState(0);

  /**
   * Sincroniza el estado local con la sesión actual del servidor (NestJS en Render).
   * Envía las credenciales/cookies para validar si el token sigue activo.
   */
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

  /**
   * Consulta el stock de giros disponibles del usuario en la base de datos (Supabase).
   * Se dispara automáticamente cada vez que el ID del usuario cambia.
   */
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

  /**
   * Cierra la sesión del usuario de forma segura.
   * Remueve el token de acceso, resetea el estado del usuario y vacía los giros.
   */
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