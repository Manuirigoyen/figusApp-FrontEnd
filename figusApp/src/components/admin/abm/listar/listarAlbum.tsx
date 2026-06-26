import { useState } from 'react';
import React from 'react';
import '../../../register/register.css';
import '../abm.css';
import { getAlbumById, getAlbums, type Album } from '../services/albumsService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

/**
 * Componente para listar álbumes desde el panel de administración.
 */
export const ListarAlbum = () => {
  const [limiteAlbumes, setLimiteAlbumes] = useState<number>(5);
  const [albumBuscado, setAlbumBuscado] = useState<Album | null>(null);
  const [albumesListados, setAlbumesListados] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscarAlbum = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAlbumBuscado(null);
    setAlbumesListados([]);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));
      const data = await getAlbumById(id);
      setAlbumBuscado(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el álbum');
    } finally {
      setLoading(false);
    }
  };

  const handleListarAlbumes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAlbumBuscado(null);
    setAlbumesListados([]);

    try {
      const data = await getAlbums();
      setAlbumesListados(data.slice(0, limiteAlbumes));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar álbumes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img src={adminLogo} alt="FigusApp" className="register-logo abm-logo img-fluid" />
        <h2 className="register-title abm-title mb-0">Listar Álbumes</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar álbum por ID</h3>
          </div>
          <form onSubmit={handleBuscarAlbum} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputAlbumId" className="form-label">ID del álbum</label>
                <input type="number" id="inputAlbumId" name="id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar álbum'}
              </button>
            </div>
          </form>
          {albumBuscado && <TablaResultados data={albumBuscado} />}
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Listar álbumes</h3>
          </div>
          <form onSubmit={handleListarAlbumes} className="abm-form">
            <div className="row g-3">
              <div className="col-12 abm-field">
                <label htmlFor="inputLimiteAlbumes" className="form-label">
                  Límite: <strong className="abm-range-value">{limiteAlbumes}</strong>
                </label>
                <input type="range" id="inputLimiteAlbumes" name="limite_albumes" min={1} max={50} value={limiteAlbumes} onChange={(e) => setLimiteAlbumes(Number(e.target.value))} className="form-range abm-range" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Listando...' : 'Listar álbumes'}
              </button>
            </div>
          </form>
          {albumesListados.length > 0 && <TablaResultados data={albumesListados} />}
        </section>

        {error && <div className="text-danger mt-3 text-center fw-bold">{error}</div>}
      </div>
    </section>
  );
};