"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();
  // const pathname = usePathname();

  // In a real i18n setup, this would use a hook to get the actual current locale
  // For this design redesign, we mock the current locale to "no" (Norwegian)
  const currentLocale = "no"; 

  const languages = [
    { code: "no", label: "NO" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  const handleLanguageChange = (code: string) => {
    setIsOpen(false);
    // In a real app with next-intl or similar, you would push to the new locale route:
    // router.push(`/${code}${pathname}`);
    console.log(`Language switched to: ${code}`);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-bold tracking-wider text-brand-coffee hover:text-brand-terracotta transition-colors uppercase focus:outline-none"
          id="language-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {currentLocale}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
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
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-brand-cream border border-brand-coffee/10 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${
                  currentLocale === lang.code
                    ? "bg-brand-linen/50 text-brand-terracotta font-bold"
                    : "text-brand-coffee hover:bg-brand-linen"
                } block w-full text-left px-4 py-2 text-sm uppercase tracking-wider transition-colors`}
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
