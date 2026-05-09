import Link from "next/link";
import Image from "next/image";
import { getArticulosDestacados } from "../lib/strapi";
import { getStrapiMediaURL, formatDate } from "../lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const destacados = await getArticulosDestacados();

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Portal Jubilados CFE</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Noticias y actualizaciones relevantes para jubilados
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Conecta con los artículos más recientes, recursos y análisis pensados para la comunidad de jubilados de CFE.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/noticias"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver noticias
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Destacados</p>
            <div className="mt-6 space-y-6">
              {destacados.map((articulo) => (
                <article key={articulo.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:-translate-y-0.5 hover:shadow-md">
                  {articulo.imagen_principal ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={getStrapiMediaURL(articulo.imagen_principal.url) ?? "/placeholder.png"}
                        alt={articulo.imagen_principal.alternativeText ?? articulo.titulo}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <div className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                      {articulo.categoria?.nombre ?? "Sin categoría"}
                    </div>
                    <h2 className="text-xl font-semibold text-slate-950">{articulo.titulo}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                      {articulo.resumen}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-500">
                      <span>{formatDate(articulo.fecha_publicacion)}</span>
                      <Link
                        href={`/noticias/${articulo.slug}`}
                        className="font-semibold text-slate-950 transition hover:text-slate-700"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
