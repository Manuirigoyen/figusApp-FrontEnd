import { useCallback, useEffect, useState } from 'react';

import type { UpdateUserPayload } from '../interfaces/UpdateUserPayload';
import type { UserConfig } from '../types/UserConfig';
import type { ConfigDataField } from '../types/ConfigDataField';

import {
  getAuthenticatedUser,
  updateUser,
  deleteUser,
} from '../../services/authService';

import { useFieldStatus } from './useFieldStatus';
import { useLoadingFields } from './useLoadingFields';

/**
 * Usuario vacío por defecto para inicialización del estado.
 */
const emptyUser: UserConfig = {
  id: 0,
  first_name: '',
  last_name: '',
  date_of_birth: '',
  nationality: '',
  email: '',
  phone_number: '',
  profile_picture: null,
  role: 'user',
};

/**
 * Normalización de valores por campo de configuración.
 */
const normalizeValue = (field: ConfigDataField, value: string) => {
  if (field === 'email') {
    return value.trim().toLowerCase();
  }

  if (field === 'nationality') {
    return value.trim().toUpperCase();
  }

  if (field === 'date_of_birth') {
    return value;
  }

  return value.trim();
};

/**
 * Hook principal de gestión del perfil de usuario.
 * Maneja carga, actualización parcial y eliminación de cuenta.
 */
export const useUserConfig = () => {
  const [user, setUser] = useState<UserConfig>(emptyUser);
  const [isLoading, setIsLoading] = useState(true);

  const { fieldStatus, showError, showSuccess, clearStatus } =
    useFieldStatus();

  const { loadingFields, startLoading, stopLoading } =
    useLoadingFields();

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Se reemplazó getCurrentUser por tu servicio unificado
        const currentUser = await getAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al cargar el perfil';
        showError('delete_account', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [showError]);

  /**
   * Actualiza un campo específico del usuario.
   */
  const updateField = useCallback(
    async (field: ConfigDataField, value: string) => {
      if (!user.id) return;

      startLoading(field);
      clearStatus(field);

      try {
        const normalized = normalizeValue(field, value);

        const updatedUser = await updateUser(user.id, {
          [field]: normalized,
        } as UpdateUserPayload);

        setUser(updatedUser);

        showSuccess(field, '✓ Actualizado');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado';
        showError(field, errorMessage);
      } finally {
        stopLoading(field);
      }
    },
    [
      user.id,
      startLoading,
      stopLoading,
      clearStatus,
      showSuccess,
      showError,
    ],
  );

  /**
   * Elimina la cuenta del usuario tras confirmación explícita.
   */
  const removeAccount = useCallback(async () => {
    if (!user.id) return;

    const confirmed = window.confirm(
      '¿Estás seguro? Esta acción no se puede deshacer.',
    );

    if (!confirmed) return;

    startLoading('delete_account');
    clearStatus('delete_account');

    try {
      await deleteUser(user.id);

      window.location.href = '/register';
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al eliminar la cuenta';
      showError('delete_account', errorMessage);
    } finally {
      stopLoading('delete_account');
    }
  }, [
    user.id,
    startLoading,
    stopLoading,
    clearStatus,
    showError,
  ]);

  return {
    user,
    setUser,
    isLoading,
    updateField,
    removeAccount,
    loadingFields,
    fieldStatus,
  };
};