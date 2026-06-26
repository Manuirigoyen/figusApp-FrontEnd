import { describe, it, expect } from 'vitest';
import { buildRegisterPayload } from '../../../../components/register/utils/buildRegisterPayload';

/**
 * Suite de pruebas unitarias para la función buildRegisterPayload.
 * Verifica la correcta transformación de objetos FormData, normalización de strings,
 * inyección del token CAPTCHA y manejo condicional de archivos y campos opcionales.
 */
describe('buildRegisterPayload', () => {
  /**
   * Testea el mapeo correcto de todos los campos requeridos, asegurando
   * la aplicación de trim() y conversión a minúsculas en el email.
   */
  it('should correctly map required fields and normalize email and strings', () => {
    const mockFormData = new FormData();
    mockFormData.append('first_name', '  Lionel  ');
    mockFormData.append('last_name', '  Messi  ');
    mockFormData.append('date_of_birth', '1987-06-24');
    mockFormData.append('country', 'AR');
    mockFormData.append('email', '  LeoMessi@GOAT.com  ');
    mockFormData.append('password', 'secret123');

    const captchaToken = 'mock-captcha-1234';

    const result = buildRegisterPayload(mockFormData, captchaToken);

    expect(result.get('captcha_token')).toBe('mock-captcha-1234');
    expect(result.get('first_name')).toBe('Lionel');
    expect(result.get('last_name')).toBe('Messi');
    expect(result.get('date_of_birth')).toBe('1987-06-24');
    expect(result.get('nationality')).toBe('AR');
    expect(result.get('email')).toBe('leomessi@goat.com');
    expect(result.get('password')).toBe('secret123');
    expect(result.has('phone_number')).toBe(false);
    expect(result.has('profile_picture')).toBe(false);
  });

  /**
   * Verifica que el número de teléfono sea correctamente adjuntado
   * al payload final en caso de estar presente en los datos iniciales.
   */
  it('should include phone_number if it is present and not empty', () => {
    const mockFormData = new FormData();
    mockFormData.append('first_name', 'Diego');
    mockFormData.append('last_name', 'Maradona');
    mockFormData.append('date_of_birth', '1960-10-30');
    mockFormData.append('country', 'AR');
    mockFormData.append('email', 'diego@10.com');
    mockFormData.append('password', 'barrilete_cosmico');
    mockFormData.append('phone_number', '  +5491112345678  ');

    const result = buildRegisterPayload(mockFormData, 'token');

    expect(result.get('phone_number')).toBe('+5491112345678');
  });

  /**
   * Garantiza que el archivo de imagen de perfil se agregue al FormData final
   * únicamente si es una instancia válida de File y posee un tamaño superior a 0.
   */
  it('should append profile_picture if it is a valid non-empty File', () => {
    const mockFormData = new FormData();
    mockFormData.append('first_name', 'Dibu');
    mockFormData.append('last_name', 'Martinez');
    mockFormData.append('date_of_birth', '1992-09-02');
    mockFormData.append('country', 'AR');
    mockFormData.append('email', 'dibu@arco.com');
    mockFormData.append('password', 'guantes_de_oro');

    const mockFile = new File(['avatar_content'], 'profile.png', { type: 'image/png' });
    mockFormData.append('profile_picture', mockFile);

    const result = buildRegisterPayload(mockFormData, 'token');

    const uploadedFile = result.get('profile_picture');
    expect(uploadedFile).toBeInstanceOf(File);
    expect((uploadedFile as File).name).toBe('profile.png');
  });

  /**
   * Comprueba que la imagen de perfil sea ignorada si se envía un archivo
   * vacío o con tamaño equivalente a cero bytes.
   */
  it('should not append profile_picture if the File is empty', () => {
    const mockFormData = new FormData();
    mockFormData.append('first_name', 'Dibu');
    mockFormData.append('last_name', 'Martinez');
    mockFormData.append('date_of_birth', '1992-09-02');
    mockFormData.append('country', 'AR');
    mockFormData.append('email', 'dibu@arco.com');
    mockFormData.append('password', 'guantes_de_oro');

    const emptyFile = new File([], 'empty.png', { type: 'image/png' });
    mockFormData.append('profile_picture', emptyFile);

    const result = buildRegisterPayload(mockFormData, 'token');

    expect(result.has('profile_picture')).toBe(false);
  });
});