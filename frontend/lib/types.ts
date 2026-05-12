export type MediaImage = {
  url: string;
  name?: string | null;
  width?: number;
  height?: number;
  alternativeText?: string | null;
};

export type Categoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string | null;
  color?: string | null;
  icono?: string | null;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type Autor = {
  id: number;
  nombre: string;
  cargo?: string | null;
  biografia?: string | null;
  fotografia?: MediaImage | null;
  redes_sociales: SocialLink[];
};

export type Articulo = {
  id: number;
  titulo: string;
  slug: string;
  resumen?: string | null;
  contenido?: string | null;
  fecha_publicacion?: string | null;
  destacado?: boolean;
  tiempo_lectura?: number | null;
  seo_title?: string | null;
  seo_description?: string | null;
  imagen_principal?: MediaImage | null;
  galeria?: MediaImage[] | null;
  categoria?: Categoria | null;
  autor?: Autor | null;
};

export type Documento = {
  id: number;
  titulo: string;
  descripcion?: string | null;
  archivo_pdf?: MediaImage | null;
  categoria?: Categoria | null;
  fecha_publicacion?: string | null;
  destacado?: boolean;
};

export type StrapiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};
