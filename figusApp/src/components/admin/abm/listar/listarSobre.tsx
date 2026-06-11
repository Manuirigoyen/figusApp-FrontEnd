import { useState } from 'react';
import React from 'react';
import '../../../register/register.css';
import '../abm.css';
import {
  getPackById,
  getPacksByAlbumId,
  type Pack,
} from '../services/packsService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

/**
 * Renderiza el formulario para listar sobres de figuritas.
 *
 * @returns {JSX.Element} El componente de listado de sobres.
 */
export const ListarSobre = () => {
  const [limiteSobres, setLimiteSobres] = useState<number>(5);
  const [datosParaTabla, setDatosParaTabla] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string>('');

  const handleBuscarSobre = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));

      const data = await getPackById(id);
      setDatosParaTabla(data);
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleListarSobres = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const albumId = Number(formData.get('album_id'));
      
      const data = await getPacksByAlbumId(albumId, limiteSobres);
      setDatosParaTabla(data);
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img src={adminLogo} alt="FigusApp" className="register-logo abm-logo img-fluid" />
        <h2 className="register-title abm-title mb-0">Listar Sobres</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar sobre por ID</h3>
          </div>
          <form onSubmit={handleBuscarSobre} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputSobreId" className="form-label">ID del sobre</label>
                <input type="number" id="inputSobreId" name="id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar sobre'}
              </button>
            </div>
          </form>
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Listar sobres por álbum</h3>
          </div>
          <form onSubmit={handleListarSobres} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputAlbumSobreId" className="form-label">ID del álbum</label>
                <input type="number" id="inputAlbumSobreId" name="album_id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
              <div className="col-12 abm-field">
                <label htmlFor="inputLimiteSobres" className="form-label">
                  Límite de sobres: <strong className="abm-range-value">{limiteSobres}</strong>
                </label>
                <input type="range" id="inputLimiteSobres" name="limite_sobres" min={1} max={15} value={limiteSobres} onChange={(e) => setLimiteSobres(Number(e.target.value))} className="form-range abm-range" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Listando...' : 'Listar sobres'}
              </button>
            </div>
          </form>
        </section>

        {datosParaTabla && <TablaResultados data={datosParaTabla} />}

        {mensaje && (
          <div className="text-danger mt-3 text-center fw-bold">
            {mensaje}
          </div>
        )}
      </div>
    </section>
  );
};