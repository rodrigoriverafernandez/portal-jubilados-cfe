import { notFound } from "next/navigation";

async function getDocumento(slug: string) {
  const STRAPI_URL = process.env.STRAPI_API_URL || "http://strapi:1337";
  
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/documentos?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching documento:", error);
    return null;
  }
}

export default async function DocumentoPage({
  params,
}: {
  params: { slug: string };
}) {
  const documento = await getDocumento(params.slug);

  if (!documento) {
    notFound();
  }

  const pdfUrl = documento.archivo_pdf?.url
    ? `http://localhost:1337${documento.archivo_pdf.url}`
    : null;

  return (
    <main className="min-h-screen bg-slate-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            {documento.categoria?.nombre || "Documento"}
          </span>

          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            {documento.titulo}
          </h1>

          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {documento.descripcion}
          </p>

          {pdfUrl && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-10 shadow-lg shadow-slate-200/40">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                  <svg
                    className="h-20 w-20 text-white opacity-90"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <text x="12" y="17" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">
                      PDF
                    </text>
                  </svg>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Archivo disponible</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {documento.archivo_pdf?.name || "documento.pdf"}
                  </h3>
                  <p className="mt-4 text-base text-slate-600">
                    El documento se abrirá en una nueva pestaña cuando hagas clic en los botones de abajo.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                >
                  Abrir PDF
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-2 border-red-600 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-red-600 transition hover:bg-red-50"
                >
                  Descargar PDF
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}