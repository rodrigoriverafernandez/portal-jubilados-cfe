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

export default async function EventosPage() {
  const STRAPI_URL = process.env.STRAPI_API_URL || "http://strapi:1337";
  let eventos: any[] = [];

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/eventos?populate=*`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const json = await res.json();
      eventos = Array.isArray(json.data) ? json.data : [];
    }
  } catch (error) {
    console.error("Error fetching eventos:", error);
    // eventos permanece como []
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      {/* Hero Section */}
      <section className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-6 py-16 text-white shadow-2xl shadow-blue-950/30 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200">
            Agenda Institucional
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Eventos y actividades
          </h1>
          <p className="max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Conoce los próximos eventos, seminarios y actividades especialmente
            diseñados para la comunidad de jubilados de CFE.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      {eventos.length > 0 ? (
        <section className="mb-16">
          <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-6">
            <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-slate-900 sm:text-3xl">
              Próximos eventos
            </h2>
            <span className="inline-flex rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white">
              {eventos.length} evento{eventos.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento: any, idx: number) => {
              const imageUrl = getImageUrl(evento.imagen);
              const eventDate = formatDate(evento.fecha);

              return (
                <div
                  key={idx}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/20"
                >
                  {/* Image Container */}
                  {imageUrl ? (
                    <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                      <img
                        src={imageUrl}
                        alt={evento.titulo || "Evento"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      {evento.fecha && (
                        <div className="absolute left-4 top-4 rounded-2xl bg-blue-950 px-4 py-3 shadow-lg">
                          <p className="text-sm font-bold text-white">
                            {new Date(evento.fecha).toLocaleDateString(
                              "es-MX",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100 text-slate-400">
                      <p className="text-sm">Imagen no disponible</p>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      {/* Title */}
                      <h3 className="text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-950">
                        {evento.titulo || "Evento sin título"}
                      </h3>

                      {/* Description */}
                      {evento.descripcion && (
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                          {evento.descripcion}
                        </p>
                      )}
                    </div>

                    {/* Footer with Date and Location */}
                    <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                      {/* Date */}
                      {evento.fecha && (
                        <div className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 text-blue-950"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                              Fecha del evento
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {eventDate}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Location */}
                      {evento.ubicacion && (
                        <div className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 text-blue-950"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                              Ubicación
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {evento.ubicacion}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={evento.slug ? `/eventos/${evento.slug}` : "#"}
                      className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-950/30"
                    >
                      Ver evento
                    </Link>
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
              d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold text-slate-900">
            No hay eventos disponibles.
          </p>
          <p className="mt-2 text-slate-600">
            Vuelve pronto para conocer las próximas actividades de la comunidad
            de jubilados.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-900"
          >
            Volver al inicio
          </Link>
        </section>
      )}

      {/* Footer Info */}
      <section className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 px-8 py-12 shadow-xl shadow-slate-200/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿Necesitas más información?
          </h2>
          <p className="mt-4 text-slate-600">
            Si tienes preguntas sobre algún evento o deseas registrarte, no
            dudes en contactarnos directamente.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1"
            >
              Ir al inicio
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-950 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition-all duration-300 hover:bg-slate-950 hover:text-white"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
