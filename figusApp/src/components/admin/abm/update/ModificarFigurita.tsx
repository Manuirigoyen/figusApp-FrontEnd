import { useEffect, useState } from 'react';

import { COUNTRIES } from '../../../../constants/countries';

import {
  getAlbums,
} from '../services/albumsService';

import {
  updateSticker,
} from '../services/stickersService';

const STICKER_CLASSES = [
  'comun',
  'especial',
  'legendaria',
];

/**
 * Renderiza el formulario de modificación de figuritas.
 */
export const ModificarFigurita = () => {
  const updateLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [albums, setAlbums] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    responseMessage,
    setResponseMessage,
  ] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsData = await getAlbums();

        setAlbums(albumsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setResponseMessage('');

    try {
      const formData = new FormData(
        e.currentTarget,
      );

      const id = Number(
        formData.get('id'),
      );

      const stickerData = {
        album_id: Number(
          formData.get('album_id'),
        ),
        class: String(
          formData.get('class'),
        ),
        name: String(
          formData.get('name'),
        ),
        nationality: String(
          formData.get('nationality'),
        ),
        cover_image:
          formData.get(
            'cover_image',
          ) instanceof File
            ? (formData.get(
                'cover_image',
              ) as File)
            : null,
      };

      await updateSticker(
        id,
        stickerData,
      );

      setResponseMessage(
        'Figurita modificada correctamente',
      );

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);

      setResponseMessage(
        error instanceof Error
          ? error.message
          : 'Error al modificar figurita',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={updateLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />

        <h2 className="register-title abm-title mb-2">
          Modificar Figurita
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden modificar figuritas existentes del sistema.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="modificar_figurita"
          className="abm-form form_modificar"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarFiguId"
                className="form-label"
              >
                ID de la figurita
              </label>

              <input
                type="number"
                id="inputModificarFiguId"
                name="id"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={1}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarAlbumFigurita"
                className="form-label"
              >
                Álbum asociado
              </label>

              <select
                id="selectModificarAlbumFigurita"
                name="album_id"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná un álbum
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
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarClaseFigurita"
                className="form-label"
              >
                Nueva clase
              </label>

              <select
                id="selectModificarClaseFigurita"
                name="class"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                {STICKER_CLASSES.map(
                  (stickerClass) => (
                    <option
                      key={stickerClass}
                      value={stickerClass}
                    >
                      {stickerClass
                        .charAt(0)
                        .toUpperCase() +
                        stickerClass.slice(1)}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarNombreFigurita"
                className="form-label"
              >
                Nuevo nombre
              </label>

              <input
                type="text"
                id="inputModificarNombreFigurita"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Nombre de la figurita"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarNacionalidadFigurita"
                className="form-label"
              >
                Nueva nacionalidad
              </label>

              <select
                id="selectModificarNacionalidadFigurita"
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
                htmlFor="inputModificarImagenFigurita"
                className="form-label"
              >
                Nueva imagen
              </label>

              <input
                type="file"
                id="inputModificarImagenFigurita"
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
              disabled={isLoading}
            >
              {isLoading
                ? 'Modificando...'
                : 'Modificar'}
            </button>
          </div>
        </form>
      </div>

      {responseMessage && (
        <div
          id="respuesta_modificar_figurita"
          className="abm-response"
        >
          {responseMessage}
        </div>
      )}
    </section>
  );
};