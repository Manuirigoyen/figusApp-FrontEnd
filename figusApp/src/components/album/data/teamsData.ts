// src/data/teamsData.ts
// Información de los equipos de fútbol disponibles en el álbum


/**
 * Información detallada de todos los equipos disponibles
 */
export const TEAMS_INFO: Record<string,null> = {
  /*
  argentina: {
    name: "Argentina",
    banderaIcono: "/assets/img/icons/album/banderaLogoA.jpg",
    descripcion: "La Selección Argentina de Fútbol es el equipo nacional que representa a la Argentina en competiciones internacionales. Es una de las selecciones más exitosas del mundo, con una rica historia y una gran pasión popular. Ha ganado tres Copas del Mundo (1978, 1986 y 2022) y múltiples títulos continentales, incluyendo la Copa América. Con figuras legendarias como Diego Maradona, Lionel Messi y muchos otros, la \"Albiceleste\" es símbolo de talento, garra y orgullo nacional.",
    banderaPrincipal: "/assets/img/icons/album/banderaArg.jpg"
  },
  brasil: {
    name: "Brasil",
    banderaIcono: "/assets/img/icons/album/banderaLogoB.jpg",
    descripcion: "La Selección de Brasil de Fútbol, conocida como la \"Canarinha\", es la más ganadora en la historia de los Mundiales, con cinco Copas del Mundo (1958, 1962, 1970, 1994 y 2002). Famosa por su estilo alegre y ofensivo, el \"jogo bonito\", Brasil ha dado al fútbol algunas de sus mayores leyendas, como Pelé, Zico, Ronaldo, Ronaldinho y Neymar. Es símbolo de talento, pasión y creatividad, y representa la esencia del fútbol sudamericano.",
    banderaPrincipal: "/assets/img/icons/album/banderaBra.jpg"
  },
  francia: {
    name: "Francia",
    banderaIcono: "/assets/img/icons/album/banderaLogoF.jpg",
    descripcion: "La Selección de Francia de Fútbol, conocida como \"Les Bleus\", es una de las potencias más importantes del fútbol mundial. Ha ganado dos Copas del Mundo (1998 y 2018) y varias Eurocopas, destacándose por su estilo de juego técnico y dinámico. Con generaciones de grandes figuras como Zidane, Henry, Mbappé y Griezmann, Francia combina juventud, talento y disciplina táctica, siendo un referente del fútbol moderno.",
    banderaPrincipal: "/assets/img/icons/album/BanderaFra.jpg"
  }, */
};

/**
 * Obtiene la información de un equipo por su ID
 * @param teamId - ID del equipo (ej: 'argentina', 'brasil', 'francia')
 * @returns Información del equipo o undefined si no existe
 */
export const getTeamInfo = (teamId: string): null | undefined => {
  return TEAMS_INFO[teamId];
};