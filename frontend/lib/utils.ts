import { API_URL } from "./strapi";

export function getStrapiMediaURL(path?: string | null) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

export function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
