/**
 * Interfaz que define la estructura de un premio de la ruleta.
 */
export interface Premio {
  nombre: string;
  img: string;
}

// Función auxiliar para que Vite detecte, compile y resuelva la ruta real de cada asset
const resolverImagenVite = (rutaRelativa: string) => {
  return new URL(rutaRelativa, import.meta.url).href;
};

/**
 * Array de premios con rutas dinámicas nativas para Vite.
 */
export const premios: Premio[] = [
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
  { nombre: "Giro Gratis", img: resolverImagenVite("../../../assets/img/icons/ruleta/giroGratis.png") },
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
  { nombre: "Sobre Bronce", img: resolverImagenVite("../../../assets/img/icons/ruleta/sobreBronce.png") },
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
  { nombre: "Figurita Aleatoria", img: resolverImagenVite("../../../assets/img/icons/ruleta/jugadorSorpresa.png") },
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
  { nombre: "Sobre Plateado", img: resolverImagenVite("../../../assets/img/icons/ruleta/sobrePlateado.png") },
  { nombre: "Sobre Dorado", img: resolverImagenVite("../../../assets/img/icons/ruleta/sobreDorado.png") },
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
  { nombre: "Giro Gratis", img: resolverImagenVite("../../../assets/img/icons/ruleta/giroGratis.png") },
  { nombre: "Nada", img: resolverImagenVite("../../../assets/img/icons/ruleta/nada.png") },
];