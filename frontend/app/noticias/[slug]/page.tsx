import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ArticuloPageProps = {
  params: {
    slug: string;
  };
};

// Calcular tiempo de lectura
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Componente de botón social reutilizable
function ShareButton({
  platform,
  url,
  title,
}: {
  platform: string;
  url: string;
  title: string;
}) {
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  };

  const icons: Record<string, string> = {
    twitter: "𝕏",
    facebook: "f",
    whatsapp: "💬",
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
      title={`Compartir en ${platform}`}
    >
      <span className="text-sm font-bold transition-colors duration-300 group-hover:text-white">
        {icons[platform]}
      </span>
    </a>
  );
}

export default async function ArticuloPage({ params }: ArticuloPageProps) {
  const slug = params.slug;
  
  const res = await fetch(
    `http://strapi:1337/api/articulos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    {
      cache: "no-store",
    }
  );

  const json = await res.json();
  const articulo =
    Array.isArray(json.data) && json.data.length > 0 ? json.data[0] : null;

  if (!articulo) {
    notFound();
  }

  // Resolver imagen principal
  const imageUrl = articulo.imagen_principal?.formats?.large?.url
    ? `http://localhost:1337${articulo.imagen_principal.formats.large.url}`
    : articulo.imagen_principal?.formats?.medium?.url
    ? `http://localhost:1337${articulo.imagen_principal.formats.medium.url}`
    : articulo.imagen_principal?.formats?.small?.url
    ? `http://localhost:1337${articulo.imagen_principal.formats.small.url}`
    : articulo.imagen_principal?.url
    ? `http://localhost:1337${articulo.imagen_principal.url}`
    : null;

  const readTime = calculateReadTime(articulo.contenido || "");
  const publicationDate = new Date(articulo.fecha_publicacion);
  const formattedDate = publicationDate.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {imageUrl && (
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={articulo.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          {/* Overlay degradado oscuro */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />

          {/* Contenido del Hero */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16">
            <div className="max-w-3xl space-y-4">
              {/* Badge Categoría */}
              {articulo.categorias && articulo.categorias.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {articulo.categorias.map(
                    (cat: { attributes?: { nombre: string } } | string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg"
                      >
                        {typeof cat === "string" ? cat : cat?.attributes?.nombre || "Noticia"}
                      </span>
                    )
                  )}
                </div>
              )}

              {/* Título Principal */}
              <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                {articulo.titulo}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-white/90">
                {articulo.autores && articulo.autores.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Por</span>
                    <span className="font-semibold">
                      {articulo.autores.map((a: any) => a.attributes?.nombre || a.nombre).join(", ")}
                    </span>
                  </div>
                )}
                <span className="hidden sm:inline">•</span>
                <time className="font-medium">{formattedDate}</time>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{readTime} min de lectura</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Editorial */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 md:py-20">
          {/* Botón Volver - Desktop */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            >
              ← Volver a noticias
            </Link>
            {/* Botones Compartir - Desktop */}
            <div className="hidden gap-3 sm:flex">
              <ShareButton platform="twitter" url={pageUrl} title={articulo.titulo} />
              <ShareButton platform="facebook" url={pageUrl} title={articulo.titulo} />
              <ShareButton platform="whatsapp" url={pageUrl} title={articulo.titulo} />
            </div>
          </div>

          {/* Resumen */}
          {articulo.resumen && (
            <div className="mb-10 border-l-4 border-blue-600 bg-slate-50 p-6 italic text-slate-800 sm:p-8">
              <p className="text-lg leading-relaxed">{articulo.resumen}</p>
            </div>
          )}

          {/* Contenido Principal */}
          <article className="prose prose-lg prose-slate max-w-none">
            <div className="space-y-8 text-slate-700">
              {articulo.contenido ? (
                articulo.contenido
                  .split(/\n\n+/)
                  .filter((p: string) => p.trim())
                  .map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="leading-8 text-lg"
                    >
                      {paragraph.trim()}
                    </p>
                  ))
              ) : (
                <p className="text-slate-500">
                  No hay contenido disponible para este artículo.
                </p>
              )}
            </div>
          </article>

          {/* Botones Compartir - Mobile */}
          <div className="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-12 sm:hidden">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Compartir artículo
            </p>
            <div className="flex gap-3">
              <ShareButton platform="twitter" url={pageUrl} title={articulo.titulo} />
              <ShareButton platform="facebook" url={pageUrl} title={articulo.titulo} />
              <ShareButton platform="whatsapp" url={pageUrl} title={articulo.titulo} />
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-slate-200" />

          {/* Footer con autor */}
          {articulo.autores && articulo.autores.length > 0 && (
            <div className="bg-linear-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Sobre el autor
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                <strong>
                  {articulo.autores.map((a: any) => a.attributes?.nombre || a.nombre).join(", ")}
                </strong>
              </p>
            </div>
          )}

          {/* Botón Volver - Mobile */}
          <div className="mt-12 sm:hidden">
            <Link
              href="/noticias"
              className="block w-full rounded-lg border border-slate-200 px-6 py-3 text-center font-semibold text-slate-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            >
              ← Volver a noticias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
