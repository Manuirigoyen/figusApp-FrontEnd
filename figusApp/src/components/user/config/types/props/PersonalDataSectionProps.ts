import type { ReactNode } from 'react';

import type { UserConfig } from '../UserConfig';
import type { LoadingMap } from '../maps/LoadingMap';
import type { FieldStatusMap } from '../maps/FieldStatusMap';
import type { ConfigDataField } from '../ConfigDataField';

export type PersonalDataSectionProps = {
  user: UserConfig;
  setUser: React.Dispatch<React.SetStateAction<UserConfig>>;

  updateField: (
    field: ConfigDataField,
    value: string,
  ) => Promise<void>;

  loadingFields: LoadingMap;
  fieldStatus: FieldStatusMap;

  profilePictureSection: ReactNode;
};