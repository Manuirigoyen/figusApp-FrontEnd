import type { LoadingMap } from '../maps/LoadingMap';
import type { FieldStatusMap } from '../maps/FieldStatusMap';

/**
 * Props para la sección de eliminación de cuenta de usuario.
 */
export type DeleteAccountSectionProps = {
  removeAccount: () => Promise<void>;

  loading?: LoadingMap['delete_account'];
  status?: FieldStatusMap['delete_account'];
};