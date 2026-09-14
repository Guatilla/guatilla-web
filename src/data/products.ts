export interface FlavourSegment {
  label: string;
  /** relativ bredde i prosent — koder intensitet; de fire skal summere til 100 */
  pct: number;
  bg: string;
  tone: "cream" | "ink";
}

export interface BrewGuide {
  dose: string;
  water: string;
  time: string;
  recommended: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  origin: string;
  roast: string;
  altitude: string;
  process: string;
  /** Excelso (900–1 300 moh) eller Especial (opp mot 1 800 moh, ≥80 poeng SCA) */
  grade: "Excelso" | "Especial";
  /** posen slik den faktisk pakkes — ikke en valgfri innstilling */
  grind: "Hele bønner" | "Malt";
  notes: string;
  weight: string;
  /**
   * Butikken er ikke live ennå — ingen priser er fastsatt. `price` er en
   * visningstekst («Pris kommer»), `priceNum` er 0 og brukes ikke til noen
   * reell kalkulasjon (kjøpsflyten er deaktivert, se ShopClient/PDP).
   */
  price: string;
  priceNum: number;
  currency: string;
  image: string;
  alt: string;
  description: string;
  smaksprofil: string[];
  category?: string;
  featured: boolean;
  /** «nybrent · uke NN» — stempel på galleribildet; valgfritt så vi slipper å late som vi har et faktisk parti brent ennå */
  week?: string;
  /** informasjonscelle i galleriet (oliven) */
  dryingNote: string;
  /**
   * «I KOPPEN» smaksspekter — valgfritt. Vi har ingen reell cupping-/
   * sensorikkdata ennå (den kommer med Sporbarhet per faktisk parti), så
   * dette utelates heller enn å dikte opp prosentandeler.
   */
  flavourSpectrum?: FlavourSegment[];
  farm: string;
  variety: string;
  processDetail: string;
  roastDetail: string;
  brew: BrewGuide;
}

