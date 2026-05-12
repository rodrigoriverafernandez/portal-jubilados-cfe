import Link from "next/link";

async function getEvento(slug: string) {
  const STRAPI_URL = process.env.STRAPI_API_URL || "http://strapi:1337";
  
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/eventos?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "no-store",
      }
    );

    const json = await res.json();

    return json.data?.[0] || null;
  } catch (error) {
    console.error("Error cargando evento:", error);
    return null;
  }
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const evento = await getEvento(slug);

  if (!evento) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Evento no encontrado
        </h1>

        <Link
          href="/eventos"
          className="text-blue-600 underline"
        >
          Volver a eventos
        </Link>
      </div>
    );
  }

  const imagen =
    evento.imagen?.url
      ? `http://localhost:1337${evento.imagen.url}`
      : null;

  return (
    <main className="min-h-screen bg-[#f5f7fb] py-14 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {imagen && (
          <img
            src={imagen}
            alt={evento.titulo}
            className="w-full h-[450px] object-cover"
          />
        )}

        <div className="p-10">

          <div className="mb-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              EVENTO OFICIAL
            </span>
          </div>

          <h1 className="text-5xl font-black text-[#0b1533] mb-6">
            {evento.titulo}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-sm text-slate-500 mb-1">
                Fecha
              </p>

              <p className="text-xl font-bold text-slate-800">
                {evento.fecha}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-sm text-slate-500 mb-1">
                Ubicación
              </p>

              <p className="text-xl font-bold text-slate-800">
                {evento.ubicacion || "Por confirmar"}
              </p>
            </div>

          </div>

          <div className="prose prose-lg max-w-none text-slate-700">
            <p>
              {evento.descripcion}
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/eventos"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
            >
              ← Volver a eventos
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}