import type { UserConfig } from '../UserConfig';
import type { LoadingMap } from '../maps/LoadingMap';
import type { FieldStatusMap } from '../maps/FieldStatusMap';
import type { ConfigDataField } from '../ConfigDataField';

/**
 * Props para la sección de datos personales del usuario.
 */
export type PersonalDataSectionProps = {
  user: UserConfig;
  setUser: React.Dispatch<React.SetStateAction<UserConfig | null>>;

  updateField: (
    field: ConfigDataField,
    value: string
  ) => Promise<void>;

  loadingFields: LoadingMap;
  fieldStatus: FieldStatusMap;
};