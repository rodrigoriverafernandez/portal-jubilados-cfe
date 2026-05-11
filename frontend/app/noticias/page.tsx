import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;

function formatDate(dateValue: string | null | undefined) {
  if (!dateValue) return "Fecha no disponible";
  return new Date(dateValue).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getImageUrl(image: any) {
  if (!image) return null;
  const url = image.formats?.large?.url || image.formats?.medium?.url || image.formats?.small?.url || image.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `http://localhost:1337${url}`;
}

export default async function NoticiasPage() {
  const res = await fetch(
    "http://strapi:1337/api/articulos?populate=*&sort[0]=fecha_publicacion:desc&pagination[limit]=12",
    {
      cache: "no-store",
    }
  );

  const json = await res.json();
  const articulos = Array.isArray(json.data) ? json.data : [];
  const [principal, ...resto] = articulos;
  const firstImage = getImageUrl(principal?.imagen_principal);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-14 overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-slate-800/95 px-6 py-16 text-white shadow-2xl shadow-slate-950/30 sm:px-10 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="space-y-4 border-b border-slate-700/70 pb-8">
            <p className="text-xs uppercase tracking-[0.45em] text-slate-300">Revista Corporativa</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Noticias, análisis y beneficios pensados para los jubilados de CFE
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Navega un hub editorial de contenido premium, seleccionando lo más relevante en salud, beneficios, eventos y noticias institucionales.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-sm sm:p-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-200">Edición destacada</p>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Historias que conectan con el presente de la comunidad jubilada
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                Descubre temas relevantes, desde políticas públicas hasta guías de bienestar y los próximos eventos que no te puedes perder.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/noticias"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
                >
                  Ver todas las noticias
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Tendencia</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-white">Beneficios nuevos y vigentes para tu pensión</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Un resumen rápido de los incentivos, trámites y servicios que necesitas conocer este mes.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Agenda</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-white">Eventos y seminarios destacados</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Accede a charlas, talleres y actividades para jubilados con enfoque en salud, finanzas y comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 rounded-3xl border border-slate-200/10 bg-white/90 p-5 shadow-2xl shadow-slate-950/10 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-slate-900">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Todas", active: true },
              { label: "Noticias" },
              { label: "Salud" },
              { label: "Beneficios" },
              { label: "Eventos" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  item.active
                    ? "bg-slate-950 text-white shadow-2xl shadow-slate-950/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {principal ? (
        <section className="mb-16 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10">
            {firstImage ? (
              <img
                src={firstImage}
                alt={principal.titulo ?? "Artículo principal"}
                className="h-full min-h-105 w-full object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-96 items-center justify-center bg-slate-100 text-slate-500">
                Imagen principal no disponible
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-4xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-2">
            <div>
              <span className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white shadow-md shadow-slate-950/20">
                Destacado
              </span>
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-500">
                {principal.categoria?.nombre ?? "General"}
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {principal.titulo}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                {principal.resumen ?? "Lee el artículo destacado para conocer la información más importante del día."}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span>{formatDate(principal.fecha_publicacion)}</span>
                {principal.tiempo_lectura ? <span>{principal.tiempo_lectura} min lectura</span> : null}
              </div>
              <Link
                href={`/noticias/${principal.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800"
              >
                Leer artículo
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mb-16">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {resto.map((articulo: any) => {
            const imageUrl = getImageUrl(articulo.imagen_principal);
            return (
              <article
                key={articulo.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-black/10"
              >
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={articulo.titulo ?? "Artículo"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                      Imagen no disponible
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {articulo.categoria?.nombre ?? "General"}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-950 line-clamp-2">
                      {articulo.titulo}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600 line-clamp-3">
                      {articulo.resumen ?? "Resumen no disponible."}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {formatDate(articulo.fecha_publicacion)}
                    </span>
                    <Link
                      href={`/noticias/${articulo.slug}`}
                      className="rounded-full bg-slate-950 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
                    >
                      Leer artículo
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/10 bg-slate-950 p-8 shadow-2xl shadow-slate-950/30">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Más información</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Recursos clave para jubilados
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Accede rápidamente a documentos, actividades y programas diseñados para apoyar tu bienestar y tus derechos.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Documentos",
              description: "Guías, trámites y archivos para gestionar tus beneficios con facilidad.",
              icon: "📄",
            },
            {
              title: "Eventos",
              description: "Actividades, charlas y jornadas para mantenerte informado y conectado.",
              icon: "📅",
            },
            {
              title: "Beneficios",
              description: "Resumen de apoyos y programas pensados para tu seguridad y calidad de vida.",
              icon: "💼",
            },
          ].map((card) => (
            <div key={card.title} className="group rounded-3xl border border-slate-800/60 bg-slate-900/95 p-8 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/95">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-700 text-2xl">{card.icon}</div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
              <button className="mt-8 inline-flex items-center rounded-full border border-slate-700 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </section>

      {articulos.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-slate-500">No hay artículos disponibles.</p>
        </div>
      )}
    </main>
  );
}
