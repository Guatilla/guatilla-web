"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LANGUAGE_OPTIONS,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import FlagIcon from "./FlagIcon";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();
  const currentLanguage =
    LANGUAGE_OPTIONS.find((language) => language.code === currentLocale) ??
    LANGUAGE_OPTIONS[0];

  const labels = {
    no: "Velg språk",
    en: "Choose language",
    es: "Elegir idioma",
  } as const;

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false);

    if (locale === currentLocale) return;

    window.location.assign(localizePath(pathname, locale));
  };

  return (
    <div className="relative z-[100] inline-block text-left">
      <button
        type="button"
        aria-label={labels[currentLocale]}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-current transition-colors hover:text-brand-terracotta focus:outline-none disabled:opacity-60"
        id="language-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FlagIcon locale={currentLanguage.code} className="h-3.5 w-[21px] shrink-0 shadow-sm" />
        <span>{currentLanguage.shortLabel}</span>
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
          className="absolute right-0 mt-3 w-40 overflow-hidden rounded-xl border border-brand-coffee/10 bg-brand-cream !text-brand-coffee shadow-xl ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {LANGUAGE_OPTIONS.map((language) => (
              <button
                key={language.code}
                type="button"
                lang={language.htmlLang}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                  currentLocale === language.code
                    ? "bg-brand-linen !text-brand-terracotta"
                    : "!text-brand-coffee hover:bg-brand-linen"
                }`}
                role="menuitem"
                aria-current={
                  currentLocale === language.code ? "true" : undefined
                }
              >
                <FlagIcon locale={language.code} className="h-3.5 w-[21px] shrink-0 shadow-sm" />
                <span>{language.label}</span>
                <span className="ml-auto text-[9px] uppercase tracking-[0.16em] opacity-55">
                  {language.shortLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
