import './home.css';

import promoImg from '../../assets/img/add/home/promo.png';
import localImg from '../../assets/img/add/home/local.png';
import videoSrc from '../../assets/vids/presentacion.mp4';

/**
 * Home component that renders the landing page with promotional content and features
 * Displays hero section, promotional banners, video presentation, and call-to-action sections
 * @returns React component rendering the home page layout
 */
export const Home = () => {
  return (
    <main id="mainContent" className="main-wrapper">
      <div className="home-layout container py-3">
        
        <header className="home-hero-header text-center text-white">
          <p className="home-kicker text-uppercase fw-normal">
            Álbum oficial de las mejores selecciones del mundo
          </p>
          <h1 className="home-title fw-bold display-3">
            Bienvenidos a FigusApp
          </h1>
          <p className="home-subtitle mx-auto fw-medium">
            Intercambiá, coleccioná y completá tu álbum digital desde cualquier lugar.
          </p>
        </header>

        <section className="home-main-grid row justify-content-center align-items-stretch mt-5">
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
            <a 
              href="https://paninicollection.fifa.com/launch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="home-ad-wrapper shadow"
            > 
              <img
                src={promoImg}
                alt="Promoción FIFA panini"
                className="home-ad-img"
              />
            </a>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div className="home-video-container">
              <video
                className="home-video-element"
                src={videoSrc}
                controls
                loop
                muted
                playsInline
              />
            </div>
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
            <a 
              href="https://paninicollection.fifa.com/launch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="home-ad-wrapper shadow"
            >
              <img
                src={localImg}
                alt="Anuncio Local FIFA panini"
                className="home-ad-img"
              />
            </a>
          </div>
        </section>

        <section className="home-benefits-section text-center mt-5 pb-4">
          <h2 className="home-section-title text-white mb-4 fw-semibold">
            ¿Por qué te conviene FigusApp?
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-4">
              <div className="home-benefit-card p-4 border-0 shadow h-100">
                <i className="bi bi-people-fill home-benefit-icon d-block" />
                <h3 className="home-benefit-title h5 fw-bold">Comunidad Activa</h3>
                <p className="home-benefit-text">
                  Intercambiá figuritas con miles de jugadores de todo el mundo.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="home-benefit-card p-4 border-0 shadow h-100">
                <i className="bi bi-phone-fill home-benefit-icon d-block" />
                <h3 className="home-benefit-title h5 fw-bold">100% Digital</h3>
                <p className="home-benefit-text">
                  Coleccioná figuritas y álbumes desde cualquier dispositivo.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="home-benefit-card p-4 border-0 shadow h-100">
                <i className="bi bi-trophy-fill home-benefit-icon d-block" />
                <h3 className="home-benefit-title h5 fw-bold">Premios Reales</h3>
                <p className="home-benefit-text">
                  Ganá viajes y entradas completando tus álbumes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};