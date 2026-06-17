import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './user.css';

import { Config } from './config/Config';

import {
  getAuthenticatedUser,
  logout,
} from './services/authService';

import { resolveImageUrl } from './utils/resolveImageUrl';

import type { UserConfig } from './config/types/UserConfig';

/**
 * Página principal del usuario autenticado.
 *
 * Responsabilidades:
 * - Obtener información del usuario autenticado.
 * - Gestionar navegación lateral.
 * - Administrar cierre de sesión.
 * - Renderizar configuración de cuenta.
 *
 * @returns Vista principal del panel de usuario.
 */
export const User = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState<boolean>(false);

  const [user, setUser] =
    useState<UserConfig | null>(null);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    /**
     * Obtiene el usuario autenticado actual.
     */
    const loadUser = async (): Promise<void> => {
      try {
        const data =
          await getAuthenticatedUser();

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

  /**
   * Alterna visualmente el sidebar.
   */
  const toggleSidebar = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  /**
   * Cierra el sidebar lateral.
   */
  const closeSidebar = (): void => {
    setSidebarOpen(false);
  };

  /**
   * Finaliza la sesión actual.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);

      navigate('/login');
    }
  };

  const profileImageSrc =
    resolveImageUrl(
      user?.profile_picture ?? null,
    );

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
    <main
      id="mainContent"
      className="main-wrapper user-page position-relative"
    >
      <button
        type="button"
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? '⮞' : '⮜'}
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`user-sidebar ${
          sidebarOpen ? 'is-open' : ''
        }`}
      >
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
          <Link
            to="/album"
            className="user-menu-btn"
            onClick={closeSidebar}
          >
            📓 Mis álbumes
          </Link>

          <Link
            to="/billetera"
            className="user-menu-btn"
            onClick={closeSidebar}
          >
            💼 Mis figuritas
          </Link>

          <Link
            to="/intercambios"
            className="user-menu-btn"
            onClick={closeSidebar}
          >
            🔁 Mis intercambios
          </Link>

          <Link
            to="/compras"
            className="user-menu-btn"
            onClick={closeSidebar}
          >
            🛒 Mis compras
          </Link>
        </nav>
      </aside>

      <section className="user-content">
        {user && (
          <Config
            user={user}
            setUser={setUser}
          />
        )}
      </section>
    </main>
  );
};