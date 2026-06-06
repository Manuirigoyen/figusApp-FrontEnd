import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { premios } from './data/premiosRuleta';
import { useRuleta } from './hooks/useRuleta';
import { obtenerImagenSegura } from './constant/ruleta.constants';

import './ruleta.css';

import bannerMuestra from '../../assets/img/add/ruleta/muestra.png';
import baseRuleta from '../../assets/img/icons/ruleta/base_ruleta.png';
import btnRuleta from '../../assets/img/icons/ruleta/btn_ruleta.png';
import trianguloRuleta from '../../assets/img/icons/ruleta/triangulo_ruleta.png';

export const Ruleta = () => {
  const premiumsCircleRef = useRef<HTMLDivElement>(null);
  const ruletaImgRef = useRef<HTMLImageElement>(null);

  const {
    girosRestantes,
    premioGanado,
    isGirarndo,
    realizarGiro
  } = useRuleta(ruletaImgRef, premiumsCircleRef);

  return (
    <main id="mainContent" className="main-wrapper">
      <div className="ruleta-layout container py-3">

        <header className="ruleta-hero-header text-center text-white pt-5">
          <h1 className="home-title fw-bold display-4 mb-2">¡Es hora de probar Suerte!</h1>
          <p className="home-subtitle mx-auto fw-medium">¡Dale un giro a la ruleta y mirá qué recompensa te toca!</p>
        </header>

        <section className="row justify-content-center align-items-center my-4">
          <div className="col-12 col-md-3 d-flex justify-content-center ad-lateral-wrapper">
            <div className="ruleta-lateral-ad">
              <img src={bannerMuestra} alt="Publicidad Izquierda" className="ruleta-ad-png-render" />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="ruleta-contenedor-escenario">
              <div className="ruleta-container">
                <img
                  ref={ruletaImgRef}
                  src={btnRuleta}
                  className="ruleta-elemento-giratorio"
                  alt="Fondo de Ruleta"
                />

                <div className="premios-circle-wrapper position-absolute start-50 top-50 translate-middle">
                  <div ref={premiumsCircleRef} className="premios-circle">
                    {premios.map((premio, index) => (
                      <img
                        key={index}
                        src={obtenerImagenSegura(premio.img)}
                        className="premio"
                        alt={premio.nombre}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <img src={baseRuleta} className="ruleta-base" alt="Base Estática" />
              <img src={trianguloRuleta} className="triangulo-ruleta-derecha" alt="Marcador" />

              {premioGanado && (
                <div id="premioGanado" className="premio-popup animate-pop">
                  <img
                    src={obtenerImagenSegura(premioGanado.img)}
                    alt="Premio Ganado"
                    className="premio-ganado-img"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-center ad-lateral-wrapper">
            <div className="ruleta-lateral-ad">
              <img src={bannerMuestra} alt="Publicidad Derecha" className="ruleta-ad-png-render" />
            </div>
          </div>
        </section>

        <section className="ruleta-controles-section d-flex flex-column align-items-center mt-3">
          <div className="d-flex justify-content-center gap-3 mb-3 w-100 max-buttons-width">
            <button
              className="btn btn-custom w-50"
              onClick={() => realizarGiro(5)}
              disabled={girosRestantes < 5 || isGirarndo}
            >
              5 Giros
            </button>
            <button
              className="btn btn-custom w-50"
              onClick={() => realizarGiro(10)}
              disabled={girosRestantes < 10 || isGirarndo}
            >
              10 Giros
            </button>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4 w-100 max-buttons-width">
            <button
              className="btn btn-custom w-50"
              onClick={() => realizarGiro(15)}
              disabled={girosRestantes < 15 || isGirarndo}
            >
              15 Giros
            </button>
            <button
              className="btn btn-dark-custom w-50"
              onClick={() => realizarGiro(girosRestantes)}
              disabled={girosRestantes === 0 || isGirarndo}
            >
              Automático
            </button>
          </div>

          <div className="text-center w-100 pb-4">
            <button
              className="btn btn-principal-girar-manzana fw-bold shadow mb-3"
              onClick={() => realizarGiro(1)}
              disabled={girosRestantes === 0 || isGirarndo}
            >
              {isGirarndo ? 'Girando...' : `Girar (${girosRestantes})`}
            </button>

            <div className="mt-1">
              <Link to="/tienda" className="ruleta-link-tienda text-decoration-none fw-semibold">
                ¿Te quedaste sin giros? Comprar más
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};