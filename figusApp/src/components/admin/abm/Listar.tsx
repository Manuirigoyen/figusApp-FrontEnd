export const Listar = () => {
  return (
    <>
      {listarAlbum()}
    </>
  );
};

const listarAlbum = () => (
  <div className="card bg-light border rounded p-3 mb-4">
    <h5 className="card-title mb-3">Listar Álbumes</h5>

    <div className="mb-3">
      <p className="card-text mb-2">
        Se puede buscar un álbum específico indicando su ID.
      </p>

      <form name="listar_album_por_id" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputAlbumId" className="form-label">
              ID del álbum
            </label>
            <input
              type="number"
              id="inputAlbumId"
              name="id"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>

          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Buscar Álbum
            </button>
          </div>
        </div>
      </form>

      <div id="respuesta_listar_album_por_id" className="mt-2"></div>
    </div>

    <hr className="my-3" />

    <div className="mb-3">
      <p className="card-text mb-2">
        Se pueden listar varios álbumes indicando un límite de resultados.
      </p>

      <form name="listar_album_por_limite" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputLimiteAlbumes" className="form-label">
              Límite de álbumes
            </label>
            <input
              type="range"
              className="form-range"
              id="inputLimiteAlbumes"
              name="limite_albumes"
              min={1}
              max={50}
              defaultValue={5}
            />
          </div>

          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Listar Álbumes
            </button>
          </div>
        </div>
      </form>

      <div id="respuesta_listar_album_por_limite" className="mt-2"></div>
    </div>
  </div>
);

const listarFigurita = () => (
  <div className="card bg-light border rounded p-3 mb-4">
    <h5 className="card-title mb-3">Listar Figuritas</h5>

    <div className="mb-3">
      <p className="card-text mb-2">
        Se puede buscar una figurita específica indicando su ID.
      </p>
      <form name="listar_figurita_por_id" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputFiguritaId" className="form-label">
              ID de la figurita
            </label>
            <input
              type="number"
              id="inputFiguritaId"
              name="id"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>
          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Buscar Figurita
            </button>
          </div>
        </div>
      </form>
      <div id="respuesta_listar_figurita_por_id" className="mt-2"></div>
    </div>

    <hr className="my-3" />

    <div>
      <p className="card-text mb-2">
        Se pueden listar todas las figuritas de un sobre específico indicando el
        ID del sobre y un límite de resultados.
      </p>
      <form name="listar_figurita_por_sobre" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputSobreId" className="form-label">
              ID del sobre
            </label>
            <input
              type="number"
              id="inputSobreId"
              name="idSobre"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>

          <div className="w-100 w-md-auto">
            <label htmlFor="inputLimiteFiguritas" className="form-label">
              Límite de figuritas
            </label>
            <input
              type="range"
              className="form-range"
              id="inputLimiteFiguritas"
              name="limite_figuritas"
              min={1}
              max={50}
              defaultValue={5}
            />
          </div>

          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Listar
            </button>
          </div>
        </div>
      </form>
      <div id="respuesta_listar_figurita_por_sobre" className="mt-2"></div>
    </div>
  </div>
);

const listarSobre = () => (
  <div className="card bg-light border rounded p-3 mb-4">
    <h5 className="card-title mb-3">Listar Sobres</h5>

    <div className="mb-3">
      <p className="card-text mb-2">
        Se puede buscar un sobre específico indicando su ID.
      </p>
      <form name="listar_sobre_por_id" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputSobreId" className="form-label">
              ID del sobre
            </label>
            <input
              type="number"
              id="inputSobreId"
              name="id"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>
          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Buscar Sobre
            </button>
          </div>
        </div>
      </form>
      <div id="respuesta_listar_sobre_por_id" className="mt-2"></div>
    </div>

    <hr className="my-3" />

    <div>
      <p className="card-text mb-2">
        Se pueden listar todos los sobres pertenecientes a un álbum específico,
        indicando su ID y un límite de resultados.
      </p>
      <form name="listar_sobre_por_album" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputAlbumId" className="form-label">
              ID del álbum
            </label>
            <input
              type="number"
              id="inputAlbumId"
              name="idAlbum"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>

          <div className="w-100 w-md-auto">
            <label htmlFor="inputLimiteSobres" className="form-label">
              Límite de sobres
            </label>
            <input
              type="range"
              className="form-range"
              id="inputLimiteSobres"
              name="limite_sobres"
              min={1}
              max={50}
              defaultValue={5}
            />
          </div>

          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Listar Sobres
            </button>
          </div>
        </div>
      </form>
      <div id="respuesta_listar_sobre_por_album" className="mt-2"></div>
    </div>
  </div>
);

const listarUsuario = () => (
  <div className="card bg-light border rounded p-3 mb-4">
    <h5 className="card-title mb-3">Listar Usuarios</h5>

    <div className="mb-3">
      <p className="card-text mb-2">
        Se puede buscar un usuario específico indicando su ID.
      </p>
      <form name="listar_usuario_por_id" className="form_listar">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <div className="w-100 w-md-auto">
            <label htmlFor="inputUsuarioId" className="form-label">
              ID del usuario
            </label>
            <input
              type="number"
              id="inputUsuarioId"
              name="id"
              className="form-control"
              min={1}
              required
              defaultValue={1}
            />
          </div>
          <div className="mt-2 mt-md-0">
            <button type="submit" className="btn btn-primary">
              Buscar Usuario
            </button>
          </div>
        </div>
      </form>
      <div id="respuesta_listar_usuario_por_id" className="mt-2"></div>
    </div>
  </div>
);