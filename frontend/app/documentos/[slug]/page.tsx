import { notFound } from "next/navigation";

async function getDocumento(slug: string) {
  const res = await fetch(
    `http://strapi:1337/api/documentos?filters[slug][$eq]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );

  const json = await res.json();

  return json.data?.[0] || null;
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
            <>
              <a
                href={pdfUrl}
                target="_blank"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
              >
                Descargar PDF
              </a>

              <div className="mt-10">
                <iframe
                  src={pdfUrl}
                  className="w-full h-[900px] rounded-2xl border"
                />
              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
}