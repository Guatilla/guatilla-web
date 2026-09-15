import type { Product } from "@/data/products";
import type { Locale } from "./config";

type ProductTranslation = Pick<
  Product,
  | "name"
  | "roast"
  | "process"
  | "notes"
  | "price"
  | "alt"
  | "description"
  | "altitude"
  | "dryingNote"
  | "processDetail"
  | "roastDetail"
> & {
  brewRecommended: string;
};

const PRODUCT_TRANSLATIONS: Record<
  Exclude<Locale, "no">,
  Record<string, ProductTranslation>
> = {
  en: {
    "montana-hele-bonner": {
      name: "Café de Montaña — Whole bean",
      roast: "Roasted to order",
      process: "Washed",
      notes: "Hand-picked and washed in Serranía del Perijá.",
      price: "Price coming soon",
      alt: "Kaffe Guatilla, Café de Montaña, whole bean 250 g — packaging illustration",
      description:
        "Coffee from our family farms in Serranía del Perijá, grown at 900–1,300 metres above sea level. 100% Arabica, Excelso-grade coffee with washed processing and full traceability back to Finca La Guatilla. Find the lot through the lot number on the bag under Traceability. Supplied as whole bean, 250 g.",
      altitude: "900–1,300 m a.s.l.",
      dryingNote:
        "Washed and dried on raised beds at the family's dry mill.",
      processDetail: "Washed",
      roastDetail: "Roasted to order",
      brewRecommended: "Filter, V60",
    },
    "montana-malt": {
      name: "Café de Montaña — Ground coffee",
      roast: "Roasted to order",
      process: "Washed",
      notes: "Hand-picked and washed in Serranía del Perijá.",
      price: "Price coming soon",
      alt: "Kaffe Guatilla, Café de Montaña, ground coffee 250 g — packaging illustration",
      description:
        "Coffee from our family farms in Serranía del Perijá, grown at 900–1,300 metres above sea level. 100% Arabica, Excelso-grade coffee with washed processing and full traceability back to Finca La Guatilla. Find the lot through the lot number on the bag under Traceability. Supplied ground, 250 g.",
      altitude: "900–1,300 m a.s.l.",
      dryingNote:
        "Washed and dried on raised beds at the family's dry mill.",
      processDetail: "Washed",
      roastDetail: "Roasted to order",
      brewRecommended: "Filter",
    },
    "especial-hele-bonner": {
      name: "Café Especial — Whole bean",
      roast: "Roasted to order",
      process: "Washed",
      notes: "Hand-picked on our highest-altitude plots.",
      price: "Price coming soon",
      alt: "Kaffe Guatilla, Café Especial, whole bean 250 g — packaging illustration",
      description:
        "Our most exclusive lot, harvested at up to 1,800 metres above sea level, where the cool climate allows slow ripening. 100% Arabica, Especial-grade coffee rated above 80 points by certified cuppers, with washed processing and full traceability back to Finca La Guatilla. Supplied as whole bean, 250 g.",
      altitude: "Up to 1,800 m a.s.l.",
      dryingNote:
        "Washed and dried on raised beds at the family's dry mill.",
      processDetail: "Washed",
      roastDetail: "Roasted to order",
      brewRecommended: "Filter, V60",
    },
    "especial-malt": {
      name: "Café Especial — Ground coffee",
      roast: "Roasted to order",
      process: "Washed",
      notes: "Hand-picked on our highest-altitude plots.",
      price: "Price coming soon",
      alt: "Kaffe Guatilla, Café Especial, ground coffee 250 g — packaging illustration",
      description:
        "Our most exclusive lot, harvested at up to 1,800 metres above sea level, where the cool climate allows slow ripening. 100% Arabica, Especial-grade coffee rated above 80 points by certified cuppers, with washed processing and full traceability back to Finca La Guatilla. Supplied ground, 250 g.",
      altitude: "Up to 1,800 m a.s.l.",
      dryingNote:
        "Washed and dried on raised beds at the family's dry mill.",
      processDetail: "Washed",
      roastDetail: "Roasted to order",
      brewRecommended: "Filter",
    },
  },
  es: {
    "montana-hele-bonner": {
      name: "Café de Montaña — En grano",
      roast: "Tostado bajo pedido",
      process: "Lavado",
      notes: "Recolectado a mano y lavado en la Serranía del Perijá.",
      price: "Precio próximamente",
      alt: "Kaffe Guatilla, Café de Montaña, en grano 250 g — ilustración del empaque",
      description:
        "Café de nuestras fincas familiares en la Serranía del Perijá, cultivado entre 900 y 1.300 metros. Café 100 % arábica clasificado como Excelso, de proceso lavado y con trazabilidad total hasta Finca La Guatilla. Consulta el lote mediante el número de la bolsa en Trazabilidad. Presentación en grano de 250 g.",
      altitude: "900–1.300 m s. n. m.",
      dryingNote:
        "Lavado y secado en camas elevadas junto a la trilladora familiar.",
      processDetail: "Lavado",
      roastDetail: "Tostado bajo pedido",
      brewRecommended: "Filtro, V60",
    },
    "montana-malt": {
      name: "Café de Montaña — Molido",
      roast: "Tostado bajo pedido",
      process: "Lavado",
      notes: "Recolectado a mano y lavado en la Serranía del Perijá.",
      price: "Precio próximamente",
      alt: "Kaffe Guatilla, Café de Montaña, molido 250 g — ilustración del empaque",
      description:
        "Café de nuestras fincas familiares en la Serranía del Perijá, cultivado entre 900 y 1.300 metros. Café 100 % arábica clasificado como Excelso, de proceso lavado y con trazabilidad total hasta Finca La Guatilla. Consulta el lote mediante el número de la bolsa en Trazabilidad. Presentación molida de 250 g.",
      altitude: "900–1.300 m s. n. m.",
      dryingNote:
        "Lavado y secado en camas elevadas junto a la trilladora familiar.",
      processDetail: "Lavado",
      roastDetail: "Tostado bajo pedido",
      brewRecommended: "Filtro",
    },
    "especial-hele-bonner": {
      name: "Café Especial — En grano",
      roast: "Tostado bajo pedido",
      process: "Lavado",
      notes: "Recolectado a mano en nuestras parcelas de mayor altitud.",
      price: "Precio próximamente",
      alt: "Kaffe Guatilla, Café Especial, en grano 250 g — ilustración del empaque",
      description:
        "Nuestro lote más exclusivo, cosechado hasta los 1.800 metros, donde el clima fresco permite una maduración lenta. Café 100 % arábica clasificado como Especial y valorado por encima de 80 puntos por catadores certificados, de proceso lavado y con trazabilidad total hasta Finca La Guatilla. Presentación en grano de 250 g.",
      altitude: "Hasta 1.800 m s. n. m.",
      dryingNote:
        "Lavado y secado en camas elevadas junto a la trilladora familiar.",
      processDetail: "Lavado",
      roastDetail: "Tostado bajo pedido",
      brewRecommended: "Filtro, V60",
    },
    "especial-malt": {
      name: "Café Especial — Molido",
      roast: "Tostado bajo pedido",
      process: "Lavado",
      notes: "Recolectado a mano en nuestras parcelas de mayor altitud.",
      price: "Precio próximamente",
      alt: "Kaffe Guatilla, Café Especial, molido 250 g — ilustración del empaque",
      description:
        "Nuestro lote más exclusivo, cosechado hasta los 1.800 metros, donde el clima fresco permite una maduración lenta. Café 100 % arábica clasificado como Especial y valorado por encima de 80 puntos por catadores certificados, de proceso lavado y con trazabilidad total hasta Finca La Guatilla. Presentación molida de 250 g.",
      altitude: "Hasta 1.800 m s. n. m.",
      dryingNote:
        "Lavado y secado en camas elevadas junto a la trilladora familiar.",
      processDetail: "Lavado",
      roastDetail: "Tostado bajo pedido",
      brewRecommended: "Filtro",
    },
  },
};

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "no") return product;

  const translation = PRODUCT_TRANSLATIONS[locale][product.id];
  if (!translation) return product;

  return {
    ...product,
    ...translation,
    brew: {
      ...product.brew,
      recommended: translation.brewRecommended,
    },
  };
}

export function localizeProducts(products: Product[], locale: Locale): Product[] {
  return products.map((product) => localizeProduct(product, locale));
}
