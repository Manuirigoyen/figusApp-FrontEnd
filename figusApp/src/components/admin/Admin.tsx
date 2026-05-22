import './admin.css';

import { Link } from 'react-router-dom';

/**
 * Componente principal del panel de administración.
 * Renderiza la interfaz completa con sidebar colapsable y área de presentación.
 */
export const Admin = () => {
  return (
    <main id="mainContent" className="main-wrapper position-relative d-flex z-2">
      {getDivAside()}

      <div className="position-relative z-1 flex-grow-1">
        {getDivPresentacion()}
      </div>
    </main>
  );
};


/**
 * Renderiza la sidebar de navegación administrativa completa.
 * Incluye perfil usuario, toggle, secciones CRUD colapsables y logout.
 *
 * @returns {JSX.Element} Panel lateral completo con menú responsive.
 */
const getDivAside = () => (
  <div className="d-flex panel-height">
    <button id="toggleSidebar" className="sidebar-toggle-btn" aria-label="Abrir menú">
      ⮜
    </button>
    <aside className="bg-white border-end px-3 py-3 pb-5 sidebar-width">
      <div className="profile-wrapper text-center mb-4">
        <div className="img-container">
          <Link to="/album">
            <button id="btn-album" className="profile-icon">📓</button>
          </Link>
          <img
            src="assets/img/db/users/fotoPerfilDefault.png"
            alt="Foto de perfil"
            className="rounded-circle mb-2"
          />
          <Link to="/billetera">
            <button id="btn-billetera" className="profile-icon">💼</button>
          </Link>
        </div>
        <h6>admin@example.com</h6>
        <button className="btn btn-danger btn-sm w-100">Cerrar sesión</button>
      </div>
      <h5 className="text-center mb-3">Administración</h5>
      <ul className="list-unstyled">
        <li className="mb-2">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-toggle="collapse"
            data-bs-target="#submenuListar"
          >
            Listar
          </button>
          <div className="collapse" id="submenuListar">
            <ul className="list-unstyled mt-2">
              <li><button id="btn-listar-figuritas" className="btn btn-outline-primary w-100 mb-2">Listar figuritas</button></li>
              <li><button id="btn-listar-sobres" className="btn btn-outline-primary w-100 mb-2">Listar sobres</button></li>
              <li><button id="btn-listar-albumes" className="btn btn-outline-primary w-100 mb-2">Listar álbumes</button></li>
              <li><button id="btn-listar-usuarios" className="btn btn-outline-primary w-100 mb-2">Listar usuarios</button></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-toggle="collapse"
            data-bs-target="#submenuAgregar"
          >
            Agregar
          </button>
          <div className="collapse" id="submenuAgregar">
            <ul className="list-unstyled mt-2">
              <li><button id="btn-agregar-figuritas" className="btn btn-outline-primary w-100 mb-2">Agregar figuritas</button></li>
              <li><button id="btn-agregar-sobres" className="btn btn-outline-primary w-100 mb-2">Agregar sobres</button></li>
              <li><button id="btn-agregar-albumes" className="btn btn-outline-primary w-100 mb-2">Agregar álbumes</button></li>
              <li><button id="btn-agregar-usuarios" className="btn btn-outline-primary w-100 mb-2">Agregar usuarios</button></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-toggle="collapse"
            data-bs-target="#submenuModificar"
          >
            Modificar
          </button>
          <div className="collapse" id="submenuModificar">
            <ul className="list-unstyled mt-2">
              <li><button id="btn-modificar-figuritas" className="btn btn-outline-primary w-100 mb-2 px-0">Modificar figuritas</button></li>
              <li><button id="btn-modificar-sobres" className="btn btn-outline-primary w-100 mb-2">Modificar sobres</button></li>
              <li><button id="btn-modificar-albumes" className="btn btn-outline-primary w-100 mb-2 px-0">Modificar álbumes</button></li>
              <li><button id="btn-modificar-usuarios" className="btn btn-outline-primary w-100 mb-2 px-0">Modificar usuarios</button></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-toggle="collapse"
            data-bs-target="#submenuEliminar"
          >
            Eliminar
          </button>
          <div className="collapse" id="submenuEliminar">
            <ul className="list-unstyled mt-2">
              <li><button id="btn-eliminar-figuritas" className="btn btn-outline-primary w-100 mb-2">Eliminar figuritas</button></li>
              <li><button id="btn-eliminar-sobres" className="btn btn-outline-primary w-100 mb-2">Eliminar sobres</button></li>
              <li><button id="btn-eliminar-albumes" className="btn btn-outline-primary w-100 mb-2">Eliminar álbumes</button></li>
              <li><button id="btn-eliminar-usuarios" className="btn btn-outline-primary w-100 mb-2">Eliminar usuarios</button></li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  </div>
);


/**
 * Renderiza la sección principal de presentación administrativa.
 * Incluye título, descripción introductoria y grid de tarjetas CRUD.
 *
 * @returns {JSX.Element} Contenido principal con presentación y cards informativas.
 */
const getDivPresentacion = () => (
  <div className="flex-grow-1 p-4">
    <h4 className="mb-4 text-center">
      Bienvenido al panel de administración de <strong>FigusApp</strong>
    </h4>
    <p className="intro-paragraph mb-5">
      Desde esta interfaz, los administradores podrán gestionar las secciones
      del sistema: figuritas, sobres, álbumes y usuarios. Cada sección incluye
      herramientas que permiten agregar, listar, modificar y eliminar registros
      en la base de datos para asegurar que la información se mantenga
      actualizada y organizada.
    </p>
    <div className="row row-cols-1 row-cols-md-4 g-4">
      <div className="col">
        <div className="p-3 bg-light border rounded h-100 d-flex flex-column column-card">
          <h5>Listar</h5>
          <p className="mb-0">
            Cuenta con formularios que permiten consultar los registros
            existentes de Figuritas, Sobres, Álbumes y Usuarios, facilitando su
            visualización y búsqueda.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="p-3 bg-light border rounded h-100 d-flex flex-column column-card">
          <h5>Agregar</h5>
          <p className="mb-0">
            Cuenta con formularios que permiten crear nuevos registros de
            Figuritas, Sobres, Álbumes y Usuarios, asegurando que la información
            se mantenga completa y actualizada.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="p-3 bg-light border rounded h-100 d-flex flex-column column-card">
          <h5>Modificar</h5>
          <p className="mb-0">
            Cuenta con formularios que permiten actualizar los registros
            existentes en la base de datos, como Figuritas, Sobres, Álbumes y
            Usuarios, de manera rápida y segura.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="p-3 bg-light border rounded h-100 d-flex flex-column column-card">
          <h5>Eliminar</h5>
          <p className="mb-0">
            Cuenta con formularios que permiten eliminar registros existentes en
            la base de datos, como Figuritas, Sobres, Álbumes y Usuarios,
            manteniendo la base de datos limpia y organizada.
          </p>
        </div>
      </div>
    </div>
  </div>
);