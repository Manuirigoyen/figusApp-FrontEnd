import type { ConfigDataField } from '../ConfigDataField';

/**
 * Estado de carga por campo de configuración.
 * Cada clave indica si existe una operación asíncrona en curso para ese campo.
 */
export type LoadingMap = Partial<Record<ConfigDataField, boolean>>;