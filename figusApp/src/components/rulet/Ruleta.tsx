import React, { useState, useCallback, useRef } from 'react';
import { premios, type Premio } from './data/premiosRuleta';
import { Link } from 'react-router-dom';
import './ruleta.css';



const ROTACION_INICIAL = 20;
const sector = 360 / premios.length;
let rotacionActual = 0;

/**
 * Renderiza el la ruleta de premios.
 * @returns Sección de título y descripción inicial.
 */
export const Ruleta = () => {
  const [girosRestantes, setGirosRestantes] = useState(20);
  const premiosCircleRef = useRef<HTMLDivElement>(null);
  const ruletaImgRef = useRef<HTMLImageElement>(null);
  const premioGanadoRef = useRef<HTMLDivElement>(null);

  const realizarGiro = useCallback(async (cantidad: number) => {
    if (girosRestantes <= 0) return;

    for (let i = 0; i < cantidad; i++) {
      if (girosRestantes <= 0) break;

      setGirosRestantes(g => g - 1);

      const premioAleatorio = Math.floor(Math.random() * premios.length);
      await girarRuleta(premiosCircleRef, ruletaImgRef, premioAleatorio);
      mostrarPremio(premios[premioAleatorio], premioGanadoRef);
      await new Promise(r => setTimeout(r, 800));
    }
  }, [girosRestantes]);

  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div>
        <div className="ad-left">
          {getDivAnuncio(
        "src/assets/img/add/ruleta/dymatize.png",
        "https://www.dymatize.com"
        )}
        </div>
        <div className="ad-right">
          {getDivAnuncio(
        "src/assets/img/add/ruleta/vitamin.png",
        "https://www.suweb.com.ar"
        )}
        </div>
        <div className="main-content-content position-relative pb-4 z-1">
          {getDivHeader()}
          {getDivPremios(premiosCircleRef, ruletaImgRef, premioGanadoRef)}
          {getDivBotonesEspeciales(girosRestantes, realizarGiro)}
          {getDivBotonGirar(girosRestantes, realizarGiro)}
        </div>
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
        ¡Es hora de probar Suerte!
      </h1>
      <h2>
        ¡Dale un giro a la ruleta y mirá qué recompensa te toca!
      </h2>
    </div>
  </section>
);

/**s
 * Renderiza el anuncio lateral fijo.
 * @param {string} imgPath - Ruta de la imagen del anuncio.
 * @param {string} link - URL destino del anuncio.
 * @returns Bloque de anuncio con imagen y enlace.
 */
