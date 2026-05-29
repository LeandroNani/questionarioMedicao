"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">
        <Image
          src="/pucmg.webp"
          alt="Logo PUC Minas"
          width={48}
          height={48}
          className="h-10 w-auto object-contain sm:h-12"
          priority
        />
        <div className="min-w-0">
          <h1 className="text-base font-semibold text-slate-800 sm:text-lg">
            Pesquisa - Engenharia de Software
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm truncate">
            Medição e Experimentação em Engenharia de Software · Prof. Danilo Maia
          </p>
        </div>
      </div>
    </header>
  );
}
