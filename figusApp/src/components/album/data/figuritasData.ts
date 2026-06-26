// src/data/figuritasData.ts
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

/**
 * Conjunto completo de figuritas disponibles en el álbum
 * Incluye figuritas normales y especiales de Argentina, Brasil y Francia
 * Cada figurita tiene información completa para renderizarse correctamente
 */
export const ALL_FIGURITAS: Figurita[] = [
  /*
  // Argentina
  { id: 'figu01', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/lionelMessi.jpg' },
  { id: 'figu02', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/AlexisMacAllister.jpg' },
  { id: 'figu03', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/EmilianoMartinez.jpg' },
  { id: 'figu04', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/EnzoFernandez.jpg' },
  { id: 'figu05', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/CutiRomero.jpg' },
  { id: 'figu06', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/NicolasOtamendi.jpg' },
  { id: 'figu07', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/JulianAlvarez.jpg' },
  { id: 'figu08', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/NahuelMolina.jpg' },
  { id: 'figu09', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/RodrigoDepaul.jpg' },
  { id: 'figu10', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/LisandoMartinez.jpg' },
  { id: 'figu11', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/MarcosAcuña.jpg' },
  { id: 'figu12', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/pelotaArgentina.jpg' },
  { id: 'figu13', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/hinchadaArgentina.jpg' },  
  { id: 'figu14', teamId: 'argentina', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/argentina/copaMundo.jpg' },
  { id: 'figu15', teamId: 'argentina', isSpecial: true, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/jugadorSorpresa.jpeg', specialImageUrl: '/assets/img/db/stickers/argentina/DiegoMaradona.jpg', specialImageAlt: 'Maradona', dataJugador: 'Maradona' },
  // Brasil
  { id: 'figu16', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/AlissonBecker.jpg' },
  { id: 'figu17', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/BrunoGuimarães.jpg' },
  { id: 'figu18', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/DaniloLuizdaSilva.jpg' },
  { id: 'figu19', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/EderMilitao.jpg' },
  { id: 'figu20', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/Endrick.jpg' },
  { id: 'figu21', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/LucasPaqueta.jpg' },
  { id: 'figu22', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/NeymardaSilvaSantosJúnior.jpg' },
  { id: 'figu23', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/Raphinha.jpg' },
  { id: 'figu24', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/RicharlisondeAndrade.png' },
  { id: 'figu25', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/Rodrygo.jpg' },
  { id: 'figu26', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/ViniciusJr.jpg' },
  { id: 'figu27', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/escudoBrasil.jpg' },
  { id: 'figu28', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/hinchadaBrasil.jpg' },   
  { id: 'figu29', teamId: 'brasil', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/brasil/copaMundo.jpg' },
  { id: 'figu30', teamId: 'brasil', isSpecial: true, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/jugadorSorpresa.jpeg', specialImageUrl: '/assets/img/db/stickers/brasil/Pele.jpg', specialImageAlt: 'Pelé', dataJugador: 'Pele' },
  // Francia
  { id: 'figu31', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/AurélienTchouaméni.jpg' },
  { id: 'figu32', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/AxelDisasi.jpg' },
  { id: 'figu33', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/EduardoCamavinga.jpg' },
  { id: 'figu34', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/IbrahimaKonaté.jpg' },
  { id: 'figu35', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/KingsleyComan.jpg' },
  { id: 'figu36', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/KylianMbappé.jpg' },
  { id: 'figu37', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/MattéoGuendouzi.jpg' },
  { id: 'figu38', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/SteveMandanda.jpg' },
  { id: 'figu39', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/Varane.jpg' },
  { id: 'figu40', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/Vitinha.jpg' },
  { id: 'figu41', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/YoussoufFofana.jpg' },
  { id: 'figu42', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/camisetaFrancia.jpg' },
  { id: 'figu43', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/hinchadaFrancesa.jpg' },  
  { id: 'figu44', teamId: 'francia', isSpecial: false, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/francia/copaMundo.jpg' },
  { id: 'figu45', teamId: 'francia', isSpecial: true, isComplete: false, backgroundImageUrl: '/assets/img/db/stickers/jugadorSorpresa.jpeg', specialImageUrl: '/assets/img/db/stickers/francia/Zinedine Zidane.jpg', specialImageAlt: 'Zidane', dataJugador: 'Zidane' },
*/];