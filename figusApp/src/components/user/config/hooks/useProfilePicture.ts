import { useCallback, useRef } from 'react';

import type { UseProfilePictureProps } from '../interfaces/UseProfilePictureProps';
import type { UseProfilePictureReturn } from '../interfaces/UseProfilePictureReturn';

import { updateUserProfilePicture } from '../../services/userService';

import {
  validateImageFile,
  validateRequiredFile,
} from '../utils/validation';

import { useFieldStatus } from './useFieldStatus';
import { useLoadingFields } from './useLoadingFields';

export const useProfilePicture = ({
  user,
  setUser,
}: UseProfilePictureProps): UseProfilePictureReturn => {
  const profilePictureRef = useRef<HTMLInputElement>(null);

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

  const handleProfilePictureUpdate = useCallback(async (): Promise<void> => {
    if (!user.id) {
      return;
    }

    const input = profilePictureRef.current;
    const files = input?.files ?? null;

    if (!validateRequiredFile(files)) {
      showError('profile_picture', null, 'Seleccioná una imagen');
      return;
    }

    const file = files[0];

    if (!validateImageFile(file)) {
      showError('profile_picture', null, 'Archivo inválido');
      return;
    }

    startLoading('profile_picture');
    clearStatus('profile_picture');

    const instantImageUrl = URL.createObjectURL(file);

    setUser((prev) => ({
      ...prev,
      profile_picture: instantImageUrl,
    }));

    try {
      const updatedUser = await updateUserProfilePicture(user.id, file);

      const cacheVersion = Date.now();

      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        profile_picture: updatedUser.profile_picture
          ? `${updatedUser.profile_picture}${
              updatedUser.profile_picture.includes('?') ? '&' : '?'
            }v=${cacheVersion}`
          : instantImageUrl,
      }));

      if (input) {
        input.value = '';
      }

      showSuccess('profile_picture', '✓ Foto actualizada');
    } catch (error) {
      showError('profile_picture', error, 'Error al actualizar foto');
    } finally {
      stopLoading('profile_picture');
    }
  }, [
    user.id,
    setUser,
    startLoading,
    stopLoading,
    clearStatus,
    showSuccess,
    showError,
  ]);

  return {
    profilePictureRef,
    handleProfilePictureUpdate,
    fieldStatus,
    loadingFields,
  };
};