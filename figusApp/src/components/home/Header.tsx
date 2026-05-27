import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';
import pelota from '../../assets/img/icons/pelota.png';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const accountRef = useRef<HTMLLIElement | null>(null);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link app-link${isActive ? ' active' : ''}`;

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/me',
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    }
  };

  checkAuth();

  window.addEventListener('auth-change', checkAuth);

  return () => {
    window.removeEventListener('auth-change', checkAuth);
  };
}, []);

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

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <NavLink
          className="navbar-brand app-brand"
          to="/"
          onClick={handleNavLinkClick}
        >
          <img
            src={pelota}
            alt="Logo principal FigusApp"
            className="navbar-logo"
          />
          <span className="navbar-title">FigusApp</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={navOpen}
          aria-label="Alternar navegación"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center app-nav">
            <li className="nav-item mx-lg-2">
              <NavLink to="/tienda" className={linkClass} onClick={handleNavLinkClick}>
                <i className="bi bi-cart3 nav-icon" />
                <span>Tienda</span>
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink
                to="/negociaciones"
                className={linkClass}
                onClick={handleNavLinkClick}
              >
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
              <a
                href="#footer"
                className="nav-link app-link"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-telephone nav-icon" />
                <span>Contacto</span>
              </a>
            </li>

            <li className="nav-item mx-lg-2 dropdown" ref={accountRef}>
              <button
                className="nav-link app-link profile-btn dropdown-toggle"
                type="button"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
              >
                <i className="bi bi-person-circle nav-icon" />
                <span>Mi cuenta</span>
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end${
                  accountOpen ? ' show' : ''
                }`}
              >
                {isAuthenticated ? (
                  <li>
                    <NavLink
                      to="/user"
                      className="dropdown-item"
                      onClick={handleNavLinkClick}
                    >
                      ⚙️ Configuración
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        onClick={handleNavLinkClick}
                      >
                        Iniciar sesión
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        className="dropdown-item"
                        onClick={handleNavLinkClick}
                      >
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