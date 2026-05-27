import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './user.css';

import { Config } from './config/Config';

import {
  getAuthenticatedUser,
  logout,
  type LoggedUser,
} from './services/authService';

import { resolveImageUrl } from './utils/resolveImageUrl';

/**
 * Página principal de usuario autenticado.
 *
 * Responsabilidades:
 * - Obtener datos del usuario autenticado
 * - Renderizar layout de navegación lateral
 * - Gestionar sesión (logout)
 * - Renderizar módulo de configuración de cuenta
 */
export const User = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
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

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    window.dispatchEvent(new Event('auth-change'));

    navigate('/login');
  }
};

  const profileImageSrc = resolveImageUrl(user?.profile_picture);

  if (isLoading) {
    return (
      <main className="main-wrapper user-page">
        <div className="text-center p-5">
          Cargando usuario...
        </div>
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

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`user-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="user-profile text-center">
          <img
            src={profileImageSrc}
            alt="perfil"
            className="user-profile-image"
          />

          <h6 className="user-email">
            {user?.email ?? 'Sin usuario'}
          </h6>

          <button
            type="button"
            className="btn btn-danger btn-sm w-100 user-logout-btn"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        <h5 className="user-sidebar-title text-center">
          Mi cuenta
        </h5>

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

          <Link to="/compras" className="user-menu-btn" onClick={closeSidebar}>
            🛒 Mis compras
          </Link>
        </nav>
      </aside>

      <section className="user-content">
        {user && <Config user={user} setUser={setUser} />}
      </section>
    </main>
  );
};