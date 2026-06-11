import { useState } from 'react';
import React from 'react';
import '../../../register/register.css';
import '../abm.css';
import {
  getUserById,
  type User,
} from '../services/usersService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

/**
 * Renderiza el formulario de listado de usuarios.
 *
 * @returns {JSX.Element} El componente de listado de usuarios.
 */
export const ListarUsuario = () => {
  const [datosParaTabla, setDatosParaTabla] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Maneja la búsqueda de un usuario por su ID.
   */
  const handleBuscarUsuario = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));

      const data = await getUserById(id);
      setDatosParaTabla(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
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
        <h2 className="register-title abm-title mb-0">Listar Usuarios</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar usuario por ID</h3>
            <p className="register-subtitle abm-subtitle mb-0">
              Busca un usuario específico mediante su identificador.
            </p>
          </div>

          <form onSubmit={handleBuscarUsuario} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputUsuarioId" className="form-label">
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
                {loading ? 'Buscando...' : 'Buscar usuario'}
              </button>
            </div>
          </form>

          {datosParaTabla && <TablaResultados data={datosParaTabla} />}

          {error && <div className="text-danger mt-3 text-center fw-bold">{error}</div>}
        </section>
      </div>
    </section>
  );
};