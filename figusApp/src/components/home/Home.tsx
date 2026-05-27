/**
 * Componente Home principal de FigusApp.
 * Renderiza la página de inicio completa con header, video de presentación y beneficios.
 * @returns Elemento JSX de la página de inicio.
 */
export const Home = () => {
  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div className="main-content" />

      <div className="main-content-content position-relative z-1">
        <div className="ad-left">
          {getDivAnuncio(
            "src/assets/img/add/home/argentina.png",
            "https://www.dymatize.com"
          )}
        </div>

        <div className="ad-right">
          {getDivAnuncio(
            "src/assets/img/add/home/local.png",
            "https://www.suweb.com.ar"
          )}
        </div>

        {getDivHeader()}

        <div className="container-fluid px-4 mt-3">
          <div className="row g-0 justify-content-center">
            <div className="col-xl-10 col-lg-11 col-md-12 px-0">
              {getDivPresentacion()}
            </div>
          </div>
        </div>

        {getDivPublicidad()}
      </div>
    </main>
  );
};

/**
 * Renderiza el header principal de bienvenida.
 * @returns Sección de título y descripción inicial.
 */
const getDivHeader = () => (
  <section className="header-section text-white text-center py-5 position-relative z-2">
    <div className="container">
      <h1 className="fw-bold display-3 pb-2">
        Bienvenidos a FigusApp
      </h1>
      <h2>
        ¡Álbum oficial de las mejores selecciones del mundo!
      </h2>
    </div>
  </section>
);

/**
 * Renderiza el anuncio lateral fijo.
 * @param {string} imgPath - Ruta de la imagen del anuncio.
 * @param {string} link - URL destino del anuncio.
 * @returns Bloque de anuncio con imagen y enlace.
 */
export const getDivAnuncio = (imgPath: string, link: string) => (
  <div className="ad-sidebar">
    <a href={link} target="_blank" rel="noopener noreferrer" className="d-block h-100">
      <div className="ad-unit p-3 text-center h-100 d-flex flex-column justify-content-start">
        <img
          src={imgPath}
          alt="Anuncio Google Ads 160x600"
          className="ad-unit-image"
        />
      </div>
    </a>
  </div>
);


/**
 * Renderiza el video de presentación principal con contenido descriptivo.
 * @returns Video hero responsive con información del álbum debajo.
 */
const getDivPresentacion = () => (
  <div className="video-hero shadow rounded-4 overflow-hidden mx-auto mt-n5 w-75">
    <video
      className="w-100 video-narrow"
      src="src/assets/vids/presentacion.mp4"  
      controls 
      loop
      muted
      playsInline
    />
  </div>
);

/**
 * Renderiza la sección de beneficios de FigusApp.
 * @returns Tres cards con ventajas principales de la aplicación.
 */
const getDivPublicidad = () => (
  <section className="beneficios-section text-center py-3 mt-4 pb-4">
    <div className="container">
      <h3 className="mb-4 text-white">
        ¿Por qué te conviene FigusApp?
      </h3>

      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <div className="card-beneficio bg-white p-4 border rounded-4 shadow h-100">
            <i className="bi bi-people-fill fs-1 text-primary mb-3 d-block mx-auto"></i>
            <h5 className="fw-bold mb-3">Comunidad Activa</h5>
            <p className="lead mb-0">
              Intercambiá <strong>figuritas</strong> con miles de jugadores de todo el mundo.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-beneficio bg-white p-4 border rounded-4 shadow h-100">
            <i className="bi bi-phone-fill fs-1 text-primary mb-3 d-block mx-auto"></i>
            <h5 className="fw-bold mb-3">100% Digital</h5>
            <p className="lead mb-0">
              Coleccioná figuritas y albums desde cualquier dispositivo.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-beneficio bg-white p-4 border rounded-4 shadow h-100">
            <i className="bi bi-trophy-fill fs-1 text-primary mb-3 d-block mx-auto"></i>
            <h5 className="fw-bold mb-3">Premios Reales</h5>
            <p className="lead mb-0">
              Ganá <strong>viajes y entradas</strong> completando tus álbumes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);