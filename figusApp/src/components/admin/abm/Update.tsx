export const Update = () => {
  return (
    <>
      {modificarAlbum()}
    </>
  );
};

const modificarAlbum = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Modificar Álbum</h5>
    <p className="card-text mb-3">Se pueden modificar álbumes.</p>

    <form name="modificar_album" className="form_modificar">
      <div className="mb-3">
        <label htmlFor="inputModificarAlbumId" className="form-label">
          ID del álbum
        </label>
        <input
          type="number"
          id="inputModificarAlbumId"
          name="id"
          className="form-control w-100"
          required
          min={1}
          defaultValue={1}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarPais" className="form-label">
          Nuevo país
        </label>
        <select
          id="selectModificarPais"
          name="pais"
          className="form-select w-100 cls_pais"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarClase" className="form-label">
          Nueva clase de álbum
        </label>
        <select
          id="selectModificarClase"
          name="claseAlbum"
          className="form-select w-100 cls_album"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarPrecio" className="form-label">
          Nuevo precio
        </label>
        <input
          type="number"
          id="inputModificarPrecio"
          name="precio"
          className="form-control w-100"
          required
          min={0}
          defaultValue={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarStock" className="form-label">
          Nuevo stock disponible
        </label>
        <input
          type="range"
          id="inputModificarStock"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarImagen" className="form-label">
          Nueva imagen
        </label>
        <input
          type="file"
          id="inputModificarImagen"
          name="imagen"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Modificar
      </button>
    </form>

    <div id="respuesta_modificar_album" className="mt-2"></div>
  </div>
);

const modificarFigurita = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Modificar Figurita</h5>
    <p className="card-text mb-3">Se pueden modificar figuritas.</p>

    <form name="modificar_figurita" className="form_modificar">
      <div className="mb-3">
        <label htmlFor="inputModificarFiguId" className="form-label">
          ID de la figurita
        </label>
        <input
          type="number"
          id="inputModificarFiguId"
          name="id"
          className="form-control w-100"
          required
          min={1}
          defaultValue={1}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarSobre" className="form-label">
          Clase del sobre seleccionado
        </label>
        <select
          id="selectModificarSobre"
          name="idSobre"
          className="form-select w-100 cls_sobre"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarNombre" className="form-label">
          Nuevo nombre
        </label>
        <input
          type="text"
          id="inputModificarNombre"
          name="nombre"
          className="form-control w-100"
          required
          placeholder="(nombre del jugador)"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarClaseFig" className="form-label">
          Nueva clase de figurita
        </label>
        <select
          id="selectModificarClaseFig"
          name="claseFigurita"
          className="form-select w-100 cls_figurita"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarPrecioFigu" className="form-label">
          Nuevo precio
        </label>
        <input
          type="number"
          id="inputModificarPrecioFigu"
          name="precio"
          className="form-control w-100"
          required
          min={0}
          defaultValue={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarStockFigu" className="form-label">
          Nuevo stock disponible
        </label>
        <input
          type="range"
          id="inputModificarStockFigu"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarImagenFigu" className="form-label">
          Nueva imagen
        </label>
        <input
          type="file"
          id="inputModificarImagenFigu"
          name="imagen"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Modificar
      </button>
    </form>

    <div id="respuesta_modificar_figurita" className="mt-2"></div>
  </div>
);

const modificarSobre = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Modificar Sobre</h5>
    <p className="card-text mb-3">Se pueden modificar sobres.</p>

    <form name="modificar_sobre" className="form_modificar">
      <div className="mb-3">
        <label htmlFor="inputModificarSobreId" className="form-label">
          ID del sobre
        </label>
        <input
          type="number"
          id="inputModificarSobreId"
          name="id"
          className="form-control w-100"
          required
          min={1}
          defaultValue={1}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarAlbum" className="form-label">
          Clase del álbum seleccionado
        </label>
        <select
          id="selectModificarAlbum"
          name="idAlbum"
          className="form-select w-100 cls_album"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarClaseSobre" className="form-label">
          Nueva clase de sobre
        </label>
        <select
          id="selectModificarClaseSobre"
          name="claseSobre"
          className="form-select w-100 cls_sobre"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarStockSobre" className="form-label">
          Nuevo stock disponible
        </label>
        <input
          type="range"
          id="inputModificarStockSobre"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarImagenSobre" className="form-label">
          Nueva imagen
        </label>
        <input
          type="file"
          id="inputModificarImagenSobre"
          name="imagen"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Modificar
      </button>
    </form>

    <div id="respuesta_modificar_sobre" className="mt-2"></div>
  </div>
);

const modificarUsuario = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Modificar Usuario</h5>
    <p className="card-text mb-3">Se pueden modificar usuarios.</p>

    <form name="modificar_usuario" className="form_modificar">
      <div className="mb-3">
        <label htmlFor="inputModificarUsuarioId" className="form-label">
          ID del usuario
        </label>
        <input
          type="number"
          id="inputModificarUsuarioId"
          name="id"
          className="form-control w-100"
          required
          min={1}
          defaultValue={1}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarNombreUsuario" className="form-label">
          Nuevo nombre de usuario
        </label>
        <input
          type="text"
          id="inputModificarNombreUsuario"
          name="nombreUsuario"
          className="form-control w-100"
          placeholder="(nombre de usuario)"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarPassword" className="form-label">
          Nueva contraseña
        </label>
        <input
          type="password"
          id="inputModificarPassword"
          name="password"
          className="form-control w-100"
          placeholder="*******"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarEmail" className="form-label">
          Nuevo correo electrónico
        </label>
        <input
          type="email"
          id="inputModificarEmail"
          name="email"
          className="form-control w-100"
          placeholder="figusApp@gmail.com"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarTelefono" className="form-label">
          Nuevo número de teléfono
        </label>
        <input
          type="tel"
          id="inputModificarTelefono"
          name="telefono"
          className="form-control w-100"
          placeholder="+5492983547677"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectModificarPais" className="form-label">
          Nuevo país de origen
        </label>
        <select
          id="selectModificarPais"
          name="pais"
          className="form-select w-100 cls_pais"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarFechaNacimiento" className="form-label">
          Nueva fecha de nacimiento
        </label>
        <input
          type="date"
          id="inputModificarFechaNacimiento"
          name="fechaNacimiento"
          className="form-control w-100"
          required
          min="1875-12-02"
          max="2013-12-02"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputModificarFotoPerfil" className="form-label">
          Nueva foto de perfil
        </label>
        <input
          type="file"
          id="inputModificarFotoPerfil"
          name="fotoPerfil"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Modificar
      </button>
    </form>

    <div id="respuesta_modificar_usuario" className="mt-2"></div>
  </div>
);