/**
 * Enlace legal mostrado en el footer.
 */
export const legalLinks: LegalLink[] = [
  {
    href: 'https://en.wikipedia.org/wiki/Terms_of_service',
    label: 'Términos de Servicio',
    ariaLabel: 'Términos de Servicio',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Pol%C3%ADtica_de_privacidad',
    label: 'Política de Privacidad',
    ariaLabel: 'Política de Privacidad',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)',
    label: 'Política de Cookies',
    ariaLabel: 'Política de Cookies',
  },
];

export interface LegalLink {
  href: string;
  label: string;
  ariaLabel: string;
}