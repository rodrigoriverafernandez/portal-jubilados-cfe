import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticuloBySlug } from "../../../lib/strapi";
import { getStrapiMediaURL, formatDate } from "../../../lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type ArticuloPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticuloPage(props: ArticuloPageProps) {
  const { params } = props;
  const resolvedParams = await params;
  const articulo = await getArticuloBySlug(resolvedParams.slug);

  if (!articulo) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {articulo.categoria ? (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
              {articulo.categoria.nombre}
            </span>
          ) : null}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {articulo.titulo}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {articulo.resumen}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(articulo.fecha_publicacion)}</span>
            {articulo.autor ? <span>Por {articulo.autor.nombre}</span> : null}
            {articulo.tiempo_lectura ? <span>{articulo.tiempo_lectura} min de lectura</span> : null}
          </div>
        </div>
        <Link
          href="/noticias"
          className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Volver a noticias
        </Link>
      </div>

      {articulo.imagen_principal ? (
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-slate-100">
          <Image
            src={getStrapiMediaURL(articulo.imagen_principal.url) ?? "/placeholder.png"}
            alt={articulo.imagen_principal.alternativeText ?? articulo.titulo}
            width={1200}
            height={700}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <div className="space-y-6 text-base leading-8 text-slate-700">
        {articulo.contenido ? (
          articulo.contenido.split(/\n\n+/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>No hay contenido disponible para este artículo.</p>
        )}
      </div>
    </div>
  );
}
