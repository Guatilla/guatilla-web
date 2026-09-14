export const LOCALES = ["no", "en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "no";
export const LOCALE_HEADER = "x-guatilla-locale";
export const LOCALE_COOKIE = "guatilla-locale";

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  code: Locale;
  flag: string;
  label: string;
  shortLabel: string;
  htmlLang: string;
}> = [
  {
    code: "no",
    flag: "🇳🇴",
    label: "Norsk",
    shortLabel: "NO",
    htmlLang: "nb",
  },
  {
    code: "en",
    flag: "🇬🇧",
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
  },
  {
    code: "es",
    flag: "🇪🇸",
    label: "Español",
    shortLabel: "ES",
    htmlLang: "es",
  },
];

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);

  if (locale === DEFAULT_LOCALE) return pathname || "/";

  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  if (
    !pathname.startsWith("/") ||
    pathname.startsWith("//") ||
    pathname.startsWith("/api/")
  ) {
    return pathname;
  }

  const hashIndex = pathname.indexOf("#");
  const queryIndex = pathname.indexOf("?");
  const suffixIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  const pathOnly =
    suffixIndex === undefined ? pathname : pathname.slice(0, suffixIndex);
  const suffix = suffixIndex === undefined ? "" : pathname.slice(suffixIndex);
  const normalizedPath = stripLocaleFromPathname(pathOnly);

  if (locale === DEFAULT_LOCALE) return `${normalizedPath}${suffix}`;

  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}${suffix}`;
}

export function getLanguageOption(locale: Locale) {
  return (
    LANGUAGE_OPTIONS.find((language) => language.code === locale) ??
    LANGUAGE_OPTIONS[0]
  );
}
