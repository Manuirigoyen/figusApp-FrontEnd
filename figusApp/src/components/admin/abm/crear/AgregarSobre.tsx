import { useEffect, useState } from 'react';
import {
  getAlbums,
  type Album,
} from '../services/albumsService';

/**
 * Renderiza el formulario de alta de sobres.
 */
export const AgregarSobre = () => {
  const adminLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] =
    useState(false);

  const [albumsError, setAlbumsError] =
    useState('');

  const packClasses = [
    {
      value: 'bronce',
      label: 'bronce',
    },
    {
      value: 'plateado',
      label: 'plateado',
    },
    {
      value: 'dorado',
      label: 'dorado',
    },
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
            : 'Error al cargar álbumes',
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
          Agregar Sobre
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden agregar sobres indicando álbum,
          clase, precio, stock, capacidad e imagen.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="agregar_sobre"
          className="abm-form"
        >
          <div className="row g-3">
            <div className="col-12 abm-field">
              <label
                htmlFor="selectAlbumSobre"
                className="form-label"
              >
                Álbum asociado
              </label>

              <select
                id="selectAlbumSobre"
                name="album_id"
                className="form-select register-input abm-input cls_album"
                defaultValue=""
                required
                disabled={loadingAlbums}
              >
                <option value="" disabled>
                  {loadingAlbums
                    ? 'Cargando álbumes...'
                    : 'Seleccioná un álbum'}
                </option>

                {albums.map((album) => (
                  <option
                    key={album.id}
                    value={album.id}
                  >
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
                htmlFor="selectClaseSobre"
                className="form-label"
              >
                Clase del sobre
              </label>

              <select
                id="selectClaseSobre"
                name="class"
                className="form-select register-input abm-input cls_pack_class"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                {packClasses.map((packClass) => (
                  <option
                    key={packClass.value}
                    value={packClass.value}
                  >
                    {packClass.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputPrecioSobre"
                className="form-label"
              >
                Precio del sobre
              </label>

              <input
                type="number"
                id="inputPrecioSobre"
                name="price"
                className="form-control register-input abm-input"
                min={0}
                step="0.01"
                defaultValue={0}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputStockSobre"
                className="form-label"
              >
                Stock disponible
              </label>

              <input
                type="number"
                id="inputStockSobre"
                name="stock"
                className="form-control register-input abm-input"
                min={0}
                defaultValue={0}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputCapacidadSobre"
                className="form-label"
              >
                Capacidad del sobre
              </label>

              <input
                type="number"
                id="inputCapacidadSobre"
                name="capacity"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={7}
                required
              />
            </div>

            <div className="col-12 abm-field">
              <label
                htmlFor="inputImagenSobre"
                className="form-label"
              >
                Imagen del sobre
              </label>

              <input
                type="file"
                id="inputImagenSobre"
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
              Agregar sobre
            </button>
          </div>
        </form>
      </div>

      <div
        id="respuesta_agregar_sobre"
        className="abm-response"
      />
    </section>
  );
};