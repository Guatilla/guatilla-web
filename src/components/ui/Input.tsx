import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  required?: boolean;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  required = false,
  error,
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-widest text-brand-coffee"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 bg-brand-cream border rounded-full text-brand-coffee placeholder:text-brand-coffee/40 focus:outline-none transition-colors duration-300 font-sans ${
          error
            ? "border-brand-vichy/50 focus:border-brand-vichy focus:ring-1 focus:ring-brand-vichy/20"
            : "border-brand-coffee/10 focus:border-brand-terracotta/50 focus:ring-1 focus:ring-brand-terracotta/20"
        }`}
      />
      {error && (
        <p className="text-xs font-medium text-brand-vichy pl-4">{error}</p>
      )}
    </div>
  );
}
