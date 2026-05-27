import { useState } from 'react';
import '../../../register/register.css';
import '../abm.css';

import {
  getStickerById,
  getStickersByAlbumId,
  type Sticker,
} from '../services/stickersService';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Listado de figuritas (stickers)
 */
export const ListarFigurita = () => {
  const [limiteFiguritas, setLimiteFiguritas] = useState<number>(5);

  const [stickerBuscado, setStickerBuscado] =
    useState<Sticker | null>(null);

  const [stickersPorAlbum, setStickersPorAlbum] = useState<
    Sticker[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Buscar sticker por ID
   */
  const handleBuscarFigurita = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStickerBuscado(null);

    try {
      const formData = new FormData(e.currentTarget);
      const id = Number(formData.get('id'));

      const data = await getStickerById(id);
      setStickerBuscado(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error inesperado',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Listar stickers por album_id
   */
  const handleListarPorAlbum = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStickersPorAlbum([]);

    try {
      const formData = new FormData(e.currentTarget);

      const albumId = Number(formData.get('album_id'));
      const limite = Number(formData.get('limite_figuritas'));

      const data = await getStickersByAlbumId(albumId, limite);

      setStickersPorAlbum(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error inesperado',
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
          Listar Figuritas
        </h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <h3 className="abm-list-subtitle">
            Buscar figurita por ID
          </h3>

          <form onSubmit={handleBuscarFigurita} className="abm-form">
            <input
              type="number"
              name="id"
              min={1}
              defaultValue={1}
              className="form-control abm-input"
            />

            <button
              type="submit"
              className="btn abm-btn w-100"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>

          {stickerBuscado && (
            <pre className="abm-response">
              {JSON.stringify(stickerBuscado, null, 2)}
            </pre>
          )}
        </section>

        <section className="abm-list-section">
          <h3 className="abm-list-subtitle">
            Listar por álbum
          </h3>

          <form onSubmit={handleListarPorAlbum} className="abm-form">
            <input
              type="number"
              name="album_id"
              min={1}
              defaultValue={1}
              className="form-control abm-input"
            />

            <label className="form-label">
              Límite:{' '}
              <strong className="abm-range-value">
                {limiteFiguritas}
              </strong>
            </label>

            <input
              type="range"
              name="limite_figuritas"
              min={1}
              max={15}
              value={limiteFiguritas}
              onChange={(e) =>
                setLimiteFiguritas(Number(e.target.value))
              }
              className="form-range abm-range"
            />

            <button
              type="submit"
              className="btn abm-btn w-100"
              disabled={loading}
            >
              {loading ? 'Listando...' : 'Listar'}
            </button>
          </form>

          {stickersPorAlbum.length > 0 && (
            <pre className="abm-response">
              {JSON.stringify(stickersPorAlbum, null, 2)}
            </pre>
          )}
        </section>

        {error && (
          <div className="text-danger mt-2">{error}</div>
        )}
      </div>
    </section>
  );
};