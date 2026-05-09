import Link from "next/link";
import Image from "next/image";
import { getArticulosDestacados } from "../lib/strapi";
import { getStrapiMediaURL, formatDate } from "../lib/utils";

export default async function Hero() {
  const destacados = await getArticulosDestacados();
  const mainArticle = destacados[0]; // Asumir que el primero es el principal

  if (!mainArticle) return null;

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-slate-500 font-medium">
                Noticia destacada
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                {mainArticle.titulo}
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                {mainArticle.resumen || mainArticle.contenido?.substring(0, 200) + '...'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href={`/noticias/${mainArticle.slug}`}
                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition duration-300 text-lg"
              >
                Leer noticia
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <div className="text-sm text-slate-500">
                <span className="font-medium">{mainArticle.autor?.nombre || 'CFE'}</span>
                <span className="mx-2">•</span>
                <time>{mainArticle.fecha_publicacion ? formatDate(mainArticle.fecha_publicacion) : 'Fecha no disponible'}</time>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {mainArticle.imagen_principal && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getStrapiMediaURL(mainArticle.imagen_principal.url) ?? "/placeholder.png"}
                  alt={mainArticle.imagen_principal.alternativeText ?? mainArticle.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}