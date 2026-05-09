import type { Articulo, Autor, Categoria, Evento, StrapiResponse } from "./types";

/**
 * Get the appropriate Strapi API URL based on execution context
 * - On server (Node.js in Docker): http://strapi:1337 (internal service name)
 * - On client (browser): http://localhost:1337 (external access)
 */
function getApiUrl(): string {
  // For development, always use localhost since Next.js runs on host
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
}

export const API_URL = getApiUrl();

const ENDPOINTS = {
  articulos: "/api/articulos",
  categorias: "/api/categorias",
  autores: "/api/autores",
  eventos: "/api/eventos",
  documentos: "/api/documentos",
};

/**
 * Enhanced Strapi API client with robust error handling
 */
async function fetchStrapi<T>(path: string): Promise<StrapiResponse<T>> {
  const url = `${API_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log fetch response status
    if (!response.ok) {
      console.warn(`[Strapi] ${response.status} ${response.statusText} - ${url}`);
    }

    if (!response.ok) {
      // Return empty data structure to prevent crashes
      if (response.status === 404) {
        return { data: [] as any };
      }
      
      // Try to parse error message
      try {
        const errorData = await response.json();
        console.warn("[Strapi API Error]", errorData);
      } catch {
        console.warn(`[Strapi] Request failed: ${response.statusText}`);
      }
      
      return { data: [] as any };
    }

    const data = (await response.json()) as StrapiResponse<T>;
    return data;
  } catch (error) {
    // Handle network errors, CORS issues, etc.
    console.warn(
      "[Strapi Fetch Error]",
      error instanceof Error ? error.message : error,
      "URL:",
      url
    );

    // Return empty response structure to prevent crashes
    return { data: [] as any };
  }
}

const articlePopulate = ""; // Temporarily removed populate to avoid errors

export async function getArticulos(): Promise<Articulo[]> {
  const baseParams = "sort[0]=fecha_publicacion:desc&pagination[limit]=12";
  const params = articlePopulate ? `${articlePopulate}&${baseParams}` : `?${baseParams}`;
  try {
    const response = await fetchStrapi<any>(`${ENDPOINTS.articulos}${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatArticulo(item));
  } catch (error) {
    console.warn("[getArticulos]", error);
    return [];
  }
}

export async function getArticulosDestacados(): Promise<Articulo[]> {
  const baseParams = "filters[destacado][$eq]=true&sort[0]=fecha_publicacion:desc&pagination[limit]=4";
  const params = articlePopulate ? `${articlePopulate}&${baseParams}` : `?${baseParams}`;
  try {
    const response = await fetchStrapi<any>(`${ENDPOINTS.articulos}${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatArticulo(item));
  } catch (error) {
    console.warn("[getArticulosDestacados]", error);
    return [];
  }
}

export async function getArticuloBySlug(
  slug: string
): Promise<Articulo | null> {
  const baseParams = `filters[slug][$eq]=${encodeURIComponent(slug)}`;
  const params = articlePopulate ? `${articlePopulate}&${baseParams}` : `?${baseParams}`;
  try {
    const response = await fetchStrapi<any>(`${ENDPOINTS.articulos}${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return null;
    }
    const item = response.data?.[0];
    return item ? formatArticulo(item) : null;
  } catch (error) {
    console.warn("[getArticuloBySlug]", error);
    return null;
  }
}

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const response = await fetchStrapi<any>(
      `${ENDPOINTS.categorias}?sort[0]=nombre:asc&populate=`
    );
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      slug: item.slug,
      descripcion: item.descripcion ?? null,
      color: item.color ?? null,
      icono: item.icono ?? null,
    }));
  } catch (error) {
    console.warn("[getCategorias]", error);
    return [];
  }
}

export async function getAutores(): Promise<Autor[]> {
  try {
    const response = await fetchStrapi<any>(
      `${ENDPOINTS.autores}?sort[0]=nombre:asc&populate=fotografia,redes_sociales`
    );
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatAutor(item));
  } catch (error) {
    console.warn("[getAutores]", error);
    return [];
  }
}

export async function getEventos(): Promise<Evento[]> {
  try {
    const response = await fetchStrapi<any>(`${ENDPOINTS.eventos}?sort[0]=fecha:desc&populate=imagen`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatEvento(item));
  } catch (error) {
    console.warn("[getEventos]", error);
    return [];
  }
}

function formatArticulo(item: any): Articulo {
  // In Strapi v5, fields are directly on item, not in attributes
  return {
    id: item.id,
    titulo: item.titulo,
    slug: item.slug,
    resumen: item.resumen ?? null,
    contenido: item.contenido ?? null,
    fecha_publicacion: item.fecha_publicacion ?? null,
    destacado: item.destacado ?? false,
    tiempo_lectura: item.tiempo_lectura ?? null,
    seo_title: item.seo_title ?? null,
    seo_description: item.seo_description ?? null,
    imagen_principal: null, // Temporarily null since populate removed
    galeria: null, // Temporarily null since populate removed
    categoria: null, // Temporarily null since populate removed
    autor: null, // Temporarily null since populate removed
  };
}

function formatAutor(item: any): Autor {
  return {
    id: item.id,
    nombre: item.nombre,
    cargo: item.cargo ?? null,
    biografia: item.biografia ?? null,
    fotografia: null, // Temporarily null
    redes_sociales: [], // Temporarily empty
  };
}

function formatEvento(item: any): Evento {
  return {
    id: item.id,
    titulo: item.titulo,
    descripcion: item.descripcion ?? null,
    fecha: item.fecha ?? null,
    ubicacion: item.ubicacion ?? null,
    imagen: null, // Temporarily null
  };
}
