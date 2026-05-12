"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
  className?: string;
}

export default function SearchBox({ className = "" }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/buscar?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="search-input" className="sr-only">
        Buscar
      </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar..."
        className="w-full min-w-[180px] rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-blue-900"
      >
        Buscar
      </button>
    </form>
  );
}
