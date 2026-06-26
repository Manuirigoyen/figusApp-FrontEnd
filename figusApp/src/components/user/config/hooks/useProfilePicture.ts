import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { UseProfilePictureProps } from '../interfaces/UseProfilePictureProps';
import type { UseProfilePictureReturn } from '../interfaces/UseProfilePictureReturn';
import { updateUserProfilePicture } from '../../services/authService';

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
  const [profilePreview, setProfilePreview] =
    useState<string | null>(null);

  const profilePictureRef =
    useRef<HTMLInputElement | null>(null);

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
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  const handleProfilePictureUpdate =
    useCallback(async (): Promise<void> => {
      if (!user.id) return;

      const input = profilePictureRef.current;
      const files = input?.files ?? null;

      if (!validateRequiredFile(files)) {
        showError(
          'profile_picture',
          null,
          'Seleccioná una imagen',
        );
        return;
      }

      const file = files[0];

      if (!validateImageFile(file)) {
        showError(
          'profile_picture',
          null,
          'Archivo inválido',
        );
        return;
      }

      startLoading('profile_picture');
      clearStatus('profile_picture');

      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);

      try {
        const updatedUser =
          await updateUserProfilePicture(user.id, file);

        setUser(updatedUser);

        showSuccess(
          'profile_picture',
          '✓ Foto actualizada',
        );

        if (profilePictureRef.current) {
          profilePictureRef.current.value = '';
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error al actualizar foto';

        showError(
          'profile_picture',
          errorMessage,
        );
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
    profilePreview,
    profilePictureRef,
    handleProfilePictureUpdate,
    fieldStatus,
    loadingFields,
  };
};