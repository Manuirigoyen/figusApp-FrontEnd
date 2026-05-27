/**
 * Métodos de pago soportados.
 */
export const paymentMethods: PaymentMethod[] = [
  {
    link: 'https://www.visa.com',
    img: new URL(
      '../../../assets/img/icons/footer/visa.jpeg',
      import.meta.url,
    ).href,
    alt: 'Visa',
  },

  {
    link: 'https://www.mastercard.com',
    img: new URL(
      '../../../assets/img/icons/footer/master.jpeg',
      import.meta.url,
    ).href,
    alt: 'Mastercard',
  },

  {
    link: 'https://www.pagofacil.com.ar/',
    img: new URL(
      '../../../assets/img/icons/footer/pagoFacil.jpeg',
      import.meta.url,
    ).href,
    alt: 'Pago Fácil',
  },

  {
    link: 'https://www.rapipago.com.ar',
    img: new URL(
      '../../../assets/img/icons/footer/rapiPago.jpeg',
      import.meta.url,
    ).href,
    alt: 'Rapi Pago',
  },
];

export interface PaymentMethod {
  link: string;
  img: string;
  alt: string;
}