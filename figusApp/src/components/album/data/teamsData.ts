// src/components/album/data/teamsData.ts
import banderaArg from '../../../assets/img/icons/album/banderaArg.png';
import banderaBra from '../../../assets/img/icons/album/banderaBra.png';
import banderaFra from '../../../assets/img/icons/album/BanderaFra.png';

import banderaLogoA from '../../../assets/img/icons/album/banderaLogoA.png';
import banderaLogoB from '../../../assets/img/icons/album/banderaLogoB.png';
import banderaLogoF from '../../../assets/img/icons/album/banderaLogoF.png';
import type { TeamInfo } from '../types';

export const TEAMS_INFO: Record<string, TeamInfo> = {
  argentina: {
    name: 'Argentina',
    banderaIcono: banderaLogoA,
    descripcion:
      'La Selección Argentina de Fútbol es el equipo nacional que representa a la Argentina en competiciones internacionales. Es una de las selecciones más exitosas del mundo, con una rica historia y una gran pasión popular. Ha ganado tres Copas del Mundo (1978, 1986 y 2022) y múltiples títulos continentales, incluyendo la Copa América.',
    banderaPrincipal: banderaArg,
  },

  brasil: {
    name: 'Brasil',
    banderaIcono: banderaLogoB,
    descripcion:
      'La Selección de Brasil, conocida como la Canarinha, es la más ganadora en la historia de los Mundiales, con cinco Copas del Mundo. Es famosa por su estilo ofensivo, alegre y técnico.',
    banderaPrincipal: banderaBra,
  },

  francia: {
    name: 'Francia',
    banderaIcono: banderaLogoF,
    descripcion:
      'La Selección de Francia, conocida como Les Bleus, es una de las potencias del fútbol mundial. Ha ganado Copas del Mundo y se destaca por su talento, velocidad y disciplina táctica.',
    banderaPrincipal: banderaFra,
  },
};

export const getTeamInfo = (teamId: string): TeamInfo | undefined => {
  return TEAMS_INFO[teamId];
};