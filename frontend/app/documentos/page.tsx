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
  const url =
    image.formats?.medium?.url ||
    image.formats?.large?.url ||
    image.formats?.small?.url ||
    image.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `http://localhost:1337${url}`;
}

export default async function DocumentosPage() {
  const STRAPI_URL = process.env.STRAPI_API_URL || "http://strapi:1337";
  let documentos: any[] = [];

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/documentos?populate=*`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const json = await res.json();
      documentos = Array.isArray(json.data) ? json.data : [];
    }
  } catch (error) {
    console.error("Error fetching documentos:", error);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 text-white shadow-2xl shadow-slate-950/40 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200">Biblioteca digital</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Documentos y recursos
          </h1>
          <p className="max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Acceso a documentos oficiales, guías, formularios y recursos diseñados para facilitar tus gestiones y beneficios como jubilado de la CFE.
          </p>
        </div>
      </section>

      {documentos.length > 0 ? (
        <section className="mb-16">
          <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-6">
            <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-slate-900 sm:text-3xl">
              Documentos disponibles
            </h2>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {documentos.length} documento{documentos.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {documentos.map((documento: any, idx: number) => {
              const pdfUrl = documento.archivo_pdf?.url
                ? documento.archivo_pdf.url.startsWith("http")
                  ? documento.archivo_pdf.url
                  : `http://localhost:1337${documento.archivo_pdf.url}`
                : null;

              return (
                <div
                  key={idx}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/40"
                >
                  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-20 w-20 text-red-600 opacity-80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <text x="12" y="16" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">
                          PDF
                        </text>
                      </svg>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">PDF</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      {documento.categoria?.nombre && (
                        <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                          {documento.categoria.nombre}
                        </span>
                      )}

                      <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-950">
                        {documento.titulo || "Documento sin título"}
                      </h3>

                      {documento.descripcion && (
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                          {documento.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                      {pdfUrl ? (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                        >
                          {documento.archivo_pdf?.name || "Ver PDF"}
                        </a>
                      ) : (
                        <span className="flex-1 rounded-full bg-slate-100 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                          PDF no disponible
                        </span>
                      )}

                      <Link
                        href={`/documentos/${documento.slug}`}
                        className="flex-1 rounded-full bg-blue-950 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
          <svg
            className="mx-auto h-16 w-16 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold text-slate-900">
            No hay documentos disponibles.
          </p>
          <p className="mt-2 text-slate-600">
            Vuelve pronto para acceder a documentos, guías y formularios.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900"
          >
            Volver al inicio
          </Link>
        </section>
      )}

      <section className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 px-8 py-12 shadow-xl shadow-slate-200/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿No encontraste lo que buscas?
          </h2>
          <p className="mt-4 text-slate-600">
            Utiliza nuestro buscador integrado o contacta al equipo de atención para jubilados.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/buscar"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-1"
            >
              Buscar documentos
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-950 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-slate-950 hover:text-white"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
