import { describe, it, expect } from 'vitest';
import { buildContactPayload, type FooterContactPayload } from '../../../../components/home/utils/buildContactPayload'; 

describe('buildContactPayload', () => {
  
  it('debería construir correctamente el payload con datos válidos', () => {
    // 1. Arrange (Preparar)
    const formData = new FormData();
    formData.append('contact_reason', 'soporte');
    formData.append('contact_email', 'Juan.Perez@Gmail.com');
    formData.append('contact_message', 'Hola, tengo un problema con mi cuenta.');
    
    const captchaToken = 'token-falso-12345';

    const result = buildContactPayload(formData, captchaToken);

    const expectedPayload: FooterContactPayload = {
      contact_reason: 'soporte',
      contact_email: 'juan.perez@gmail.com', 
      contact_message: 'Hola, tengo un problema con mi cuenta.',
      captcha_token: 'token-falso-12345'
    };

    expect(result).toEqual(expectedPayload);
  });

  it('debería aplicar trim (limpiar espacios) al email y al mensaje', () => {

    const formData = new FormData();
    formData.append('contact_reason', 'compras');
    formData.append('contact_email', '   correo@conespacios.com   ');
    formData.append('contact_message', '   Mensaje con espacios a los lados   ');
    
    const captchaToken = 'token-captcha';

    const result = buildContactPayload(formData, captchaToken);

    expect(result.contact_email).toBe('correo@conespacios.com');
    expect(result.contact_message).toBe('Mensaje con espacios a los lados');
  });

  it('debería transformar el email completamente a minúsculas', () => {
    // Arrange
    const formData = new FormData();
    formData.append('contact_reason', 'sugerencias');
    formData.append('contact_email', 'USER_NAME_TEST@Domain.COM');
    formData.append('contact_message', 'Una sugerencia cualquiera.');
    
    const captchaToken = 'token-minúsculas'; 

    // Act
    const result = buildContactPayload(formData, captchaToken);

    // Assert
    expect(result.contact_email).toBe('user_name_test@domain.com');
  });

  it('debería devolver "null" en formato string si el FormData no contiene las propiedades', () => {
    const emptyFormData = new FormData(); 
    const captchaToken = 'xyz';

    const result = buildContactPayload(emptyFormData, captchaToken);

    expect(result.contact_reason).toBe('null');
    expect(result.contact_email).toBe('null');
    expect(result.contact_message).toBe('null');
    expect(result.captcha_token).toBe('xyz');
  });

});