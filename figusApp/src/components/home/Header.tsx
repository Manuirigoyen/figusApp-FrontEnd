import { Link } from 'react-router-dom';

import './header.css';
import pelota from '../../assets/img/icons/pelota.png';

/**
 * Componente Header con navegación responsive React Router.
 * Incluye logo, menú hamburguesa y navegación general.
 * @returns Elemento JSX del header completo.
 */
export const Header = () => {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <Link className="navbar-brand navbar-brand-hover d-flex align-items-center gap-2" to="/">
          <img src={pelota} alt="Logo principal FigusApp" className="navbar-logo" />
          <span className="navbar-title">FigusApp</span>
        </Link>

        {getButtonBurger()}

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-lg-3">
              <Link
                to="/tienda"
                className="nav-link text-white btn btn-link"
                id="tiendaBtn"
              >
                Tienda 🛒
              </Link>
            </li>

            <li className="nav-item mx-lg-3">
              <Link
                to="/negociaciones"
                className="nav-link text-white btn btn-link"
                id="negociacionesBtn"
              >
                Intercambios ⚖️
              </Link>
            </li>

            <li className="nav-item mx-lg-3">
              <Link
                to="/ruleta"
                className="nav-link text-white btn btn-link"
                id="ruletaBtn"
              >
                Ruleta 🎡
              </Link>
            </li>

            <li className="nav-item mx-lg-3">
              <a className="nav-link text-white" href="#footer">
                Contacto 📞
              </a>
            </li>

            <li className="nav-item mx-lg-3">
              <div className="dropdown">
                <button
                  className="nav-link text-white btn-link px-0 dropdown-toggle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile 👤
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

/**
 * Genera el botón hamburguesa para navegación móvil.
 * @returns Botón desplegable.
 */
const getButtonBurger = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarContent"
    aria-controls="navbarContent"
    aria-expanded="false"
    aria-label="Alternar navegación"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);
