
// Datos de todas las figuritas disponibles en el álbum

/**
 * Interfaz que define la estructura de una figurita
 */
export interface Figurita {
  /** Identificador único de la figurita */
  id: string;
  /** ID del equipo al que pertenece (argentina, brasil, francia) */
  teamId: string;
  /** Si es una figurita especial (con imagen oculta) */
  isSpecial: boolean;
  /** Si el usuario ya la ha completado */
  isComplete: boolean;
  /** URL de la imagen normal de la figurita */
  backgroundImageUrl: string;
  /** URL de la imagen de portada (para figuritas especiales no completadas) */
  coverImageUrl?: string;
  /** URL de la imagen especial (cuando está completada) */
  specialImageUrl?: string;
  /** Texto alternativo para la imagen especial */
  specialImageAlt?: string;
  /** Datos del jugador (para figuritas especiales) */
  dataJugador?: string;
}
