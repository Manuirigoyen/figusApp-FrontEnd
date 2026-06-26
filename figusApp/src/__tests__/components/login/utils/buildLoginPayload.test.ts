import { describe, it, expect } from 'vitest';
import { buildLoginPayload } from '../../../../components/login/utils/buildLoginPayload';

/**
 * Suite de pruebas unitarias para la función buildLoginPayload.
 * Garantiza la extracción, normalización de credenciales y la correcta
 * consolidación del objeto de transferencia de datos de inicio de sesión.
 */
describe('buildLoginPayload', () => {
  /**
   * Evalúa que las propiedades del formulario sean mapeadas al objeto final,
   * aplicando de forma estricta trim() y toLowerCase() sobre el email.
   */
  it('should correctly build the login payload and normalize credentials', () => {
    const mockFormData = new FormData();
    mockFormData.append('email', '  Usuario@Dominio.Com  ');
    mockFormData.append('password', 'passwordSeguro123');

    const captchaToken = 'token-captcha-login-456';

    const result = buildLoginPayload(mockFormData, captchaToken);

    expect(result).toEqual({
      email: 'usuario@dominio.com',
      password: 'passwordSeguro123',
      captcha_token: 'token-captcha-login-456',
    });
  });

  /**
   * Verifica el comportamiento del sistema cuando las propiedades esperadas
   * no se encuentran dentro del objeto FormData suministrado.
   */
  it('should handle missing fields by fallback empty strings', () => {
    const mockFormData = new FormData();
    const captchaToken = 'token-vacio';

    const result = buildLoginPayload(mockFormData, captchaToken);

    expect(result).toEqual({
      email: '',
      password: '',
      captcha_token: 'token-vacio',
    });
  });
});