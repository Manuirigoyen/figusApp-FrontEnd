import type {
  Dispatch,
  SetStateAction,
} from 'react';

import type { UserConfig } from '../UserConfig';

/**
 * Props requeridas por el componente Config.
 */
export type ConfigProps = {
  /**
   * Usuario autenticado actual.
   */
  user: UserConfig;

  /**
   * Setter del estado global del usuario.
   *
   * Permite actualizar o limpiar el usuario autenticado.
   */
  setUser: Dispatch<
    SetStateAction<UserConfig | null>
  >;
};