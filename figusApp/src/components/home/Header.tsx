import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './header.css';
import pelota from '../../assets/img/icons/pelota.png';

import { getAuthenticatedUser } from '../user/services/authService';
import { useUserSpins } from '../rulet/hooks/useUserSpins';  
import type { UserConfig } from '../user/config/types/UserConfig';

type Role = 'user' | 'admin' | null;

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);

  const accountRef = useRef<HTMLLIElement | null>(null);
  const location = useLocation();

  const { spins, loadSpins } = useUserSpins();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link app-link${isActive ? ' active' : ''}`;

  const loadUser = async () => {
    try {
      const user: UserConfig = await getAuthenticatedUser();
      setIsAuthenticated(true);
      setRole(user.role);
      
      if (user.id) {
        await loadSpins(user.id);
      }
    } catch {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavLinkClick = () => {
    setNavOpen(false);
    setAccountOpen(false);
  };

  const configPath =
    role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/login';

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <NavLink
          className="navbar-brand app-brand"
          to="/"
          onClick={handleNavLinkClick}
        >
          <img src={pelota} alt="Logo FigusApp" className="navbar-logo" />
          <span className="navbar-title">FigusApp</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          aria-expanded={navOpen}
          aria-label="Alternar navegación"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center app-nav">
            <li className="nav-item mx-lg-2">
              <NavLink to="/tienda" className={linkClass} onClick={handleNavLinkClick}>
                <i className="bi bi-cart3 nav-icon" />
                <span>Tienda</span>
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink to="/negociaciones" className={linkClass} onClick={handleNavLinkClick}>
                <i className="bi bi-arrow-left-right nav-icon" />
                <span>Intercambios</span>
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink to="/ruleta" className={linkClass} onClick={handleNavLinkClick}>
                <i className="bi bi-disc nav-icon" />
                <span>Ruleta</span>
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <a href="#footer" className="nav-link app-link" onClick={handleNavLinkClick}>
                <i className="bi bi-telephone nav-icon" />
                <span>Contacto</span>
              </a>
            </li>

            <li className="nav-item mx-lg-2 dropdown" ref={accountRef}>
              <button
                className="nav-link app-link profile-btn dropdown-toggle border-0 bg-transparent"
                type="button"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
              >
                <i className="bi bi-person-circle nav-icon" />
                <span>Mi cuenta</span>
              </button>

              <ul className={`dropdown-menu dropdown-menu-end${accountOpen ? ' show' : ''}`}>
                {isAuthenticated ? (
                  <>
                    <li>
                      <NavLink
                        to="/ruleta"
                        className="dropdown-item d-flex align-items-center justify-content-between"
                        onClick={handleNavLinkClick}
                      >
                        <div className="d-flex align-items-center">
                          <i className="bi bi-disc me-2" />
                          <span>Mis giros</span>
                        </div>
                        <span className="badge bg-success ms-2">{spins}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={configPath} className="dropdown-item" onClick={handleNavLinkClick}>
                        <i className="bi bi-gear me-2" />
                        Configuración
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login" className="dropdown-item" onClick={handleNavLinkClick}>
                        <i className="bi bi-box-arrow-in-right me-2" />
                        Iniciar sesión
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className="dropdown-item" onClick={handleNavLinkClick}>
                        <i className="bi bi-person-plus me-2" />
                        Registrarse
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};