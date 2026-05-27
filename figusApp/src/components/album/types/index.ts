// src/types/index.ts
// Definiciones de tipos para la aplicación FigusApp

/**
 * Información de un equipo de fútbol
 */
export interface TeamInfo {
  /** Nombre del equipo */
  name: string;
  /** Ruta de la imagen del icono de la bandera */
  banderaIcono: string;
  /** Descripción del equipo y su historia */
  descripcion: string;
  /** Ruta de la imagen de la bandera principal */
  banderaPrincipal: string;
}

/**
 * Representa una figurita repetida en la billetera
 */
export interface BilleteraItem {
  /** Cantidad de figuritas repetidas de este tipo */
  count: number;
}

/**
 * Colección de figuritas repetidas organizadas por ID de figurita
 */
export interface Billetera {
  [figuritaId: string]: BilleteraItem;
}

export interface TeamInfo {
  name: string;
  banderaIcono: string;
  descripcion: string;
  banderaPrincipal: string;
}