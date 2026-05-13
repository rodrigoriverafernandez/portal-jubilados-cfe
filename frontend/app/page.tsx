import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;
const STRAPI_URL = "http://strapi:1337";

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
  const url =
    image.formats?.medium?.url ||
    image.formats?.large?.url ||
    image.formats?.small?.url ||
    image.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `http://localhost:1337${url}`;
}

function getPdfUrl(file: any) {
  if (!file?.url) return null;
  return file.url.startsWith("http") ? file.url : `http://localhost:1337${file.url}`;
}

function safeLink(item: any, type: "noticia" | "documento" | "evento") {
  const slug = item.slug || "";
  if (!slug) return "#";
  if (type === "noticia") return `/noticias/${slug}`;
  if (type === "documento") return `/documentos/${slug}`;
  return `/eventos/${slug}`;
}

async function fetchData(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error fetching home data:", error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredData, latestNews, documentos, eventos] = await Promise.all([
    fetchData(
      `${STRAPI_URL}/api/articulos?populate=*&filters[destacado][$eq]=true&sort[0]=fecha_publicacion:desc&pagination[limit]=1`
    ),
    fetchData(
      `${STRAPI_URL}/api/articulos?populate=*&sort[0]=fecha_publicacion:desc&pagination[limit]=3`
    ),
    fetchData(`${STRAPI_URL}/api/documentos?populate=*&pagination[limit]=3`),
    fetchData(`${STRAPI_URL}/api/eventos?populate=*&pagination[limit]=3`),
  ]);

  const featured = featuredData?.[0] || null;
  const docs = Array.isArray(documentos) ? documentos : [];
  const news = Array.isArray(latestNews) ? latestNews : [];
  const nextEvents = Array.isArray(eventos) ? eventos : [];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 text-white shadow-2xl shadow-slate-950/40 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-200">Portal institucional</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Un espacio para quienes construyeron la energía de México
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            Accede a noticias, documentos y eventos diseñados para el bienestar y la información de la comunidad jubilada de la CFE.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Noticias", href: "/noticias" },
              { label: "Documentos", href: "/documentos" },
              { label: "Eventos", href: "/eventos" },
              { label: "Contacto", href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-white/15"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="space-y-8">
          <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40">
            {featured ? (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                  {getImageUrl(featured.imagen_principal || featured.imagen) ? (
                    <img
                      src={getImageUrl(featured.imagen_principal || featured.imagen)!}
                      alt={featured.titulo || "Artículo destacado"}
                      className="h-full min-h-[340px] w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[340px] items-center justify-center bg-slate-100 text-slate-500">
                      Imagen no disponible
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between rounded-b-3xl border border-slate-200 border-t-0 bg-white p-8 lg:rounded-r-3xl lg:border-t lg:border-l-0">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      Artículo destacado
                    </span>
                    <h2 className="mt-6 text-3xl font-bold text-slate-950 sm:text-4xl">
                      {featured.titulo || "Noticia destacada"}
                    </h2>
                    <p className="mt-6 text-base leading-8 text-slate-700">
                      {featured.resumen || featured.contenido || "Lee el artículo más reciente que destaca temas clave para jubilados."}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      {formatDate(featured.fecha_publicacion || featured.createdAt || featured.fecha)}
                    </p>
                    <Link
                      href={safeLink(featured, "noticia")}
                      className="inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900"
                    >
                      Leer noticia
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-600">
                No hay artículo destacado disponible.
              </div>
            )}
          </div>

          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Últimas noticias</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-950">Titulares recientes</h3>
              </div>
              <Link
                href="/noticias"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-200"
              >
                Ver todas
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item: any, index: number) => (
                <article key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Noticia
                  </span>
                  <h4 className="mt-4 text-xl font-bold text-slate-950">{item.titulo || "Sin título"}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                    {item.resumen || item.contenido || "Resumen no disponible."}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{formatDate(item.fecha_publicacion || item.createdAt || item.fecha)}</p>
                    <Link
                      href={safeLink(item, "noticia")}
                      className="rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                    >
                      Leer
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-900">Documentos recientes</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">Recursos útiles</h3>
            <div className="mt-6 space-y-4">
              {docs.map((item: any, index: number) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Documento</p>
                  <h4 className="mt-3 text-xl font-semibold text-slate-950">{item.titulo || "Sin título"}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">
                    {item.descripcion || item.resumen || "Descripción no disponible."}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    {getPdfUrl(item.archivo_pdf) ? (
                      <a
                        href={getPdfUrl(item.archivo_pdf)!}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 shadow-sm transition hover:bg-slate-100"
                      >
                        Ver PDF
                      </a>
                    ) : (
                      <span className="text-sm text-slate-500">Archivo no disponible</span>
                    )}
                    <Link
                      href={safeLink(item, "documento")}
                      className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-900">Próximos eventos</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">Actividades próximas</h3>
            <div className="mt-6 space-y-4">
              {nextEvents.map((item: any, index: number) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Evento</p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-950">{item.titulo || "Sin título"}</h4>
                    </div>
                    <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {formatDate(item.fecha)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                    {item.descripcion || "Descripción no disponible."}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">{item.ubicacion || "Ubicación por confirmar"}</span>
                    <Link
                      href={safeLink(item, "evento")}
                      className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
