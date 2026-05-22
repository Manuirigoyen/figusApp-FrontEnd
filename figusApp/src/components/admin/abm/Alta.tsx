export const Alta = () => {
  return (
    <>
      {agregarAlbum()}
      {agregarFigurita()}
    </>
  );
};

const agregarAlbum = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Agregar Álbum</h5>
    <p className="card-text mb-3">
      Se pueden agregar álbumes indicando país, tipo, nombre, precio, stock e imagen.
    </p>

    <form name="agregar_album" className="form_alta">
      <div className="mb-3">
        <label htmlFor="selectPais" className="form-label">Nombre del país</label>
        <select
          id="selectPais"
          name="pais"
          className="form-select w-100 cls_pais"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectClase" className="form-label">Clase de álbum</label>
        <select
          id="selectClase"
          name="clase"
          className="form-select w-100 cls_album"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputNombreAlbum" className="form-label">Nombre del álbum</label>
        <input
          type="text"
          id="inputNombreAlbum"
          name="nombre"
          className="form-control w-100"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputPrecio" className="form-label">Precio del álbum</label>
        <input
          type="number"
          id="inputPrecio"
          name="precio"
          className="form-control w-100"
          defaultValue={0}
          min={0}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputStock" className="form-label">Stock disponible</label>
        <input
          type="range"
          id="inputStock"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={5}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputImagen" className="form-label">Imagen del álbum</label>
        <input
          type="file"
          id="inputImagen"
          name="imagen"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">Agregar</button>
    </form>

    <div id="respuesta_agregar_album" className="mt-2"></div>
  </div>
);

const agregarFigurita = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Agregar Figurita</h5>
    <p className="card-text mb-3">
      Se pueden agregar figuritas indicando el sobre, la clase y sus datos.
    </p>

    <form name="agregar_figurita" className="form_alta">
      <div className="mb-3">
        <label htmlFor="selectSobre" className="form-label">
          Clase del sobre seleccionado
        </label>
        <select
          id="selectSobre"
          name="idSobre"
          className="form-select w-100 cls_sobre"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputNombre" className="form-label">Nombre de la figurita</label>
        <input
          type="text"
          id="inputNombre"
          name="nombre"
          className="form-control w-100"
          required
          placeholder="(nombre del jugador)"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectClaseFigurita" className="form-label">
          Clase de figurita
        </label>
        <select
          id="selectClaseFigurita"
          name="claseFigurita"
          className="form-select w-100 cls_figurita"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputPrecioFigurita" className="form-label">
          Precio de figurita
        </label>
        <input
          type="number"
          id="inputPrecioFigurita"
          name="precio"
          className="form-control w-100"
          defaultValue={0}
          min={0}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputStockFigurita" className="form-label">
          Stock disponible
        </label>
        <input
          type="range"
          id="inputStockFigurita"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={5}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputImagenFigurita" className="form-label">
          Imagen de la figurita
        </label>
        <input
          type="file"
          id="inputImagenFigurita"
          name="imagen"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">Agregar</button>
    </form>

    <div id="respuesta_agregar_figurita" className="mt-2"></div>
  </div>
);

const agregarSobre = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Agregar Sobre</h5>
    <p className="card-text mb-3">
      Se pueden agregar sobres indicando el álbum al que pertenecen.
    </p>

    <form name="agregar_sobre" className="form_alta">
      <div className="mb-3">
        <label htmlFor="selectAlbum" className="form-label">
          Clase del álbum seleccionado
        </label>
        <select
          id="selectAlbum"
          name="idAlbum"
          className="form-select w-100 cls_album"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectClaseSobre" className="form-label">
          Clase de sobre
        </label>
        <select
          id="selectClaseSobre"
          name="claseSobre"
          className="form-select w-100 cls_sobre"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputStockSobre" className="form-label">
          Stock disponible
        </label>
        <input
          type="range"
          id="inputStockSobre"
          name="stock"
          className="form-range w-100"
          min={0}
          max={100}
          defaultValue={5}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputImagenSobre" className="form-label">
          Imagen del sobre
        </label>
        <input
          type="file"
          id="inputImagenSobre"
          name="imagen"
          accept="image/*"
          className="form-control w-100"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 btn-sobre">
        Agregar
      </button>
    </form>

    <div id="respuesta_agregar_sobre" className="mt-2"></div>
  </div>
);

const agregarUsuario = () => (
  <div className="card bg-light border rounded p-4 mb-4">
    <h5 className="card-title mb-3">Agregar Usuario</h5>
    <p className="card-text mb-3">Se pueden agregar usuarios nuevos.</p>

    <form name="agregar_usuario" className="form_alta">
      <div className="mb-3">
        <label htmlFor="inputNombreUsuario" className="form-label">
          Nombre de usuario
        </label>
        <input
          type="text"
          id="inputNombreUsuario"
          name="nombre"
          className="form-control w-100"
          required
          placeholder="Nombre de usuario"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputPasswordUsuario" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="inputPasswordUsuario"
          name="password"
          className="form-control w-100"
          required
          placeholder="*************"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputEmailUsuario" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          id="inputEmailUsuario"
          name="email"
          className="form-control w-100"
          required
          placeholder="usuario@gmail.com"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputTelefonoUsuario" className="form-label">
          Número de teléfono
        </label>
        <input
          type="tel"
          id="inputTelefonoUsuario"
          name="telefono"
          className="form-control w-100"
          required
          placeholder="5492983548796"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectPaisUsuario" className="form-label">
          País de origen
        </label>
        <select
          id="selectPaisUsuario"
          name="pais"
          className="form-select w-100 cls_pais"
        ></select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputFechaNacimiento" className="form-label">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          id="inputFechaNacimiento"
          name="fechaNacimiento"
          className="form-control w-100"
          required
          min="1875-12-02"
          max="2013-12-02"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputFotoUsuario" className="form-label">
          Foto de perfil
        </label>
        <input
          type="file"
          id="inputFotoUsuario"
          name="foto"
          className="form-control w-100"
          accept="image/*"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 btn-usuario">
        Agregar
      </button>
    </form>

    <div id="respuesta_agregar_usuario" className="mt-2"></div>
  </div>
);