import type { Articulo, Autor, Categoria, Evento, StrapiResponse } from "./types";

/**
 * Get the appropriate Strapi API URL based on execution context
 * - On server (Node.js in Docker): http://strapi:1337 (internal service name)
 * - On client (browser): http://localhost:1337 (external access)
 */
function getApiUrl(): string {
  // Check if running on server side (Node.js)
  if (typeof window === "undefined") {
    // Server-side: use internal Docker service name
    return process.env.STRAPI_API_URL || "http://strapi:1337";
  }
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
}

export const API_URL = getApiUrl();

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
        console.error("[Strapi API Error]", errorData);
      } catch {
        console.error(`[Strapi] Request failed: ${response.statusText}`);
      }
      
      return { data: [] as any };
    }

    const data = (await response.json()) as StrapiResponse<T>;
    return data;
  } catch (error) {
    // Handle network errors, CORS issues, etc.
    console.error(
      "[Strapi Fetch Error]",
      error instanceof Error ? error.message : error,
      "URL:",
      url
    );

    // Return empty response structure to prevent crashes
    return { data: [] as any };
  }
}

const articlePopulate =
  "?populate[imagen_principal]=*&populate[galeria]=*&populate[categoria]=*&populate[autor]=*";

export async function getArticulos(): Promise<Articulo[]> {
  const params = `${articlePopulate}&sort[0]=fecha_publicacion:desc&pagination[limit]=12`;
  try {
    const response = await fetchStrapi<any>(`/api/articulos${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatArticulo(item));
  } catch (error) {
    console.error("[getArticulos]", error);
    return [];
  }
}

export async function getArticulosDestacados(): Promise<Articulo[]> {
  const params = `${articlePopulate}&filters[destacado][$eq]=true&sort[0]=fecha_publicacion:desc&pagination[limit]=4`;
  try {
    const response = await fetchStrapi<any>(`/api/articulos${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatArticulo(item));
  } catch (error) {
    console.error("[getArticulosDestacados]", error);
    return [];
  }
}

export async function getArticuloBySlug(
  slug: string
): Promise<Articulo | null> {
  const params = `${articlePopulate}&filters[slug][$eq]=${encodeURIComponent(slug)}`;
  try {
    const response = await fetchStrapi<any>(`/api/articulos${params}`);
    if (!response.data || !Array.isArray(response.data)) {
      return null;
    }
    const item = response.data?.[0];
    return item ? formatArticulo(item) : null;
  } catch (error) {
    console.error("[getArticuloBySlug]", error);
    return null;
  }
}

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const response = await fetchStrapi<any>(
      `/api/categorias?sort[0]=nombre:asc&populate=`
    );
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => ({
      id: item.id,
      nombre: item.attributes.nombre,
      slug: item.attributes.slug,
      descripcion: item.attributes.descripcion ?? null,
      color: item.attributes.color ?? null,
      icono: item.attributes.icono ?? null,
    }));
  } catch (error) {
    console.error("[getCategorias]", error);
    return [];
  }
}

export async function getAutores(): Promise<Autor[]> {
  try {
    const response = await fetchStrapi<any>(
      `/api/autores?sort[0]=nombre:asc&populate=fotografia,redes_sociales`
    );
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatAutor(item));
  } catch (error) {
    console.error("[getAutores]", error);
    return [];
  }
}

export async function getEventos(): Promise<Evento[]> {
  try {
    const response = await fetchStrapi<any>(`/api/eventos?sort[0]=fecha:desc&populate=imagen`);
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map((item: any) => formatEvento(item));
  } catch (error) {
    console.error("[getEventos]", error);
    return [];
  }
}

function formatArticulo(item: any): Articulo {
  const attrs = item.attributes;
  return {
    id: item.id,
    titulo: attrs.titulo,
    slug: attrs.slug,
    resumen: attrs.resumen ?? null,
    contenido: attrs.contenido ?? null,
    fecha_publicacion: attrs.fecha_publicacion ?? null,
    destacado: attrs.destacado ?? false,
    tiempo_lectura: attrs.tiempo_lectura ?? null,
    seo_title: attrs.seo_title ?? null,
    seo_description: attrs.seo_description ?? null,
    imagen_principal: attrs.imagen_principal?.data
      ? {
          url: attrs.imagen_principal.data.attributes.url,
          width: attrs.imagen_principal.data.attributes.width,
          height: attrs.imagen_principal.data.attributes.height,
          alternativeText: attrs.imagen_principal.data.attributes.alternativeText,
        }
      : null,
    galeria: attrs.galeria?.data
      ? attrs.galeria.data.map((item: any) => ({
          url: item.attributes.url,
          width: item.attributes.width,
          height: item.attributes.height,
          alternativeText: item.attributes.alternativeText,
        }))
      : null,
    categoria: attrs.categoria?.data
      ? {
          id: attrs.categoria.data.id,
          nombre: attrs.categoria.data.attributes.nombre,
          slug: attrs.categoria.data.attributes.slug,
          descripcion: attrs.categoria.data.attributes.descripcion ?? null,
          color: attrs.categoria.data.attributes.color ?? null,
          icono: attrs.categoria.data.attributes.icono ?? null,
        }
      : null,
    autor: attrs.autor?.data
      ? {
          id: attrs.autor.data.id,
          nombre: attrs.autor.data.attributes.nombre,
          cargo: attrs.autor.data.attributes.cargo ?? null,
          biografia: attrs.autor.data.attributes.biografia ?? null,
          fotografia: attrs.autor.data.attributes.fotografia?.data
            ? {
                url: attrs.autor.data.attributes.fotografia.data.attributes.url,
                width: attrs.autor.data.attributes.fotografia.data.attributes.width,
                height: attrs.autor.data.attributes.fotografia.data.attributes.height,
                alternativeText: attrs.autor.data.attributes.fotografia.data.attributes.alternativeText,
              }
            : null,
          redes_sociales: attrs.autor.data.attributes.redes_sociales?.data?.map(
            (link: any) => ({
              platform: link.attributes.platform,
              url: link.attributes.url,
            })
          ) ?? [],
        }
      : null,
  };
}

function formatAutor(item: any): Autor {
  const attrs = item.attributes;
  return {
    id: item.id,
    nombre: attrs.nombre,
    cargo: attrs.cargo ?? null,
    biografia: attrs.biografia ?? null,
    fotografia: attrs.fotografia?.data
      ? {
          url: attrs.fotografia.data.attributes.url,
          width: attrs.fotografia.data.attributes.width,
          height: attrs.fotografia.data.attributes.height,
          alternativeText: attrs.fotografia.data.attributes.alternativeText,
        }
      : null,
    redes_sociales: attrs.redes_sociales?.data?.map((link: any) => ({
      platform: link.attributes.platform,
      url: link.attributes.url,
    })) ?? [],
  };
}

function formatEvento(item: any): Evento {
  const attrs = item.attributes;
  return {
    id: item.id,
    titulo: attrs.titulo,
    descripcion: attrs.descripcion ?? null,
    fecha: attrs.fecha ?? null,
    ubicacion: attrs.ubicacion ?? null,
    imagen: attrs.imagen?.data
      ? {
          url: attrs.imagen.data.attributes.url,
          width: attrs.imagen.data.attributes.width,
          height: attrs.imagen.data.attributes.height,
          alternativeText: attrs.imagen.data.attributes.alternativeText,
        }
      : null,
  };
}
