import { useCallback, useState } from 'react';
import { getErrorMessage } from '../utils/statusHelpers';

import type { FieldStatusMap } from '../types/maps/FieldStatusMap';
import type { ConfigDataField } from '../types/ConfigDataField';

/**
 * Hook para gestionar mensajes de estado por campo del perfil de usuario.
 * Permite establecer mensajes de error o éxito asociados a cada campo.
 */
export const useFieldStatus = () => {
  const [fieldStatus, setFieldStatus] = useState<FieldStatusMap>({});

  /** Limpia el estado de un campo específico. */
  const clearStatus = useCallback((field: ConfigDataField) => {
    setFieldStatus((prev) => ({
      ...prev,
      [field]: '',
    }));
  }, []);

  /**
   * Asigna un mensaje de éxito a un campo y lo elimina tras un intervalo.
   */
  const showSuccess = useCallback(
    (field: ConfigDataField, message: string, duration = 2500) => {
      setFieldStatus((prev) => ({
        ...prev,
        [field]: message,
      }));

      window.setTimeout(() => {
        clearStatus(field);
      }, duration);
    },
    [clearStatus],
  );

  /**
   * Asigna un mensaje de error a un campo.
   * Si el error no contiene mensaje válido, usa fallback.
   */
  const showError = useCallback(
    (field: ConfigDataField, error: unknown, fallback?: string) => {
      setFieldStatus((prev) => ({
        ...prev,
        [field]: getErrorMessage(error, fallback),
      }));
    },
    [],
  );

  return {
    fieldStatus,
    clearStatus,
    showSuccess,
    showError,
  };
};