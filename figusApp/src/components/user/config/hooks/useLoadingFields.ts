import { useCallback, useState } from 'react';

import type { LoadingMap } from '../types/maps/LoadingMap';
import type { ConfigDataField } from '../types/ConfigDataField';

/**
 * Hook para gestionar estados de carga por campo de configuración.
 * Permite activar y desactivar loaders asociados a campos específicos.
 */
export const useLoadingFields = () => {
  const [loadingFields, setLoadingFields] = useState<LoadingMap>({});

  /** Activa el estado de carga para un campo específico. */
  const startLoading = useCallback((field: ConfigDataField) => {
    setLoadingFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  /** Desactiva el estado de carga para un campo específico. */
  const stopLoading = useCallback((field: ConfigDataField) => {
    setLoadingFields((prev) => ({
      ...prev,
      [field]: false,
    }));
  }, []);

  return {
    loadingFields,
    startLoading,
    stopLoading,
  };
};