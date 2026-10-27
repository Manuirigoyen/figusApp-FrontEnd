export type Figurita = {
  imagen: string;
  dorso?: string;
  contenedor: string;
  descripcion: string | null;
};

export type SeccionAlbum = {
  figuritas: Figurita[];
  frase?: string;
};

export type FiguritaCardProps = {
  figurita: Figurita;
  dorsoDefault?: string;
};