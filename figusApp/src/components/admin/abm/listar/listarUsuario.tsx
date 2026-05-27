import { useState, type FormEvent } from 'react';

import '../../../register/register.css';
import '../abm.css';

import {
  getUserById,
  type User,
} from '../services/usersService';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Renderiza formularios de listado de usuarios.
 *
 * @returns {JSX.Element}
 */
export const ListarUsuario = () => {
  const [usuarioBuscado, setUsuarioBuscado] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleBuscarUsuario = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setUsuarioBuscado(null);

    try {
      const formData = new FormData(e.currentTarget);

      const id = Number(formData.get('id'));

      const data = await getUserById(id);

      setUsuarioBuscado(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error inesperado',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={adminLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />

        <h2 className="register-title abm-title mb-0">
          Listar Usuarios
        </h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">
              Buscar usuario por ID
            </h3>

            <p className="register-subtitle abm-subtitle mb-0">
              Busca un usuario específico mediante su
              identificador.
            </p>
          </div>

          <form
            onSubmit={handleBuscarUsuario}
            className="abm-form"
          >
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label
                  htmlFor="inputUsuarioId"
                  className="form-label"
                >
                  ID del usuario
                </label>

                <input
                  type="number"
                  id="inputUsuarioId"
                  name="id"
                  min={1}
                  required
                  defaultValue={1}
                  className="form-control register-input abm-input"
                />
              </div>
            </div>

            <div className="abm-actions pt-2">
              <button
                type="submit"
                className="btn register-btn abm-btn w-100"
                disabled={loading}
              >
                {loading
                  ? 'Buscando...'
                  : 'Buscar usuario'}
              </button>
            </div>
          </form>

          {usuarioBuscado && (
            <pre className="abm-response mt-3">
              {JSON.stringify(usuarioBuscado, null, 2)}
            </pre>
          )}

          {error && (
            <div className="text-danger mt-3">
              {error}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};