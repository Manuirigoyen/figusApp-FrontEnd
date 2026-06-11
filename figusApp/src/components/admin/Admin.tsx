import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './admin.css';

import { AgregarAlbum } from './abm/crear/AgregarAlbum';
import { AgregarFigurita } from './abm/crear/AgregarFigurita';
import { AgregarProducto } from './abm/crear/AgregarProducto';
import { AgregarSobre } from './abm/crear/AgregarSobre';
import { AgregarUsuario } from './abm/crear/AgregarUsuario';

import { EliminarAlbum } from './abm/delete/EliminarAlbum';
import { EliminarFigurita } from './abm/delete/EliminarFigurita';
import { EliminarProducto } from './abm/delete/EliminarProducto';
import { EliminarSobre } from './abm/delete/EliminarSobre';
import { EliminarUsuario } from './abm/delete/EliminarUsuario';

import { ListarAlbum } from './abm/listar/listarAlbum';
import { ListarFigurita } from './abm/listar/listarFigurita';
import { ListarProducto } from './abm/listar/listarProducto';
import { ListarSobre } from './abm/listar/listarSobre';
import { ListarUsuario } from './abm/listar/listarUsuario';

import { ModificarAlbum } from './abm/update/ModificarAlbum';
import { ModificarFigurita } from './abm/update/ModificarFigurita';
import { ModificarProducto } from './abm/update/ModificarProducto';
import { ModificarSobre } from './abm/update/ModificarSobre';
import { ModificarUsuario } from './abm/update/ModificarUsuario';


import packBanner from '../../assets/img/add/store/pack.png'; 

type AdminView =
  | 'home'
  | 'listar-figurita'
  | 'listar-sobre'
  | 'listar-album'
  | 'listar-usuario'
  | 'listar-producto'
  | 'agregar-figurita'
  | 'agregar-sobre'
  | 'agregar-album'
  | 'agregar-usuario'
  | 'agregar-producto'
  | 'modificar-figurita'
  | 'modificar-sobre'
  | 'modificar-album'
  | 'modificar-usuario'
  | 'modificar-producto'
  | 'eliminar-figurita'
  | 'eliminar-sobre'
  | 'eliminar-album'
  | 'eliminar-usuario'
  | 'eliminar-producto';

type LoggedUser = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  role: 'user' | 'admin';
};

