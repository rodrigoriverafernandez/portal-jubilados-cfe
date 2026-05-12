import Link from "next/link";

export const dynamic = "force-dynamic";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://strapi:1337";

async function fetchItems(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

function getSummary(item: any, type: string) {
  if (type === "noticia") {
    return item.resumen || item.contenido || "Sin descripción disponible.";
  }
  if (type === "documento") {
    return item.descripcion || item.resumen || "Sin descripción disponible.";
  }
  if (type === "evento") {
    return item.descripcion || "Sin descripción disponible.";
  }
  return "Sin descripción disponible.";
}

function getLink(item: any, type: string) {
  const slug = item.slug || "";
  if (!slug) return "#";
  if (type === "noticia") return `/noticias/${slug}`;
  if (type === "documento") return `/documentos/${slug}`;
  if (type === "evento") return `/eventos/${slug}`;
  return "#";
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string | string[] };
}) {
  const query = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const term = query?.trim() ?? "";
  const encodedTerm = encodeURIComponent(term);

  const [articulos, documentos, eventos] = term
    ? await Promise.all([
        fetchItems(
          `${STRAPI_URL}/api/articulos?populate=*&filters[$or][0][titulo][$containsi]=${encodedTerm}&filters[$or][1][resumen][$containsi]=${encodedTerm}&filters[$or][2][contenido][$containsi]=${encodedTerm}`
        ),
        fetchItems(
          `${STRAPI_URL}/api/documentos?populate=*&filters[$or][0][titulo][$containsi]=${encodedTerm}&filters[$or][1][descripcion][$containsi]=${encodedTerm}`
        ),
        fetchItems(
          `${STRAPI_URL}/api/eventos?populate=*&filters[$or][0][titulo][$containsi]=${encodedTerm}&filters[$or][1][descripcion][$containsi]=${encodedTerm}&filters[$or][2][ubicacion][$containsi]=${encodedTerm}`
        ),
      ])
    : [[], [], []];

  const totalResults = articulos.length + documentos.length + eventos.length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 text-white shadow-2xl shadow-slate-950/30 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200">Búsqueda premium</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Resultados de búsqueda
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            Encuentra noticias, documentos y eventos con la palabra clave que necesitas.
          </p>
          <p className="mt-4 text-sm text-slate-300">
            {term
              ? `Mostrando ${totalResults} resultado${totalResults !== 1 ? "s" : ""} para "${term}".`
              : "Ingresa un término de búsqueda en el navbar y presiona Enter."}
          </p>
        </div>
      </section>

      {term && totalResults === 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center shadow-xl shadow-slate-200/40">
          <h2 className="text-3xl font-bold text-slate-900">No encontramos resultados para tu búsqueda.</h2>
          <p className="mt-4 text-slate-600">Intenta con otra palabra clave o revisa la ortografía.</p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-10">
          {articulos.length > 0 && (
            <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Noticias</h2>
                  <p className="text-sm text-slate-500">Resultados en artículos y noticias.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {articulos.length}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {articulos.map((item: any, index: number) => (
                  <article key={index} className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                    <span className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Noticia
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{item.titulo || "Sin título"}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{getSummary(item, "noticia")}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Link
                        href={getLink(item, "noticia")}
                        className="rounded-full bg-blue-950 px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                      >
                        Ver
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {documentos.length > 0 && (
            <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Documentos</h2>
                  <p className="text-sm text-slate-500">Resultados en documentos y recursos.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {documentos.length}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {documentos.map((item: any, index: number) => (
                  <article key={index} className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                    <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Documento
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{item.titulo || "Sin título"}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{getSummary(item, "documento")}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Link
                        href={getLink(item, "documento")}
                        className="rounded-full bg-blue-950 px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                      >
                        Ver
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {eventos.length > 0 && (
            <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Eventos</h2>
                  <p className="text-sm text-slate-500">Resultados en eventos y actividades.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {eventos.length}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {eventos.map((item: any, index: number) => (
                  <article key={index} className="rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                    <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Evento
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{item.titulo || "Sin título"}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{getSummary(item, "evento")}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Link
                        href={getLink(item, "evento")}
                        className="rounded-full bg-blue-950 px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-900"
                      >
                        Ver
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
