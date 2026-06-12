import { useState } from 'react';
import React from 'react';
import '../../../register/register.css';
import '../abm.css';
import {
  getStickerById,
  getStickersByAlbumId,
} from '../services/stickersService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

/**
 * Componente para listar figuritas desde el panel de administración.
 */
export const ListarFigurita = () => {
  const [limiteFiguritas, setLimiteFiguritas] = useState<number>(5);
  const [datosParaTabla, setDatosParaTabla] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscarFigurita = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));
      
      const data = await getStickerById(id);
      setDatosParaTabla(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar la figurita');
    } finally {
      setLoading(false);
    }
  };

  const handleListarPorAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const albumId = Number(formData.get('album_id'));
      
      const data = await getStickersByAlbumId(albumId, limiteFiguritas);
      setDatosParaTabla(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar figuritas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img src={adminLogo} alt="FigusApp" className="register-logo abm-logo img-fluid" />
        <h2 className="register-title abm-title mb-0">Listar Figuritas</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar figurita por ID</h3>
          </div>
          <form onSubmit={handleBuscarFigurita} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputId" className="form-label">ID de la figurita</label>
                <input type="number" id="inputId" name="id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar figurita'}
              </button>
            </div>
          </form>
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Listar por álbum</h3>
          </div>
          <form onSubmit={handleListarPorAlbum} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputAlbumId" className="form-label">ID del álbum</label>
                <input type="number" id="inputAlbumId" name="album_id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
              <div className="col-12 abm-field">
                <label htmlFor="inputLimite" className="form-label">
                  Límite: <strong className="abm-range-value">{limiteFiguritas}</strong>
                </label>
                <input type="range" id="inputLimite" name="limite_figuritas" min={1} max={15} value={limiteFiguritas} onChange={(e) => setLimiteFiguritas(Number(e.target.value))} className="form-range abm-range" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Listando...' : 'Listar figuritas'}
              </button>
            </div>
          </form>
        </section>

        {datosParaTabla && <TablaResultados data={datosParaTabla} />}

        {error && <div className="text-danger mt-3 text-center fw-bold">{error}</div>}
      </div>
    </section>
  );
};