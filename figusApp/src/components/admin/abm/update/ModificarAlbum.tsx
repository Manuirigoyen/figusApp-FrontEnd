import { useState } from 'react';

import { COUNTRIES } from '../../../../constants/countries';

import {
  updateAlbum,
} from '../services/albumsService';

const ALBUM_CLASSES = [
  'mundial',
  'continental',
  'nacional',
  'local',
];

/**
 * Renderiza el formulario de modificación de álbumes.
 */
export const ModificarAlbum = () => {
  const updateLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    responseMessage,
    setResponseMessage,
  ] = useState('');

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setResponseMessage('');

    try {
      const formData = new FormData(e.currentTarget);

      const id = Number(formData.get('id'));

      const albumData = {
        name: String(formData.get('name')),
        class: String(formData.get('class')),
        nationality: String(
          formData.get('nationality'),
        ),
        description: String(
          formData.get('description') || '',
        ),
        capacity: Number(
          formData.get('capacity'),
        ),
        cover_image:
          formData.get('cover_image') instanceof File
            ? (formData.get(
                'cover_image',
              ) as File)
            : null,
      };

      await updateAlbum(id, albumData);

      setResponseMessage(
        'Álbum modificado correctamente',
      );

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);

      setResponseMessage(
        error instanceof Error
          ? error.message
          : 'Error al modificar álbum',
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
          Modificar Álbum
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden modificar álbumes existentes del sistema.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="modificar_album"
          className="abm-form form_modificar"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarAlbumId"
                className="form-label"
              >
                ID del álbum
              </label>

              <input
                type="number"
                id="inputModificarAlbumId"
                name="id"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={1}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarNombreAlbum"
                className="form-label"
              >
                Nuevo nombre
              </label>

              <input
                type="text"
                id="inputModificarNombreAlbum"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Nombre del álbum"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarClaseAlbum"
                className="form-label"
              >
                Nueva clase
              </label>

              <select
                id="selectModificarClaseAlbum"
                name="class"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                {ALBUM_CLASSES.map((albumClass) => (
                  <option
                    key={albumClass}
                    value={albumClass}
                  >
                    {albumClass
                      .charAt(0)
                      .toUpperCase() +
                      albumClass.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarNacionalidadAlbum"
                className="form-label"
              >
                Nueva nacionalidad
              </label>

              <select
                id="selectModificarNacionalidadAlbum"
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

            <div className="col-12 abm-field">
              <label
                htmlFor="inputModificarDescripcionAlbum"
                className="form-label"
              >
                Nueva descripción
              </label>

              <textarea
                id="inputModificarDescripcionAlbum"
                name="description"
                className="form-control register-input abm-input abm-textarea"
                rows={4}
                placeholder="Descripción del álbum"
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarCapacidadAlbum"
                className="form-label"
              >
                Nueva capacidad
              </label>

              <input
                type="number"
                id="inputModificarCapacidadAlbum"
                name="capacity"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={100}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarImagenAlbum"
                className="form-label"
              >
                Nueva imagen de portada
              </label>

              <input
                type="file"
                id="inputModificarImagenAlbum"
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
          id="respuesta_modificar_album"
          className="abm-response"
        >
          {responseMessage}
        </div>
      )}
    </section>
  );
};