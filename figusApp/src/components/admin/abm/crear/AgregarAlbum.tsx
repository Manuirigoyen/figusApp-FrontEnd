import { COUNTRIES } from '../../../../constants/countries';

/**
 * Renderiza el formulario de alta de álbumes.
 */
export const AgregarAlbum = () => {
  const adminLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const albumClasses = [
    {
      value: 'mundial',
      label: 'Mundial',
    },
    {
      value: 'continental',
      label: 'Continental',
    },
    {
      value: 'nacional',
      label: 'Nacional',
    },
    {
      value: 'local',
      label: 'Local',
    },
  ];

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={adminLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />

        <h2 className="register-title abm-title mb-2">
          Agregar Álbum
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden agregar álbumes indicando nombre, clase,
          nacionalidad, descripción, capacidad e imagen.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="agregar_album"
          className="abm-form"
        >
          <div className="row g-3">
            <div className="col-12 abm-field">
              <label
                htmlFor="inputNombreAlbum"
                className="form-label"
              >
                Nombre del álbum
              </label>

              <input
                type="text"
                id="inputNombreAlbum"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Ej: Mundial Qatar 2022"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectClaseAlbum"
                className="form-label"
              >
                Clase del álbum
              </label>

              <select
                id="selectClaseAlbum"
                name="class"
                className="form-select register-input abm-input cls_album_class"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                {albumClasses.map((albumClass) => (
                  <option
                    key={albumClass.value}
                    value={albumClass.value}
                  >
                    {albumClass.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputNacionalidadAlbum"
                className="form-label"
              >
                Nacionalidad
              </label>

              <select
                id="inputNacionalidadAlbum"
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
                htmlFor="inputDescripcionAlbum"
                className="form-label"
              >
                Descripción
              </label>

              <textarea
                id="inputDescripcionAlbum"
                name="description"
                className="form-control register-input abm-input abm-textarea"
                rows={4}
                placeholder="Describí el álbum..."
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputCapacidadAlbum"
                className="form-label"
              >
                Capacidad del álbum
              </label>

              <input
                type="number"
                id="inputCapacidadAlbum"
                name="capacity"
                className="form-control register-input abm-input"
                min={0}
                defaultValue={0}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputImagenAlbum"
                className="form-label"
              >
                Imagen de portada
              </label>

              <input
                type="file"
                id="inputImagenAlbum"
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
              Agregar álbum
            </button>
          </div>
        </form>
      </div>

      <div
        id="respuesta_agregar_album"
        className="abm-response"
      />
    </section>
  );
};