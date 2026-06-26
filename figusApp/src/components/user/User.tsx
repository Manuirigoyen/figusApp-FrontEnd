import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Config } from './config/Config';
import { Compras } from '../compras/Compras';
import { getAuthenticatedUser, logout as logoutService } from './services/authService';
import { resolveImageUrl } from './utils/resolveImageUrl';
import { useAuth } from '../../routes/hooks/useAuth';
import type { UserConfig } from './config/types/UserConfig';
import './user.css';

type UserTab = 'config' | 'compras';

/**
 * Componente contenedor del panel de control del usuario.
 * Proporciona un sidebar de navegación interna para alternar entre
 * la configuración del perfil y el historial de transacciones realizadas.
 */
export const User = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<UserTab>('config');

  useEffect(() => {
    let mounted = true;

    const loadUser = async (): Promise<void> => {
      try {
        const data = await getAuthenticatedUser();
        if (mounted) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleSidebar = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = (): void => {
    setSidebarOpen(false);
  };

  const switchTab = (tab: UserTab): void => {
    setActiveTab(tab);
    closeSidebar();
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutService();
    } catch (error) {
      console.error(error);
    } finally {
      logout();
      setUser(null);
      navigate('/login', { replace: true });
    }
  };

  const profileImageSrc = resolveImageUrl(user?.profile_picture ?? null);

  if (isLoading) {
    return (
      <main className="main-wrapper user-page">
        <div className="text-center p-5">Cargando usuario...</div>
      </main>
    );
  }

  return (
    <main id="mainContent" className="main-wrapper user-page position-relative">
      <button
        type="button"
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? '⮞' : '⮜'}
      </button>

      {sidebarOpen ? <div className="sidebar-overlay" onClick={closeSidebar} /> : null}

      <aside className={`user-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="user-profile text-center">
          <img src={profileImageSrc} alt="perfil" className="user-profile-image" />
          <h6 className="user-email">{user?.email ?? 'Sin usuario'}</h6>
          <button type="button" className="btn btn-danger btn-sm w-100 user-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <h5 className="user-sidebar-title text-center">Mi cuenta</h5>

        <nav className="user-menu">
          <Link to="/album" className="user-menu-btn" onClick={closeSidebar}>
            📓 Mis álbumes
          </Link>

          <Link to="/billetera" className="user-menu-btn" onClick={closeSidebar}>
            💼 Mis figuritas
          </Link>

          <Link to="/intercambios" className="user-menu-btn" onClick={closeSidebar}>
            🔁 Mis intercambios
          </Link>

          <button type="button" className={`user-menu-btn ${activeTab === 'compras' ? 'active' : ''}`} onClick={() => switchTab('compras')}>
            🛒 Mis compras
          </button>
        </nav>
      </aside>

      <section className="user-content">
        {user && activeTab === 'config' && <Config user={user} setUser={setUser} />}
        {user && activeTab === 'compras' && <Compras />}
      </section>
    </main>
  );
};