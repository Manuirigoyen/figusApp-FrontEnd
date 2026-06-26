import type { ConfigDataField } from '../ConfigDataField';

/**
 * Mapeo de campos de configuración hacia su estado actual.
 * Los valores suelen ser strings de estado (por ejemplo: 'valid', 'error', 'pending').
 */
export type FieldStatusMap = Partial<Record<ConfigDataField, string>>;