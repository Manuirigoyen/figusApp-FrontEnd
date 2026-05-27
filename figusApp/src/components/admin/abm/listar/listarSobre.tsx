import { useState } from 'react';
import '../../../register/register.css';
import '../abm.css';

import {
  getPackById,
  getPacksByAlbumId,
  type Pack,
} from '../services/packsService';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Renderiza formularios de listado de sobres.
 *
 * @returns {JSX.Element}
 */
export const ListarSobre = () => {
  const [limiteSobres, setLimiteSobres] = useState<number>(5);
  const [sobreBuscado, setSobreBuscado] = useState<Pack | null>(null);
  const [sobresPorAlbum, setSobresPorAlbum] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string>('');

  const handleBuscarSobre = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setSobreBuscado(null);

    try {
      const formData = new FormData(e.currentTarget);
      const id = Number(formData.get('id'));

      const data = await getPackById(id);
      setSobreBuscado(data);
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : 'Error inesperado',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleListarSobres = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setSobresPorAlbum([]);

    try {
      const formData = new FormData(e.currentTarget);

      const albumId = Number(formData.get('album_id'));
      const limite = Number(formData.get('limite_sobres'));

      const data = await getPacksByAlbumId(albumId, limite);
      setSobresPorAlbum(data);
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : 'Error inesperado',
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
          Listar Sobres
        </h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">
              Buscar sobre por ID
            </h3>

            <p className="register-subtitle abm-subtitle mb-0">
              Busca un sobre específico mediante su identificador.
            </p>
          </div>

          <form onSubmit={handleBuscarSobre} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputSobreId" className="form-label">
                  ID del sobre
                </label>

                <input
                  type="number"
                  id="inputSobreId"
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
                {loading ? 'Buscando...' : 'Buscar sobre'}
              </button>
            </div>
          </form>

          {sobreBuscado && (
            <div className="abm-response mt-3 p-3 rounded-3 border">
              <pre className="mb-0">
                {JSON.stringify(sobreBuscado, null, 2)}
              </pre>
            </div>
          )}
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">
              Listar sobres por álbum
            </h3>

            <p className="register-subtitle abm-subtitle mb-0">
              Lista sobres pertenecientes a un álbum.
            </p>
          </div>

          <form onSubmit={handleListarSobres} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputAlbumSobreId" className="form-label">
                  ID del álbum
                </label>

                <input
                  type="number"
                  id="inputAlbumSobreId"
                  name="album_id"
                  min={1}
                  required
                  defaultValue={1}
                  className="form-control register-input abm-input"
                />
              </div>

              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputLimiteSobres" className="form-label">
                  Límite de sobres:{' '}
                  <strong className="abm-range-value">
                    {limiteSobres}
                  </strong>
                </label>

                <input
                  type="range"
                  id="inputLimiteSobres"
                  name="limite_sobres"
                  min={1}
                  max={15}
                  value={limiteSobres}
                  onChange={(e) =>
                    setLimiteSobres(Number(e.target.value))
                  }
                  className="form-range abm-range"
                />
              </div>
            </div>

            <div className="abm-actions pt-2">
              <button
                type="submit"
                className="btn register-btn abm-btn w-100"
                disabled={loading}
              >
                {loading ? 'Listando...' : 'Listar sobres'}
              </button>
            </div>
          </form>

          {sobresPorAlbum.length > 0 && (
            <div className="abm-response mt-3 p-3 rounded-3 border">
              <pre className="mb-0">
                {JSON.stringify(sobresPorAlbum, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {mensaje && (
          <div className="abm-response mt-2 p-3 rounded-3 border text-danger">
            {mensaje}
          </div>
        )}
      </div>
    </section>
  );
};