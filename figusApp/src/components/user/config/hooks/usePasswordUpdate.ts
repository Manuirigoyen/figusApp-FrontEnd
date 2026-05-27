import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { updateUser } from '../services/userService';

import { useFieldStatus } from './useFieldStatus';
import { useLoadingFields } from './useLoadingFields';

/**
 * Hook para actualización de contraseña.
 */
export const usePasswordUpdate = (
  userId: number,
) => {
  const [password, setPassword] =
    useState('');

  const [confirmPassword,
    setConfirmPassword] =
    useState('');

  const newPasswordRef =
    useRef<HTMLInputElement>(null);

  const confirmPasswordRef =
    useRef<HTMLInputElement>(null);

  const {
    fieldStatus,
    showSuccess,
    showError,
    clearStatus,
  } = useFieldStatus();

  const {
    loadingFields,
    startLoading,
    stopLoading,
  } = useLoadingFields();

  useEffect(() => {
    const confirmInput =
      confirmPasswordRef.current;

    if (!confirmInput) {
      return;
    }

    if (
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      confirmInput.setCustomValidity(
        'Las contraseñas no coinciden.',
      );
    } else {
      confirmInput.setCustomValidity('');
    }
  }, [password, confirmPassword]);

  const handlePasswordUpdate =
    useCallback(async () => {
      const newPassInput =
        newPasswordRef.current;

      const confirmPassInput =
        confirmPasswordRef.current;

      if (
        !newPassInput ||
        !confirmPassInput
      ) {
        return;
      }

      if (
        !newPassInput.checkValidity()
      ) {
        newPassInput.reportValidity();
        return;
      }

      if (
        !confirmPassInput.checkValidity()
      ) {
        confirmPassInput.reportValidity();
        return;
      }

      startLoading('password');
      clearStatus('password');

      try {
        await updateUser(userId, {
          password,
        });

        setPassword('');
        setConfirmPassword('');

        showSuccess(
          'password',
          '✓ Contraseña actualizada',
        );
      } catch (error) {
        showError('password', error);
      } finally {
        stopLoading('password');
      }
    }, [
      userId,
      password,
      confirmPassword,
      startLoading,
      stopLoading,
      clearStatus,
      showSuccess,
      showError,
    ]);

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    handlePasswordUpdate,
    newPasswordRef,
    confirmPasswordRef,
    fieldStatus,
    loadingFields,
  };
};