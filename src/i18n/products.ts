import type {
  StorefrontCatalogProduct,
  StorefrontCartLine,
} from "@/types/catalog";
import type { Locale } from "./config";

type ProductTranslation = {
  name?: string;
  description?: string;
};

// Only editorial fields are translated here. Prices, weights, SKUs and stock
// always come directly from Cloud SQL.
const PRODUCT_TRANSLATIONS: Partial<
  Record<Exclude<Locale, "no">, Record<string, ProductTranslation>>
> = {
  en: {
    "guatilla-excelso-f6-monserrate": {
      name: "Guatilla Excelso F6 — Finca Monserrate",
      description:
        "Washed Excelso coffee, F6 variety (100% arabica), from Finca Monserrate in the El Guamar Alto rural settlement, Agustín Codazzi, Colombia, grown at 1,600 metres above sea level. Directly exported by owner Jenifer Pérez Salen through Cafenlace.",
    },
    "montana-hele-bonner": { name: "Café de Montaña — Whole bean" },
    "montana-malt": { name: "Café de Montaña — Ground coffee" },
    "especial-hele-bonner": { name: "Café Especial — Whole bean" },
    "especial-malt": { name: "Café Especial — Ground coffee" },
  },
  es: {
    "guatilla-excelso-f6-monserrate": {
      name: "Café Guatilla Excelso F6 — Finca Monserrate",
      description:
        "Café Excelso lavado, variedad F6 (100 % arábica), de la Finca Monserrate en la vereda El Guamar Alto, Agustín Codazzi, Colombia, cultivado a 1.600 metros sobre el nivel del mar. Exportado directamente por su propietaria, Jenifer Pérez Salen, a través de Cafenlace.",
    },
    "montana-hele-bonner": { name: "Café de Montaña — En grano" },
    "montana-malt": { name: "Café de Montaña — Molido" },
    "especial-hele-bonner": { name: "Café Especial — En grano" },
    "especial-malt": { name: "Café Especial — Molido" },
  },
};

function translationFor(slug: string, locale: Locale): ProductTranslation | undefined {
  if (locale === "no") return undefined;
  return PRODUCT_TRANSLATIONS[locale]?.[slug];
}

export function localizeCatalogProduct(
  product: StorefrontCatalogProduct,
  locale: Locale,
): StorefrontCatalogProduct {
  const translation = translationFor(product.slug, locale);
  return translation ? { ...product, ...translation } : product;
}

export function localizeCatalogProducts(
  products: StorefrontCatalogProduct[],
  locale: Locale,
): StorefrontCatalogProduct[] {
  return products.map((product) => localizeCatalogProduct(product, locale));
}

export function localizeCatalogCartLine(
  line: StorefrontCartLine,
  locale: Locale,
): StorefrontCartLine {
  const translation = translationFor(line.productSlug, locale);
  return translation?.name ? { ...line, productName: translation.name } : line;
}

export function localizeGrind(grind: string | null, locale: Locale): string | null {
  if (!grind) return null;
  const normalized = grind.trim().toLowerCase();
  const wholeBean = ["whole bean", "hele bønner", "en grano"].includes(normalized);
  const ground = ["ground", "ground coffee", "malt", "molido"].includes(normalized);

  if (wholeBean) return { no: "Hele bønner", en: "Whole bean", es: "En grano" }[locale];
  if (ground) return { no: "Malt", en: "Ground coffee", es: "Molido" }[locale];
  return grind;
}

export function localizeVariantName(
  variant: {
    name?: string;
    variantName?: string;
    grind: string | null;
    weightGrams: number | null;
  },
  locale: Locale,
): string {
  const parts = [
    localizeGrind(variant.grind, locale),
    variant.weightGrams ? `${variant.weightGrams} g` : null,
  ].filter((part): part is string => Boolean(part));

  return parts.length > 0
    ? parts.join(" · ")
    : (variant.name ?? variant.variantName ?? "");
}