const getDivAnuncio = (imgPath: string, link: string) => (
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
 * Renderiza el componente de la ruleta de premios.
 * Genera una interfaz visual con ruleta giratoria, premios y texto promocional.
 *
 * @returns {JSX.Element} Elemento JSX que representa la ruleta de premios completa.
 */
const getDivPremios = (
  premiosCircleRef: React.RefObject<HTMLDivElement | null>,
  ruletaImgRef: React.RefObject<HTMLImageElement | null>,
  premioGanadoRef: React.RefObject<HTMLDivElement | null>
) => {
  return (
    <>
      <div className="container-fluid text-center">
        <div className="d-flex justify-content-center align-items-start">
          <div className="position-relative contenedorPrincipal">
            <div className="ruleta-container position-relative">
              <img
                ref={ruletaImgRef}
                src="/assets/img/icons/ruleta/btn_ruleta.png"
                className="ruleta"
                alt="Fondo de Ruleta"
              />
              <img
                src="/assets/img/icons/ruleta/base_ruleta.png"
                className="ruleta-base"
                alt="Base de Ruleta"
              />
              <img
                src="/assets/img/icons/ruleta/triangulo_ruleta.png"
                className="triangulo-ruleta"
                alt="Triangulo de Ruleta"
              />
              <div className="premios-circle-wrapper position-absolute translate-middle">
                <div ref={premiosCircleRef} className="premios-circle">
                  {premios.map((premio, index) => (
                    <img 
                      key={index} 
                      src={premio.img} 
                      className="premio" 
                      alt={premio.nombre} 
                    />
                  ))}
                </div>
              </div>
              <div ref={premioGanadoRef} id="premioGanado" className="premio-popup d-none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Renderiza el panel de botones especiales para giros automáticos.
 * Contiene botones para 5, 10, 15 giros y modo automático en un layout de dos filas.
 *
 * @returns {JSX.Element} Elemento JSX con botones de control de giros.
 */
const getDivBotonesEspeciales = (girosRestantes: number, realizarGiro: (cantidad: number) => void) => {
  return (
    <>
      <div className="d-flex flex-column mt-5">
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-custom me-3 w-25"
            id="girar5"
            onClick={() => realizarGiro(5)}
            disabled={girosRestantes === 0}
          >
            5 Giros
          </button>
          <button
            className="btn btn-custom w-25"
            id="girar10"
            onClick={() => realizarGiro(10)}
            disabled={girosRestantes === 0}
          >
            10 Giros
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-custom me-3 w-25"
            id="girar15"
            onClick={() => realizarGiro(15)}
            disabled={girosRestantes === 0}
          >
            15 Giros
          </button>
          <button
            className="btn btn-dark-custom w-25"
            id="autoGiro"
            onClick={() => realizarGiro(girosRestantes)}
            disabled={girosRestantes === 0}
          >
            Automático
          </button>
        </div>
      </div>
    </>
  );
};

/**
 * Renderiza el botón principal de girar y enlace de tienda para sin giros.
 * Muestra contador de giros restantes y botón alternativo cuando no hay giros.
 *
 * @returns {JSX.Element} Elemento JSX con controles principales de ruleta.
 */
const getDivBotonGirar = (girosRestantes: number, realizarGiro: (cantidad: number) => void) => {
  return (
    <>
      <div className="text-center botonPrincipal">
        <button
          className="btn btn-warning"
          id="girarBtn"
          onClick={() => realizarGiro(1)}
          disabled={girosRestantes === 0}
        >
          Girar ({girosRestantes})
        </button>
      </div>
      <div
        id="sinGiros"
        className="text-center pb-3"
      >
        <Link id="btn-tienda" to="/tienda" className="text-decoration-none text-dark btn-reset">
          <button id="btn-tienda" className="text-decoration-none text-dark btn-reset">
            ¿Te quedaste sin giros?
          </button>
        </Link>
      </div>
    </>
  );
};

/**
 * Ejecuta la animación de giro de la ruleta para un premio específico.
 * Realiza 5 vueltas completas más el ángulo preciso del premio seleccionado.
 * @param premiosCircleRef - Referencia al contenedor de premios que rota
 * @param ruletaImgRef - Referencia a la imagen de fondo de la ruleta
 * @param premioAleatorio - Índice del premio (0-7) en el array premios
 * @returns Promesa que se resuelve cuando ambas animaciones terminan
 */
async function girarRuleta(
  premiosCircleRef: React.RefObject<HTMLDivElement | null>,
  ruletaImgRef: React.RefObject<HTMLImageElement | null>,
  premioAleatorio: number
): Promise<void> {
  const cantGiros = 360 * 5 + premioAleatorio * sector + sector / 2;
  rotacionActual += cantGiros;

  if (premiosCircleRef.current) {
    premiosCircleRef.current.style.transform = 'rotate(' + (ROTACION_INICIAL + rotacionActual) + 'deg)';
  }
  if (ruletaImgRef.current) {
    ruletaImgRef.current.style.transform = 'rotate(' + (ROTACION_INICIAL + rotacionActual) + 'deg)';
  }

  await Promise.all([
    esperarTransicion(premiosCircleRef.current!),
    esperarTransicion(ruletaImgRef.current!)
  ]);
}

/**
 * Espera a que termine la transición CSS de un elemento.
 * Se ejecuta cuando el evento 'transitionend' se dispara.
 * @param elemento - Elemento DOM que está animando
 * @returns Promesa que se resuelve al finalizar la transición
 */
function esperarTransicion(elemento: Element): Promise<void> {
  return new Promise((resolve) => {
    const handler = () => {
      elemento.removeEventListener("transitionend", handler);
      resolve();
    };
    elemento.addEventListener("transitionend", handler);
  });
}

/**
 * Muestra visualmente el premio ganado en pantalla durante 2 segundos.
 * @param premio - Objeto Premio con nombre e imagen
 * @param premioGanadoRef - Referencia al contenedor del premio popup
 */
/**
 * Muestra visualmente el premio ganado en pantalla durante 2 segundos.
 * @param premio - Objeto Premio con nombre e imagen
 * @param premioGanadoRef - Referencia al contenedor del premio popup
 */
function mostrarPremio(premio: Premio, premioGanadoRef: React.RefObject<HTMLDivElement | null>): void {
  if (premioGanadoRef.current) {
    premioGanadoRef.current.classList.remove("d-none");
    premioGanadoRef.current.innerHTML = '<img src="' + premio.img + '" alt="Premio" class="premio-ganado">';
    setTimeout(function() {
      premioGanadoRef.current?.classList.add("d-none");
    }, 2000);
  }
}