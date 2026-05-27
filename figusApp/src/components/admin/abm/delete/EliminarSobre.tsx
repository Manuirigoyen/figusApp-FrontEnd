import { useState } from 'react';

import '../../../register/register.css';
import '../abm.css';

import { deletePack } from '../services/packsService';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Renderiza el formulario de eliminación de sobres.
 *
 * @returns {JSX.Element}
 */
export const EliminarSobre = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);

      const id = Number(formData.get('id'));

      await deletePack(id);

      setSuccess(
        `Sobre con ID ${id} eliminado correctamente`,
      );

      e.currentTarget.reset();
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

        <h2 className="register-title abm-title mb-2">
          Eliminar Sobre
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Elimina sobres mediante su identificador.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          onSubmit={handleSubmit}
          className="abm-form"
        >
          <div className="row g-3">
            <div className="col-12 abm-field">
              <label
                htmlFor="inputEliminarSobreId"
                className="form-label"
              >
                ID del sobre
              </label>

              <input
                type="number"
                id="inputEliminarSobreId"
                name="id"
                min={1}
                placeholder="1"
                required
                className="form-control register-input abm-input"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              className="btn abm-btn abm-btn-danger w-100"
              disabled={loading}
            >
              {loading
                ? 'Eliminando...'
                : 'Eliminar'}
            </button>
          </div>
        </form>

        {success && (
          <div className="text-success mt-3">
            {success}
          </div>
        )}

        {error && (
          <div className="text-danger mt-3">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};