/**
 * Redes sociales visibles en el footer.
 */
export const socialLinks: SocialLink[] = [
  {
    href: 'https://wa.me/1234567890',
    icon: 'bi bi-whatsapp',
    label: 'WhatsApp',
    title: 'WhatsApp',
  },
  {
    href: 'https://www.instagram.com/',
    icon: 'bi bi-instagram',
    label: 'Instagram',
    title: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/',
    icon: 'bi bi-facebook',
    label: 'Facebook',
    title: 'Facebook',
  },
  {
    href: 'mailto:figusApp@gmail.com',
    icon: 'bi bi-envelope',
    label: 'Email',
    title: 'Enviar email',
  },
  {
    href: 'https://www.linkedin.com/',
    icon: 'bi bi-linkedin',
    label: 'LinkedIn',
    title: 'LinkedIn',
  },
];

/**
 * Red social renderizada en el footer.
 */
export interface SocialLink {
  href: string;
  icon: string;
  label: string;
  title: string;
}