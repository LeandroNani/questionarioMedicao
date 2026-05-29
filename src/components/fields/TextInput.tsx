"use client";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  id: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  id,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-12 rounded-xl border px-4 text-sm bg-white text-slate-800
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
          ${error ? "border-red-400 ring-2 ring-red-400/20" : "border-slate-200 hover:border-slate-300"}`}
      />
      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
