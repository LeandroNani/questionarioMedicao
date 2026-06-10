"use client";

import { motion } from "framer-motion";
import { TOTAL_SECTIONS } from "@/types/survey";

interface NavigationButtonsProps {
  currentSection: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canAdvance: boolean;
}

export default function NavigationButtons({
  currentSection,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  canAdvance,
}: NavigationButtonsProps) {
  const isFirst = currentSection === 0;
  const isLast = currentSection === TOTAL_SECTIONS - 1;

  return (
    <div className="flex items-center justify-between gap-4 pt-6">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onPrevious}
        disabled={isFirst}
        className={`flex h-12 items-center gap-2 rounded-xl border px-6 text-sm font-medium
          transition-all duration-200 cursor-pointer
          ${
            isFirst
              ? "invisible"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
          }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Anterior
      </motion.button>

      {isLast ? (
        <motion.button
          type="button"
          whileTap={canAdvance && !isSubmitting ? { scale: 0.97 } : {}}
          onClick={onSubmit}
          disabled={isSubmitting || !canAdvance}
          className={`flex h-12 items-center gap-2 rounded-xl px-8 text-sm font-medium
            transition-all duration-200
            ${
              isSubmitting
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white opacity-60 cursor-not-allowed"
                : canAdvance
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25 cursor-pointer hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Enviar respostas
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </motion.button>
      ) : (
        <motion.button
          type="button"
          whileTap={canAdvance ? { scale: 0.97 } : {}}
          onClick={onNext}
          disabled={!canAdvance}
          className={`flex h-12 items-center gap-2 rounded-xl px-8 text-sm font-medium
            transition-all duration-200
            ${
              canAdvance
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25 cursor-pointer hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          Próximo
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
