import Link from "next/link";
import Image from "next/image";
import { getArticulos } from "../../lib/strapi";
import { getStrapiMediaURL, formatDate } from "../../lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function NoticiasPage() {
  const articulos = await getArticulos();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Noticias</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Últimas publicaciones desde el portal de jubilados
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Accede a las noticias más recientes, análisis y actualizaciones relevantes para la comunidad de jubilados.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {articulos.map((articulo) => (
          <article
            key={articulo.id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{formatDate(articulo.fecha_publicacion)}</span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-950">{articulo.titulo}</h2>
              <p className="mt-4 text-slate-600">{articulo.resumen}</p>
              <div className="mt-6">
                <Link
                  href={`/noticias/${articulo.slug}`}
                  className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Leer noticia
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {articulos.length === 0 && (
        <div className="text-center py-10">
          <p className="text-slate-500">No hay artículos disponibles.</p>
        </div>
      )}
    </div>
  );
}
