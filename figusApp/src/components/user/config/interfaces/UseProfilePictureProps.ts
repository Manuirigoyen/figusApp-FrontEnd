import type {
  Dispatch,
  SetStateAction,
} from 'react';

import type { UserConfig } from './UserConfig';

/**
 * Propiedades requeridas para gestionar
 * la foto de perfil del usuario.
 */
export interface UseProfilePictureProps {
  /** Usuario autenticado actual. */
  user: UserConfig;

  /** Setter del estado de usuario. */
  setUser: Dispatch<
    SetStateAction<UserConfig>
  >;
}