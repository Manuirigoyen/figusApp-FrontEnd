import './user.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react'; // <- FALTABA ESTO
import { Config } from './config/Config.tsx';
import { useUserProfile } from './hooks/useUserProfile';
import type { UserProfile } from './interfaces/UserProfile';

export const User = () => {
  const { user, isLoading, error } = useUserProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center p-5">Cargando perfil...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Ir a Login
        </button>
      </div>
    );
  }

  return (
    <main id="mainContent" className="main-wrapper position-relative d-flex z-2">
      <UserAside user={user} />
      <div className="position-relative z-1 flex-grow-1">
        <Config />
      </div>
    </main>
  );
};

const UserAside = ({ user }: { user: UserProfile | null }) => {
  const [imgError, setImgError] = useState(false); // <- ESTADO PARA EVITAR LOOP

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  };

  // useMemo evita que la URL cambie en cada render
  const avatarUrl = useMemo(() => {
    if (!user || imgError) return '/assets/img/db/users/fotoPerfilDefault.png';
    return `http://localhost:3000/api/v1/users/me/avatar?v=${user.profile_picture}`;
  }, [user?.id, user?.profile_picture, imgError]);

  return (
    <div className="d-flex panel-height">
      <button id="toggleSidebar" className="sidebar-toggle-btn" aria-label="Abrir menú">
        ⮜
      </button>
      <aside className="bg-light border-end px-3 py-3 pb-5 sidebar-width z-2">
        <div className="profile-wrapper text-center mb-4">
          <div className="img-container position-relative">
            <Link to="/user">
              <button id="btn-config" className="profile-icon-config" title="Configuración">
                ⚙
              </button>
            </Link>
            <img
              id="profilePhoto"
              src={avatarUrl}
              alt="Foto de perfil"
              className="rounded-circle mb-2"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              crossOrigin="use-credentials"
              onError={() => {
                // Solo setea una vez, corta el loop
                if (!imgError) {
                  setImgError(true);
                }
              }}
            />
          </div>
          <h6 id="profileEmail">{user?.email || 'usuario@example.com'}</h6>
          <button
            id="btn-logout"
            className="btn btn-danger btn-sm w-100 mb-3"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
        <h5 className="text-center mb-3">Mi cuenta</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/album">
              <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between mb-2">
                Mis álbumes <span>📓</span>
              </button>
            </Link>
            <Link to="/billetera">
              <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between">
                Mis Figuritas <span>💼</span>
              </button>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};