export const products: Product[] = [
  {
    id: "montana-hele-bonner",
    slug: "montana-hele-bonner",
    name: "Café de Montaña — Hele bønner",
    origin: "Serranía del Perijá",
    roast: "Brent på bestilling",
    altitude: "900–1 300 moh",
    process: "Vasket",
    grade: "Excelso",
    grind: "Hele bønner",
    notes: "Håndplukket og vasket i Serranía del Perijá.",
    weight: "250 g",
    price: "Pris kommer",
    priceNum: 0,
    currency: "NOK",
    image: "/assets/bag-mestizaje.jpg",
    alt: "Kaffe Guatilla, Café de Montaña, hele bønner 250 g — illustrasjonsbilde av emballasje",
    description:
      "Kaffe fra familiegårdene våre i Serranía del Perijá, dyrket på 900–1 300 moh. Excelso-klassifisert kaffe av 100 % arabica, med vasket foredling og full sporbarhet tilbake til Finca La Guatilla. Finn partiet via partinummeret på posen under Sporbarhet. Leveres som hele bønner, 250 g.",
    smaksprofil: ["Arabica"],
    category: "montana",
    featured: false,
    dryingNote: "Vasket og tørket på hevede tørkesenger ved familiens tørrmølle.",
    farm: "Finca La Guatilla",
    variety: "Arabica",
    processDetail: "Vasket",
    roastDetail: "Brent på bestilling",
    brew: {
      dose: "60 g/l",
      water: "94–96 °C",
      time: "3–4 min",
      recommended: "Filter, V60",
    },
  },
  {
    id: "montana-malt",
    slug: "montana-malt",
    name: "Café de Montaña — Malt kaffe",
    origin: "Serranía del Perijá",
    roast: "Brent på bestilling",
    altitude: "900–1 300 moh",
    process: "Vasket",
    grade: "Excelso",
    grind: "Malt",
    notes: "Håndplukket og vasket i Serranía del Perijá.",
    weight: "250 g",
    price: "Pris kommer",
    priceNum: 0,
    currency: "NOK",
    image: "/assets/bag-mestizaje.jpg",
    alt: "Kaffe Guatilla, Café de Montaña, malt kaffe 250 g — illustrasjonsbilde av emballasje",
    description:
      "Kaffe fra familiegårdene våre i Serranía del Perijá, dyrket på 900–1 300 moh. Excelso-klassifisert kaffe av 100 % arabica, med vasket foredling og full sporbarhet tilbake til Finca La Guatilla. Finn partiet via partinummeret på posen under Sporbarhet. Leveres som malt kaffe, 250 g.",
    smaksprofil: ["Arabica"],
    category: "montana",
    featured: false,
    dryingNote: "Vasket og tørket på hevede tørkesenger ved familiens tørrmølle.",
    farm: "Finca La Guatilla",
    variety: "Arabica",
    processDetail: "Vasket",
    roastDetail: "Brent på bestilling",
    brew: {
      dose: "60 g/l",
      water: "94–96 °C",
      time: "3–4 min",
      recommended: "Filter",
    },
  },
  {
    id: "especial-hele-bonner",
    slug: "especial-hele-bonner",
    name: "Café Especial — Hele bønner",
    origin: "Serranía del Perijá",
    roast: "Brent på bestilling",
    altitude: "1 800 moh",
    process: "Vasket",
    grade: "Especial",
    grind: "Hele bønner",
    notes: "Håndplukket på våre høyestliggende partier.",
    weight: "250 g",
    price: "Pris kommer",
    priceNum: 0,
    currency: "NOK",
    image: "/assets/bag-heritage.jpg",
    alt: "Kaffe Guatilla, Café Especial, hele bønner 250 g — illustrasjonsbilde av emballasje",
    description:
      "Vårt mest eksklusive parti, høstet på opp mot 1 800 moh, der kjølig klima gir langsom modning. Especial-klassifisert kaffe av 100 % arabica, vurdert til over 80 poeng av sertifiserte smakere, med vasket foredling og full sporbarhet tilbake til Finca La Guatilla. Leveres som hele bønner, 250 g.",
    smaksprofil: ["Arabica"],
    category: "especial",
    featured: true,
    dryingNote: "Vasket og tørket på hevede tørkesenger ved familiens tørrmølle.",
    farm: "Finca La Guatilla",
    variety: "Arabica",
    processDetail: "Vasket",
    roastDetail: "Brent på bestilling",
    brew: {
      dose: "60 g/l",
      water: "94–96 °C",
      time: "3–4 min",
      recommended: "Filter, V60",
    },
  },
  {
    id: "especial-malt",
    slug: "especial-malt",
    name: "Café Especial — Malt kaffe",
    origin: "Serranía del Perijá",
    roast: "Brent på bestilling",
    altitude: "1 800 moh",
    process: "Vasket",
    grade: "Especial",
    grind: "Malt",
    notes: "Håndplukket på våre høyestliggende partier.",
    weight: "250 g",
    price: "Pris kommer",
    priceNum: 0,
    currency: "NOK",
    image: "/assets/bag-heritage.jpg",
    alt: "Kaffe Guatilla, Café Especial, malt kaffe 250 g — illustrasjonsbilde av emballasje",
    description:
      "Vårt mest eksklusive parti, høstet på opp mot 1 800 moh, der kjølig klima gir langsom modning. Especial-klassifisert kaffe av 100 % arabica, vurdert til over 80 poeng av sertifiserte smakere, med vasket foredling og full sporbarhet tilbake til Finca La Guatilla. Leveres som malt kaffe, 250 g.",
    smaksprofil: ["Arabica"],
    category: "especial",
    featured: true,
    dryingNote: "Vasket og tørket på hevede tørkesenger ved familiens tørrmølle.",
    farm: "Finca La Guatilla",
    variety: "Arabica",
    processDetail: "Vasket",
    roastDetail: "Brent på bestilling",
    brew: {
      dose: "60 g/l",
      water: "94–96 °C",
      time: "3–4 min",
      recommended: "Filter",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
