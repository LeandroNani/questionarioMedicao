"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CURRICULO_3, CURRICULO_4 } from "@/constants/curriculos";

const TABS = [
  { key: "c3", label: "Currículo 3", data: CURRICULO_3 },
  { key: "c4", label: "Currículo 4", data: CURRICULO_4 },
] as const;

interface CurriculoModalProps {
  open: boolean;
  onClose: () => void;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function PeriodAccordion({
  period,
  subjects,
}: {
  period: string;
  subjects: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-600">
            {period.charAt(0)}
          </span>
          {period}
        </span>
        <ChevronIcon expanded={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="border-t border-slate-100 px-4 py-2">
              {subjects.map((subject) => (
                <li
                  key={subject}
                  className="py-1.5 text-sm text-slate-600 border-b border-slate-50 last:border-b-0"
                >
                  {subject}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CurriculoModal({ open, onClose }: CurriculoModalProps) {
  const [activeTab, setActiveTab] = useState<"c3" | "c4">("c3");

  const currentData = activeTab === "c3" ? CURRICULO_3 : CURRICULO_4;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative z-10 flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Grade Curricular
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Engenharia de Software
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 pb-3">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="curriculo-tab-indicator"
                      className="absolute inset-0 rounded-lg border-2 border-blue-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              <div className="flex flex-col gap-2">
                {Object.entries(currentData).map(([period, subjects]) => (
                  <PeriodAccordion
                    key={`${activeTab}-${period}`}
                    period={period}
                    subjects={subjects}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
