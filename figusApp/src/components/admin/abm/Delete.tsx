export const Baja = () => {
  return (
    <>
      {eliminarAlbum()}
    </>
  );
};

const eliminarAlbum = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Eliminar Álbum</h5>
    <p className="card-text mb-3">Se pueden eliminar álbumes por ID.</p>

    <form name="eliminar_album" className="form_eliminar">
      <div className="mb-3">
        <label htmlFor="inputEliminarAlbumId" className="form-label">
          ID del álbum
        </label>
        <input
          type="number"
          id="inputEliminarAlbumId"
          name="id"
          className="form-control w-100"
          required
          defaultValue={1}
        />
      </div>

      <button type="submit" className="btn btn-danger mt-2 btn-eliminar">
        Eliminar
      </button>
    </form>

    <div id="respuesta_eliminar_album" className="mt-2"></div>
  </div>
);

const eliminarFigurita = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Eliminar Figurita</h5>
    <p className="card-text mb-3">Se pueden eliminar figuritas por ID.</p>

    <form name="eliminar_figurita" className="form_eliminar">
      <div className="mb-3">
        <label htmlFor="inputEliminarFiguritaId" className="form-label">
          ID de la figurita
        </label>
        <input
          type="number"
          id="inputEliminarFiguritaId"
          name="id"
          className="form-control w-100"
          required
          defaultValue={1}
        />
      </div>

      <button type="submit" className="btn btn-danger mt-2 btn-eliminar">
        Eliminar
      </button>
    </form>

    <div id="respuesta_eliminar_figurita" className="mt-2"></div>
  </div>
);

const eliminarSobre = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Eliminar Sobre</h5>
    <p className="card-text mb-3">Se pueden eliminar sobres por ID.</p>

    <form name="eliminar_sobre" className="form_eliminar">
      <div className="mb-3">
        <label htmlFor="inputEliminarSobreId" className="form-label">
          ID del sobre
        </label>
        <input
          type="number"
          id="inputEliminarSobreId"
          name="id"
          className="form-control w-100"
          required
          defaultValue={1}
        />
      </div>

      <button type="submit" className="btn btn-danger mt-2 btn-eliminar">
        Eliminar
      </button>
    </form>

    <div id="respuesta_eliminar_sobre" className="mt-2"></div>
  </div>
);

const eliminarUsuario = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Eliminar Usuario</h5>
    <p className="card-text mb-3">Se pueden eliminar usuarios por ID.</p>

    <form name="eliminar_usuario" className="form_eliminar">
      <div className="mb-3">
        <label htmlFor="inputEliminarUsuarioId" className="form-label">
          ID del usuario
        </label>
        <input
          type="number"
          id="inputEliminarUsuarioId"
          name="id"
          className="form-control w-100"
          required
          defaultValue={1}
        />
      </div>

      <button type="submit" className="btn btn-danger mt-2 btn-eliminar">
        Eliminar
      </button>
    </form>

    <div id="respuesta_eliminar_usuario" className="mt-2"></div>
  </div>
);