"use client";

import { SECTION_TITLES } from "@/types/survey";

interface ProgressBarProps {
  currentSection: number;
}

export default function ProgressBar({ currentSection }: ProgressBarProps) {
  const progress = ((currentSection + 1) / SECTION_TITLES.length) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 pb-2 sm:px-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">
          Seção {currentSection + 1} de {SECTION_TITLES.length}
        </span>
        <span className="text-xs font-medium text-slate-500">
          {SECTION_TITLES[currentSection]}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between">
        {SECTION_TITLES.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300
              ${index <= currentSection ? "bg-blue-500" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
