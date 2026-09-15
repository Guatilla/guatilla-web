import type { Locale } from "@/i18n/config";

const LOCALE_TAGS: Record<Locale, string> = {
  no: "nb-NO",
  en: "en-GB",
  es: "es-ES",
};

export function formatNok(priceOre: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceOre / 100);
}
