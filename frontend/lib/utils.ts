export function getStrapiMediaURL(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const publicUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${publicUrl}${path}`;
}

export function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
