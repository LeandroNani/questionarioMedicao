"use client";

import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

interface AutocompleteChipsProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxItems?: number;
  placeholder?: string;
  error?: string;
  id: string;
}

export default function AutocompleteChips({
  label,
  options,
  selected,
  onChange,
  maxItems = 3,
  placeholder = "Digite para buscar...",
  error,
  id,
}: AutocompleteChipsProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtered = query.trim()
    ? options
        .filter(
          (opt) =>
            normalize(opt).includes(normalize(query)) &&
            !selected.includes(opt),
        )
        .slice(0, 8)
    : [];




  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectItem = (item: string) => {
    if (selected.length < maxItems) {
      onChange([...selected, item]);
      setQuery("");
      setIsOpen(false);
      inputRef.current?.focus();
    }
  };

  const removeItem = (index: number) => {
    onChange(selected.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectItem(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Backspace" && query === "" && selected.length > 0) {
      removeItem(selected.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

      <AnimatePresence mode="popLayout">
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {selected.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-sm text-blue-700"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="max-w-[200px] truncate">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label={`Remover ${item}`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selected.length < maxItems && (
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(-1);
              setIsOpen(true);
            }}
            onFocus={() => query.trim() && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              selected.length > 0
                ? `Selecione a ${selected.length + 1}ª matéria...`
                : placeholder
            }
            className={`h-12 w-full rounded-xl border px-4 text-sm bg-white text-slate-800
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
              ${error ? "border-red-400 ring-2 ring-red-400/20" : "border-slate-200 hover:border-slate-300"}`}
            autoComplete="off"
          />

          <AnimatePresence>
            {isOpen && filtered.length > 0 && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
              >
                {filtered.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectItem(item)}
                    className={`w-full min-h-[44px] px-4 py-3 text-left text-sm transition-colors cursor-pointer
                      ${
                        index === highlightIndex
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {isOpen && query.trim() && filtered.length === 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-400 shadow-lg">
              Nenhuma matéria encontrada
            </div>
          )}
        </div>
      )}

      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
