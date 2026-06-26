import type { ReactNode } from 'react';
import type { ConfigDataField } from '../ConfigDataField';

/**
 * Props base para un contenedor genérico de campo de configuración.
 * Encapsula estructura UI estándar de label + contenido + estado.
 */
export type ConfigFieldProps = {
  id: ConfigDataField;
  label: string;
  children: ReactNode;
  status?: string;
};