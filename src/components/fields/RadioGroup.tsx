"use client";

import { motion } from "framer-motion";

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  id: string;
  columns?: 1 | 2 | 3;
}

export default function RadioGroup({
  label,
  value,
  onChange,
  options,
  error,
  id,
  columns = 1,
}: RadioGroupProps) {
  const gridClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1";

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className={`grid gap-2 ${gridClass}`}>
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <motion.button
              key={option}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(option)}
              id={`${id}-${option}`}
              className={`relative min-h-[44px] rounded-xl border px-4 py-3 text-left text-sm
                transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200
                    ${isSelected ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </span>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