const adminLogo = new URL(
  '../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Pantalla de presentación de bienvenida para el panel de administración.
 *
 * @returns {JSX.Element} La pantalla de bienvenida con tarjetas de funciones y banner publicitario.
 */
function AdminPresentacion() {
  return (
    <div className="admin-welcome-shell mt-3">
      <div className="admin-welcome-card">
        <div className="admin-welcome-header text-center">
          <img src={adminLogo} alt="FigusApp" className="admin-welcome-logo" />

          <h1 className="admin-welcome-title">
            Bienvenidos al panel de administración de FigusApp
          </h1>

          <p className="admin-welcome-text">
            Desde esta interfaz, los administradores pueden gestionar figuritas,
            sobres, álbumes, usuarios y productos desde secciones separadas y
            componentes independientes.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mt-2">
          <div className="col">
            <div className="admin-feature-card h-100">
              <h5 className="admin-feature-title">Listar</h5>
              <p className="admin-feature-text mb-0">
                Consultar registros existentes de figuritas, sobres, álbumes,
                usuarios y productos.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="admin-feature-card h-100">
              <h5 className="admin-feature-title">Agregar</h5>
              <p className="admin-feature-text mb-0">
                Crear nuevos registros de forma ordenada y consistente.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="admin-feature-card h-100">
              <h5 className="admin-feature-title">Modificar</h5>
              <p className="admin-feature-text mb-0">
                Actualizar datos existentes desde formularios dedicados.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="admin-feature-card h-100">
              <h5 className="admin-feature-title">Eliminar</h5>
              <p className="admin-feature-text mb-0">
                Quitar registros obsoletos o incorrectos del sistema.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center mt-2">
            <div className="admin-ad-banner">
              <img 
                src={packBanner} 
                alt="Promoción destacada" 
                className="img-fluid rounded" 
                style={{ maxWidth: '90%', height: 'auto' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the appropriate admin content based on the active view.
 *
 * @param {AdminView} vista - The active admin view.
 * @returns {ReactElement} The corresponding admin component.
 */
function renderAdminContent(vista: AdminView): ReactElement {
  switch (vista) {
    case 'listar-figurita':
      return <ListarFigurita />;
    case 'listar-sobre':
      return <ListarSobre />;
    case 'listar-album':
      return <ListarAlbum />;
    case 'listar-usuario':
      return <ListarUsuario />;
    case 'listar-producto':
      return <ListarProducto />;

    case 'agregar-figurita':
      return <AgregarFigurita />;
    case 'agregar-sobre':
      return <AgregarSobre />;
    case 'agregar-album':
      return <AgregarAlbum />;
    case 'agregar-usuario':
      return <AgregarUsuario />;
    case 'agregar-producto':
      return <AgregarProducto />;

    case 'modificar-figurita':
      return <ModificarFigurita />;
    case 'modificar-sobre':
      return <ModificarSobre />;
    case 'modificar-album':
      return <ModificarAlbum />;
    case 'modificar-usuario':
      return <ModificarUsuario />;
    case 'modificar-producto':
      return <ModificarProducto />;

    case 'eliminar-figurita':
      return <EliminarFigurita />;
    case 'eliminar-sobre':
      return <EliminarSobre />;
    case 'eliminar-album':
      return <EliminarAlbum />;
    case 'eliminar-usuario':
      return <EliminarUsuario />;
    case 'eliminar-producto':
      return <EliminarProducto />;

    case 'home':
    default:
      return <AdminPresentacion />;
  }
}

/**
 * Admin panel component for managing system data.
 * Provides functionality to list, create, update, and delete
 * figuritas, sobres, álbumes, usuarios, and productos.
 *
 * @returns {JSX.Element} The admin panel with sidebar navigation and content area.
 */
export const Admin = () => {
  const navigate = useNavigate();

  const [vistaActiva, setVistaActiva] = useState<AdminView>('home');
  const [listarAbierto, setListarAbierto] = useState(false);
  const [agregarAbierto, setAgregarAbierto] = useState(false);
  const [modificarAbierto, setModificarAbierto] = useState(false);
  const [eliminarAbierto, setEliminarAbierto] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/me', {
          credentials: 'include',
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = (await response.json()) as LoggedUser;
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      setVistaActiva('home');
    }

    setUser(null);
    setVistaActiva('home');
    navigate('/');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const profileImageSrc = user?.profile_picture
    ? user.profile_picture.startsWith('http')
      ? user.profile_picture
      : `http://localhost:3000${user.profile_picture.startsWith('/') ? '' : '/'}${user.profile_picture}`
    : '/assets/img/db/users/fotoPerfilDefault.png';

  const profileName = user
    ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.email
    : 'Administrador';

  const mostrarVista = (vista: AdminView) => {
    setVistaActiva(vista);
    closeSidebar();
  };

  const toggleListar = () => setListarAbierto((prev) => !prev);
  const toggleAgregar = () => setAgregarAbierto((prev) => !prev);
  const toggleModificar = () => setModificarAbierto((prev) => !prev);
  const toggleEliminar = () => setEliminarAbierto((prev) => !prev);

  return (
    <main id="mainContent" className="main-wrapper admin-page position-relative">
      <button
        id="toggleSidebar"
        className="sidebar-toggle-btn"
        aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
        type="button"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? '⮞' : '⮜'}
      </button>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-profile text-center">
          <div className="admin-profile-actions">
            <Link
              to="/album"
              className="admin-profile-icon"
              aria-label="Ir al álbum"
              onClick={closeSidebar}
            >
              📓
            </Link>

            <img
              src={profileImageSrc}
              alt={profileName}
              className="admin-profile-image"
            />

            <Link
              to="/billetera"
              className="admin-profile-icon"
              aria-label="Ir a billetera"
              onClick={closeSidebar}
            >
              💼
            </Link>
          </div>

          <h6 className="admin-email">{user?.email ?? 'Cargando...'}</h6>

          <button
            className="btn btn-danger btn-sm w-100 admin-logout-btn"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        <h5 className="admin-sidebar-title text-center">Administración</h5>

        <nav className="admin-menu" aria-label="Navegación administrativa">
          <div className="admin-menu-group">
            <button
              className="admin-menu-btn"
              type="button"
              onClick={toggleListar}
              aria-expanded={listarAbierto}
              aria-controls="submenu-listar"
            >
              Listar
            </button>

            <div
              id="submenu-listar"
              className={`admin-submenu ${listarAbierto ? 'is-open' : ''}`}
            >
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('listar-figurita')}
              >
                Listar figuritas
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('listar-sobre')}
              >
                Listar sobres
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('listar-album')}
              >
                Listar álbumes
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('listar-usuario')}
              >
                Listar usuarios
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('listar-producto')}
              >
                Listar productos
              </button>
            </div>
          </div>

          <div className="admin-menu-group">
            <button
              className="admin-menu-btn"
              type="button"
              onClick={toggleAgregar}
              aria-expanded={agregarAbierto}
              aria-controls="submenu-agregar"
            >
              Agregar
            </button>

            <div
              id="submenu-agregar"
              className={`admin-submenu ${agregarAbierto ? 'is-open' : ''}`}
            >
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('agregar-figurita')}
              >
                Agregar figuritas
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('agregar-sobre')}
              >
                Agregar sobres
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('agregar-album')}
              >
                Agregar álbumes
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('agregar-usuario')}
              >
                Agregar usuarios
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('agregar-producto')}
              >
                Agregar productos
              </button>
            </div>
          </div>

          <div className="admin-menu-group">
            <button
              className="admin-menu-btn"
              type="button"
              onClick={toggleModificar}
              aria-expanded={modificarAbierto}
              aria-controls="submenu-modificar"
            >
              Modificar
            </button>

            <div
              id="submenu-modificar"
              className={`admin-submenu ${modificarAbierto ? 'is-open' : ''}`}
            >
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('modificar-figurita')}
              >
                Modificar figuritas
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('modificar-sobre')}
              >
                Modificar sobres
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('modificar-album')}
              >
                Modificar álbumes
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('modificar-usuario')}
              >
                Modificar usuarios
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('modificar-producto')}
              >
                Modificar productos
              </button>
            </div>
          </div>

          <div className="admin-menu-group">
            <button
              className="admin-menu-btn"
              type="button"
              onClick={toggleEliminar}
              aria-expanded={eliminarAbierto}
              aria-controls="submenu-eliminar"
            >
              Eliminar
            </button>

            <div
              id="submenu-eliminar"
              className={`admin-submenu ${eliminarAbierto ? 'is-open' : ''}`}
            >
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('eliminar-figurita')}
              >
                Eliminar figuritas
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('eliminar-sobre')}
              >
                Eliminar sobres
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('eliminar-album')}
              >
                Eliminar álbumes
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('eliminar-usuario')}
              >
                Eliminar usuarios
              </button>
              <button
                className="admin-submenu-btn"
                type="button"
                onClick={() => mostrarVista('eliminar-producto')}
              >
                Eliminar productos
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <section className="admin-content">
        {renderAdminContent(vistaActiva)}
      </section>
    </main>
  );
};

