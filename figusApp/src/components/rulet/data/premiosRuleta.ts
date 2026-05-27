/**
 * Interfaz que define la estructura de un premio de la ruleta.
 */
export interface Premio {
  /**
   * Nombre del premio que se mostrará al usuario.
   */
  nombre: string;
  
  /**
   * Ruta de la imagen que representa visualmente el premio en la ruleta.
   */
  img: string;
}

/**
 * Array de premios disponibles en la ruleta.
 * Contiene 8 premios distribuidos en sectores iguales (45° cada uno).
 * Los premios "Nada" actúan como separadores entre premios reales.
 * 
 * @example
 * premios[0] = { nombre: "Nada", img: "../../assets/img/icons/ruleta/premio_nada.png" }
 * premios[7] = { nombre: "Figurita Aleatoria", img: "../../assets/img/icons/ruleta/figurita_aleatoria.png" }
 */
export const premios: Premio[] = [
  { nombre: "Nada", img: "../../assets/img/icons/ruleta/premioNada.png" },
  { nombre: "Giro Gratis", img: "../../assets/img/icons/ruleta/giroGratis.png" },
  { nombre: "Nada", img: "../../assets/img/icons/ruleta/premio_nada.png" },
  { nombre: "Sobre Dorado", img: "../../assets/img/icons/ruleta/sobreDorado.png" },
  { nombre: "Nada", img: "../../assets/img/icons/ruleta/premio_nada.png" },
  { nombre: "Sobre Gris", img: "../../assets/img/icons/ruleta/sobreGris.png" },
  { nombre: "Nada", img: "../../assets/img/icons/ruleta/premio_nada.png" },
  { nombre: "Figurita Aleatoria", img: "../../assets/img/icons/ruleta/figurita_aleatoria.png" },
];