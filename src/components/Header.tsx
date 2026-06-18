"use client";

import Image from "next/image";

const DASHBOARD_URL = "https://questionariomedicao.streamlit.app";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">
        <Image
          src="/pucmg.webp"
          alt="Logo PUC Minas"
          width={48}
          height={48}
          className="h-10 w-auto object-contain brightness-0 sm:h-12"
          priority
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold text-slate-800 sm:text-lg">
            Pesquisa - Engenharia de Software
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm truncate">
            Medição e Experimentação em Engenharia de Software · Prof. Danilo Maia
          </p>
        </div>
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:text-sm"
        >
          <span>📊</span>
          <span className="hidden sm:inline">Resultados</span>
        </a>
      </div>
    </header>
  );
}

