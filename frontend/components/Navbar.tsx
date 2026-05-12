'use client';

import Link from "next/link";
import { useState } from "react";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const toggleAccessibility = () => {
    setAccessibilityMode(!accessibilityMode);
    // Aquí puedes agregar lógica para cambiar el tamaño de fuente, etc.
    document.documentElement.classList.toggle('accessibility-mode');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight">
              Portal Jubilados CFE
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Inicio
            </Link>
            <Link href="/noticias" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Noticias
            </Link>
            <Link href="/eventos" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Eventos
            </Link>
            <Link href="/beneficios" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Beneficios
            </Link>
            <Link href="/documentos" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Documentos
            </Link>
            <Link href="/contacto" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium transition">
              Contacto
            </Link>
          </div>

          {/* Search and Accessibility */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchBox />
            </div>

            {/* Accessibility Button */}
            <button
              onClick={toggleAccessibility}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition"
              aria-label="Modo accesibilidad"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Inicio
              </Link>
              <Link href="/noticias" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Noticias
              </Link>
              <Link href="/eventos" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Eventos
              </Link>
              <Link href="/beneficios" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Beneficios
              </Link>
              <Link href="/documentos" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Documentos
              </Link>
              <Link href="/contacto" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                Contacto
              </Link>
              <div className="px-3 py-2">
                <SearchBox />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}