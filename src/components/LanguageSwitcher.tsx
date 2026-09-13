"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = "no";

  const languages = [
    { code: "no", label: "NO" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  const handleLanguageChange = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative z-[100] inline-block text-left">
      <button
        type="button"
        aria-label="Velg språk"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center px-2 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-current transition-colors hover:text-brand-terracotta focus:outline-none"
        id="language-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentLocale}
        <svg
          className="ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-24 overflow-hidden rounded-xl border border-brand-coffee/10 bg-brand-cream !text-brand-coffee shadow-xl ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={handleLanguageChange}
                className={`block w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                  currentLocale === lang.code
                    ? "bg-brand-linen !text-brand-terracotta"
                    : "!text-brand-coffee hover:bg-brand-linen"
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
