import { useEffect, useState } from 'react';

import {
  getAlbums,
} from '../services/albumsService';

import {
  updatePack,
} from '../services/packsService';

/**
 * Renderiza el formulario de modificación de sobres.
 */
export const ModificarSobre = () => {
  const updateLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [albums, setAlbums] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();

        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const id = Number(formData.get('id'));

    const album_id = Number(
      formData.get('album_id'),
    );

    const packClass = String(
      formData.get('class'),
    );

    const price = Number(formData.get('price'));

    const stock = Number(formData.get('stock'));

    const capacity = Number(
      formData.get('capacity'),
    );

    const cover_image = formData.get(
      'cover_image',
    ) as File;

    try {
      await updatePack(id, {
        album_id,
        class: packClass,
        price,
        stock,
        capacity,
        cover_image:
          cover_image.size > 0
            ? cover_image
            : undefined,
      });

      console.log('Sobre modificado');
    } catch (error) {
      console.error(error);
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
          Modificar Sobre
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden modificar sobres existentes
          del sistema.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="modificar_sobre"
          className="abm-form form_modificar"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarSobreId"
                className="form-label"
              >
                ID del sobre
              </label>

              <input
                type="number"
                id="inputModificarSobreId"
                name="id"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={1}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarAlbumSobre"
                className="form-label"
              >
                Álbum asociado
              </label>

              <select
                id="selectModificarAlbumSobre"
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
                htmlFor="selectModificarClaseSobre"
                className="form-label"
              >
                Nueva clase
              </label>

              <select
                id="selectModificarClaseSobre"
                name="class"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una clase
                </option>

                <option value="comun">
                  Común
                </option>

                <option value="especial">
                  Especial
                </option>

                <option value="legendario">
                  Legendario
                </option>
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarPrecioSobre"
                className="form-label"
              >
                Nuevo precio
              </label>

              <input
                type="number"
                id="inputModificarPrecioSobre"
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
                htmlFor="inputModificarStockSobre"
                className="form-label"
              >
                Nuevo stock
              </label>

              <input
                type="number"
                id="inputModificarStockSobre"
                name="stock"
                className="form-control register-input abm-input"
                min={0}
                defaultValue={0}
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarCapacidadSobre"
                className="form-label"
              >
                Nueva capacidad
              </label>

              <input
                type="number"
                id="inputModificarCapacidadSobre"
                name="capacity"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={7}
              />
            </div>

            <div className="col-12 abm-field">
              <label
                htmlFor="inputModificarImagenSobre"
                className="form-label"
              >
                Nueva imagen
              </label>

              <input
                type="file"
                id="inputModificarImagenSobre"
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
              Modificar
            </button>
          </div>
        </form>
      </div>

      <div
        id="respuesta_modificar_sobre"
        className="abm-response"
      />
    </section>
  );
};