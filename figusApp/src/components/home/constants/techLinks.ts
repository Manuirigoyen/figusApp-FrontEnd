/**
 * Tecnologías utilizadas por la aplicación.
 */
export const techLinks: TechLink[] = [
  {
    href: 'https://react.dev/reference/react',
    img: new URL(
      '../../../assets/img/icons/footer/react.png',
      import.meta.url,
    ).href,
    alt: 'React',
    label: 'Documentación React',
  },

  {
    href: 'https://docs.nestjs.com/',
    img: new URL(
      '../../../assets/img/icons/footer/nestJS.png',
      import.meta.url,
    ).href,
    alt: 'Nest JS',
    label: 'Documentación Nest JS',
  },

  {
    href: 'https://dev.mysql.com/doc/',
    img: new URL(
      '../../../assets/img/icons/footer/mysql.png',
      import.meta.url,
    ).href,
    alt: 'MySQL',
    label: 'Documentación MySQL',
  },

   {
    href: 'https://www.cloudflare.com/es-es/application-services/products/turnstile/',
    img: new URL(
      '../../../assets/img/icons/footer/reCaptcha.png',
      import.meta.url,
    ).href,
    alt: 'reCaptcha',
    label: 'Documentación reCaptcha',
  },
];

export interface TechLink {
  href: string;
  img: string;
  alt: string;
  label: string;
}