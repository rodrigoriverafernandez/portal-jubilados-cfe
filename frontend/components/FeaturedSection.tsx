import { getArticulosDestacados } from "../lib/strapi";
import NewsCard from "./NewsCard";

export default async function FeaturedSection() {
  const destacados = await getArticulosDestacados();
  const featuredArticles = destacados.slice(1, 7); // Excluir el primero que está en Hero

  if (featuredArticles.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Noticias destacadas
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mantente informado con las últimas noticias y actualizaciones relevantes para la comunidad de jubilados de CFE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/noticias"
            className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition duration-300"
          >
            Ver todas las noticias
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}