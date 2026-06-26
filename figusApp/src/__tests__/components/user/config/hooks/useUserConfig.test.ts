import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserConfig } from '../../../../../components/user/config/hooks/useUserConfig';
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from '../../../../../components/user/services/userService';
import { useFieldStatus } from '../../../../../components/user/config/hooks/useFieldStatus';
import { useLoadingFields } from '../../../../../components/user/config/hooks/useLoadingFields';
import type { ConfigDataField } from '../../../../../components/user/config/types/ConfigDataField';

vi.mock('../../../../../components/user/services/userService', () => ({
  getCurrentUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

vi.mock('../../../../../components/user/config/hooks/useFieldStatus', () => ({
  useFieldStatus: vi.fn(),
}));

vi.mock('../../../../../components/user/config/hooks/useLoadingFields', () => ({
  useLoadingFields: vi.fn(),
}));

describe('useUserConfig', () => {
  const mockInitialUser = {
    id: 99,
    first_name: 'Jane',
    last_name: 'Doe',
    date_of_birth: '1995-05-10',
    nationality: 'AR',
    email: 'jane@doe.com',
    phone_number: '12345678',
    profile_picture: null,
    role: 'user',
  };

  const mockShowSuccess = vi.fn();
  const mockShowError = vi.fn();
  const mockClearStatus = vi.fn();
  const mockStartLoading = vi.fn();
  const mockStopLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFieldStatus).mockReturnValue({
      fieldStatus: {},
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      clearStatus: mockClearStatus,
    });

    vi.mocked(useLoadingFields).mockReturnValue({
      loadingFields: {},
      startLoading: mockStartLoading,
      stopLoading: mockStopLoading,
    });

    vi.mocked(getCurrentUser).mockResolvedValue(mockInitialUser as any);

    window.confirm = vi.fn().mockReturnValue(true);

    let hrefValue = '';

    Object.defineProperty(window.location, 'href', {
      writable: true,
      configurable: true,
      get: () => hrefValue,
      set: (newValue) => {
        hrefValue = newValue;
      },
    });

    window.location.href = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería cargar los datos del usuario al inicializarse', async () => {
    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(result.current.user).toEqual(mockInitialUser);
    expect(result.current.isLoading).toBe(false);
  });

  it('debería manejar el error si falla la carga inicial del usuario', async () => {
    const apiError = new Error('No autorizado');
    vi.mocked(getCurrentUser).mockRejectedValue(apiError);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    expect(mockShowError).toHaveBeenCalledWith('delete_account', apiError);
    expect(result.current.isLoading).toBe(false);
  });

  it('debería actualizar un campo aplicando normalización de strings (email)', async () => {
    const updatedUserMock = { ...mockInitialUser, email: 'clean@email.com' };
    vi.mocked(updateUser).mockResolvedValue(updatedUserMock as any);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    const field = 'email' as ConfigDataField;

    await act(async () => {
      await result.current.updateField(field, '  CLEAN@email.com   ');
    });

    expect(mockStartLoading).toHaveBeenCalledWith(field);
    expect(mockClearStatus).toHaveBeenCalledWith(field);
    expect(updateUser).toHaveBeenCalledWith(mockInitialUser.id, {
      email: 'clean@email.com',
    });
    expect(result.current.user).toEqual(updatedUserMock);
    expect(mockShowSuccess).toHaveBeenCalledWith(field, '✓ Actualizado');
    expect(mockStopLoading).toHaveBeenCalledWith(field);
  });

  it('debería actualizar un campo aplicando normalización de strings (nationality)', async () => {
    const updatedUserMock = { ...mockInitialUser, nationality: 'ES' };
    vi.mocked(updateUser).mockResolvedValue(updatedUserMock as any);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    const field = 'nationality' as ConfigDataField;

    await act(async () => {
      await result.current.updateField(field, '  es  ');
    });

    expect(updateUser).toHaveBeenCalledWith(mockInitialUser.id, {
      nationality: 'ES',
    });
  });

  it('debería capturar el error si falla la actualización del campo', async () => {
    const apiError = new Error('Formato inválido');
    vi.mocked(updateUser).mockRejectedValue(apiError);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    const field = 'phone_number' as ConfigDataField;

    await act(async () => {
      await result.current.updateField(field, '5551234');
    });

    expect(mockShowError).toHaveBeenCalledWith(field, apiError);
    expect(mockStopLoading).toHaveBeenCalledWith(field);
  });

  it('debería abortar la eliminación de la cuenta si el usuario cancela la confirmación', async () => {
    window.confirm = vi.fn().mockReturnValue(false);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    await act(async () => {
      await result.current.removeAccount();
    });

    expect(deleteUser).not.toHaveBeenCalled();
    expect(mockStartLoading).not.toHaveBeenCalled();
  });

  it('debería eliminar el usuario y redirigir a /register tras confirmación exitosa', async () => {
    vi.mocked(deleteUser).mockResolvedValue({} as any);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    await act(async () => {
      await result.current.removeAccount();
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockStartLoading).toHaveBeenCalledWith('delete_account');
    expect(mockClearStatus).toHaveBeenCalledWith('delete_account');
    expect(deleteUser).toHaveBeenCalledWith(mockInitialUser.id);
    expect(window.location.href).toBe('/register');
    expect(mockStopLoading).toHaveBeenCalledWith('delete_account');
  });
});