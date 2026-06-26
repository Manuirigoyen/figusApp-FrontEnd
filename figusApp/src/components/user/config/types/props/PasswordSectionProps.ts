import type { LoadingMap } from '../maps/LoadingMap';
import type { FieldStatusMap } from '../maps/FieldStatusMap';

/**
 * Props para la sección de actualización de contraseña.
 */
export type PasswordSectionProps = {
  password: string;
  confirmPassword: string;

  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;

  handlePasswordUpdate: () => Promise<void>;

  newPasswordRef: React.RefObject<HTMLInputElement | null>;
  confirmPasswordRef: React.RefObject<HTMLInputElement | null>;

  loadingFields: LoadingMap;
  fieldStatus: FieldStatusMap;
};