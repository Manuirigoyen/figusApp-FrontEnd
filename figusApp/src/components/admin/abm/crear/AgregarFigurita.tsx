import { useEffect, useState } from 'react';
import { COUNTRIES } from '../../../../constants/countries';
import { getAlbums, type Album } from '../services/albumsService';

/**
 * Renderiza el formulario de alta de figuritas.
 */
export const AgregarFigurita = () => {
  const adminLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [albumsError, setAlbumsError] = useState('');

  const stickerClasses = [
    { value: 'comun', label: 'Común' },
    { value: 'especial', label: 'Especial' },
    { value: 'legendaria', label: 'Legendaria' },
  ];

  useEffect(() => {
    const cargarAlbums = async () => {
      setLoadingAlbums(true);
      setAlbumsError('');

      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        setAlbumsError(
          error instanceof Error
            ? error.message
            : 'Error inesperado al cargar álbumes',
        );
      } finally {
        setLoadingAlbums(false);
      }
    };

    cargarAlbums();
  }, []);

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={adminLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />

        <h2 className="register-title abm-title mb-2">
          Agregar Figurita
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden agregar figuritas indicando álbum, clase, nombre, nacionalidad e imagen.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="agregar_figurita"
          className="abm-form"
        >
          <div className="row g-3">
            <div className="col-12 abm-field">
              <label
                htmlFor="selectAlbumFigurita"
                className="form-label"
              >
                Álbum asociado
              </label>

              <select
                id="selectAlbumFigurita"
                name="album_id"
                className="form-select register-input abm-input cls_album"
                defaultValue=""
                required
                disabled={loadingAlbums}
              >
                <option value="" disabled>
                  {loadingAlbums ? 'Cargando álbumes...' : 'Seleccioná un álbum'}
                </option>

                {albums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>

              {albumsError && (
                <small className="text-danger d-block mt-1">
                  {albumsError}
                </small>
              )}
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectClaseFigurita"
                className="form-label"
              >
                Clase de figurita
              </label>

              <select
                id="selectClaseFigurita"
                name="class"
                className="form-select register-input abm-input cls_sticker_class"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                {stickerClasses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputNombreFigurita"
                className="form-label"
              >
                Nombre de la figurita
              </label>

              <input
                type="text"
                id="inputNombreFigurita"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Ej: Lionel Messi"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputNacionalidadFigurita"
                className="form-label"
              >
                Nacionalidad
              </label>

              <select
                id="inputNacionalidadFigurita"
                name="nationality"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná un país
                </option>

                {COUNTRIES.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputImagenFigurita"
                className="form-label"
              >
                Imagen de la figurita
              </label>

              <input
                type="file"
                id="inputImagenFigurita"
                name="cover_image"
                className="form-control register-input abm-input"
                accept="image/*"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              className="btn register-btn abm-btn w-100"
            >
              Agregar figurita
            </button>
          </div>
        </form>
      </div>

      <div
        id="respuesta_agregar_figurita"
        className="abm-response"
      />
    </section>
  );
};