/**
 * Interfaz para definir las opciones de un elemento select de HTML.
 */
export interface OpcionSelect<T> {
  value: T;
  label: string;
}