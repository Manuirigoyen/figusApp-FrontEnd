export interface FooterContactPayload {
  contact_reason: string;
  contact_email: string;
  contact_message: string;
  captcha_token: string;
}

export const buildContactPayload = (
  formData: FormData,
  captchaToken: string,
): FooterContactPayload => ({
  contact_reason: String(formData.get('contact_reason')),
  contact_email: String(formData.get('contact_email'))
    .trim()
    .toLowerCase(),
  contact_message: String(formData.get('contact_message')).trim(),
  captcha_token: captchaToken,
});