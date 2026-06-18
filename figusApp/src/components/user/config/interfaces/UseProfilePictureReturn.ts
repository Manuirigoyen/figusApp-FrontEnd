import type { RefObject } from 'react';

import type { FieldStatusMap } from '../types/maps/FieldStatusMap';
import type { LoadingMap } from '../types/maps/LoadingMap';

/**
 * Resultado expuesto por el hook
 * de gestión de foto de perfil.
 */
export interface UseProfilePictureReturn {
  /** URL temporal usada para preview local. */
  profilePreview: string | null;

  /** Referencia al input de carga de imagen. */
  profilePictureRef:
    RefObject<HTMLInputElement | null>;

  /** Ejecuta la actualización de la foto. */
  handleProfilePictureUpdate:
    () => Promise<void>;

  /** Estado visual de mensajes por campo. */
  fieldStatus: FieldStatusMap;

  /** Estado de carga por campo. */
  loadingFields: LoadingMap;
}