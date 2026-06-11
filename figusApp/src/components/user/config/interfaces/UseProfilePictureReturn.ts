import type { RefObject } from 'react';

import type { FieldStatusMap } from '../types/maps/FieldStatusMap';
import type { LoadingMap } from '../types/maps/LoadingMap';

export type UseProfilePictureReturn = {
  profilePictureRef: RefObject<HTMLInputElement | null>;
  handleProfilePictureUpdate: () => Promise<void>;
  fieldStatus: FieldStatusMap;
  loadingFields: LoadingMap;
};