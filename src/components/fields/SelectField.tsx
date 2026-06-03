"use client";

interface SelectFieldProps {
  label: string;
  value: string | number | null;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  error?: string;
  id: string;
  required?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  error,
  id,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`h-12 rounded-xl border px-4 text-sm bg-white text-slate-800
          transition-all duration-200 appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
          ${error ? "border-red-400 ring-2 ring-red-400/20" : "border-slate-200 hover:border-slate-300"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
