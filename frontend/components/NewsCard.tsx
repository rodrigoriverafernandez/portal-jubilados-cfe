import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaURL, formatDate } from "../lib/utils";
import { Articulo } from "../lib/types";

interface NewsCardProps {
  article: Articulo;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      {article.imagen_principal && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={getStrapiMediaURL(article.imagen_principal.url) ?? "/placeholder.png"}
            alt={article.imagen_principal.alternativeText ?? article.titulo}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {article.categoria && (
          <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">
            {article.categoria.nombre}
          </p>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-slate-700 transition">
          <Link href={`/noticias/${article.slug}`}>
            {article.titulo}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.resumen && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.resumen}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">{article.autor?.nombre || 'CFE'}</span>
          <time>{article.fecha_publicacion ? formatDate(article.fecha_publicacion) : 'Fecha no disponible'}</time>
        </div>
      </div>
    </article>
  );
}