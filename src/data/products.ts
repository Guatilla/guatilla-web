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
  notes: string;
  weight: string;
  price: string;
  priceNum: number;
  currency: string;
  image: string;
  alt: string;
  description: string;
  smaksprofil: string[];
  category?: string;
  featured: boolean;
  /** «nyristet · uke NN» — stempel på galleribildet */
  week: string;
  /** informasjonscelle i galleriet (oliven) */
  dryingNote: string;
  /** «I KOPPEN» smaksspekter — fire segmenter med ulik bredde */
  flavourSpectrum: FlavourSegment[];
  farm: string;
  variety: string;
  processDetail: string;
  roastDetail: string;
  brew: BrewGuide;
}

export const products: Product[] = [
  {
    id: "origen",
    slug: "origen",
    name: "Origen",
    origin: "Serranía del Perijá",
    roast: "Medium",
    altitude: "1 600–1 800 moh",
    process: "Vasket",
    notes: "Kakao, panela, røde bær",
    weight: "250 g / 500 g",
    price: "Fra 189 NOK",
    priceNum: 189,
    currency: "NOK",
    image: "/assets/bag-origen.jpg",
    alt: "Origen 250 g pose",
    description:
      "Vår signaturkaffe fra Cesar-regionen: balansert og rund, med dype toner av kakao, en naturlig sødme fra panela og et strøk av friske røde bær.",
    smaksprofil: ["Kakao", "Fruktig"],
    category: "classico",
    featured: true,
    week: "uke 36",
    dryingNote: "Vasket og tørket på hevede senger i 12 dager.",
    flavourSpectrum: [
      { label: "Kakao", pct: 40, bg: "#8E3A2B", tone: "cream" },
      { label: "Panela", pct: 28, bg: "#DDA83A", tone: "ink" },
      { label: "Røde bær", pct: 14, bg: "#B22F35", tone: "cream" },
      { label: "Balansert", pct: 18, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Castillo & Colombia",
    processDetail: "Vasket, 12 døgn",
    roastDetail: "Middels · filter",
    brew: {
      dose: "30 g / 500 ml",
      water: "96 °C",
      time: "3 min 15 s",
      recommended: "Filter, V60",
    },
  },
  {
    id: "mestizaje",
    slug: "mestizaje",
    name: "Mestizaje",
    origin: "Serranía del Perijá",
    roast: "Medium-mørk",
    altitude: "1 400–1 700 moh",
    process: "Natural",
    notes: "Karamell, mandel, plomme",
    weight: "250 g / 500 g",
    price: "Fra 195 NOK",
    priceNum: 195,
    currency: "NOK",
    image: "/assets/bag-mestizaje.jpg",
    alt: "Mestizaje 250 g pose",
    description:
      "Møtet mellom tradisjon og innovasjon: natural-prosessert, fyldig i munnen, med tydelige toner av karamell og mandel.",
    smaksprofil: ["Karamell", "Fruktig"],
    category: "classico",
    featured: false,
    week: "uke 36",
    dryingNote: "Tørket på hevede senger i 18 dager.",
    flavourSpectrum: [
      { label: "Karamell", pct: 38, bg: "#8E3A2B", tone: "cream" },
      { label: "Mandel", pct: 26, bg: "#DDA83A", tone: "ink" },
      { label: "Plomme", pct: 16, bg: "#B22F35", tone: "cream" },
      { label: "Fyldig", pct: 20, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Castillo & Caturra",
    processDetail: "Natural, 18 døgn",
    roastDetail: "Middels · filter",
    brew: {
      dose: "30 g / 500 ml",
      water: "96 °C",
      time: "3 min 15 s",
      recommended: "Filter, V60",
    },
  },
  {
    id: "encuentro",
    slug: "encuentro",
    name: "Encuentro",
    origin: "Serranía del Perijá",
    roast: "Medium",
    altitude: "1 500–1 750 moh",
    process: "Honey",
    notes: "Honning, nøtter, krydder",
    weight: "250 g / 500 g",
    price: "Fra 199 NOK",
    priceNum: 199,
    currency: "NOK",
    image: "/assets/bag-encuentro.jpg",
    alt: "Encuentro 250 g pose",
    description:
      "Honey-prosessen bevarer mer av kaffebærets naturlige sødme — en kompleks kopp med honning, ristede nøtter og et snev av krydder.",
    smaksprofil: ["Honning", "Krydret"],
    category: "classico",
    featured: false,
    week: "uke 36",
    dryingNote: "Honey — tørket på hevede senger i 15 dager.",
    flavourSpectrum: [
      { label: "Honning", pct: 36, bg: "#8E3A2B", tone: "cream" },
      { label: "Nøtter", pct: 30, bg: "#DDA83A", tone: "ink" },
      { label: "Krydder", pct: 14, bg: "#B22F35", tone: "cream" },
      { label: "Fyldig", pct: 20, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Castillo & Caturra",
    processDetail: "Honey, 15 døgn",
    roastDetail: "Middels · filter",
    brew: {
      dose: "30 g / 500 ml",
      water: "95 °C",
      time: "3 min 00 s",
      recommended: "Filter, V60",
    },
  },
  {
    id: "territorio",
    slug: "territorio",
    name: "Territorio",
    origin: "Serranía del Perijá",
    roast: "Mørk",
    altitude: "1 600–1 800 moh",
    process: "Vasket",
    notes: "Mørk sjokolade, kirsebær, florale toner",
    weight: "250 g / 500 g",
    price: "Fra 185 NOK",
    priceNum: 185,
    currency: "NOK",
    image: "/assets/bag-territorio.jpg",
    alt: "Territorio 250 g pose",
    description:
      "Vår dypeste brenning: kraftige smaker av mørk sjokolade og kirsebær, med en overraskende floral avslutning.",
    smaksprofil: ["Kakao", "Fruktig", "Floral"],
    category: "classico",
    featured: false,
    week: "uke 36",
    dryingNote: "Vasket og tørket på hevede senger i 10 dager.",
    flavourSpectrum: [
      { label: "Sjokolade", pct: 42, bg: "#8E3A2B", tone: "cream" },
      { label: "Kirsebær", pct: 22, bg: "#DDA83A", tone: "ink" },
      { label: "Floral", pct: 14, bg: "#B22F35", tone: "cream" },
      { label: "Kraftig", pct: 22, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Castillo & Colombia",
    processDetail: "Vasket, 10 døgn",
    roastDetail: "Mørk · espresso",
    brew: {
      dose: "18 g → 36 g",
      water: "93 °C",
      time: "28 s",
      recommended: "Espresso",
    },
  },
  {
    id: "heritage",
    slug: "heritage",
    name: "Heritage",
    origin: "Serranía del Perijá",
    roast: "Lys",
    altitude: "1 700–1 850 moh",
    process: "Natural",
    notes: "Tørket frukt, vanilje, bergamott",
    weight: "250 g / 500 g",
    price: "Fra 215 NOK",
    priceNum: 215,
    currency: "NOK",
    image: "/assets/bag-heritage.jpg",
    alt: "Heritage 250 g pose",
    description:
      "Vår mest eksklusive kaffe, plukket fra de høyestliggende gårdene der kjølig klima gir langsom modning: tørket frukt, vanilje og bergamott.",
    smaksprofil: ["Fruktig", "Floral"],
    category: "premium",
    featured: true,
    week: "uke 36",
    dryingNote: "Natural — tørket på hevede senger i 21 dager.",
    flavourSpectrum: [
      { label: "Tørket frukt", pct: 38, bg: "#8E3A2B", tone: "cream" },
      { label: "Vanilje", pct: 26, bg: "#DDA83A", tone: "ink" },
      { label: "Bergamott", pct: 16, bg: "#B22F35", tone: "cream" },
      { label: "Delikat", pct: 20, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Gesha & Pink Bourbon",
    processDetail: "Natural, 21 døgn",
    roastDetail: "Lys · filter",
    brew: {
      dose: "30 g / 500 ml",
      water: "97 °C",
      time: "3 min 30 s",
      recommended: "Filter, V60",
    },
  },
  {
    id: "sierra",
    slug: "sierra",
    name: "Sierra",
    origin: "Serranía del Perijá",
    roast: "Medium-mørk",
    altitude: "1 550–1 800 moh",
    process: "Honey",
    notes: "Ristet karamell, eple, kanel",
    weight: "250 g / 500 g",
    price: "Fra 192 NOK",
    priceNum: 192,
    currency: "NOK",
    image: "/assets/bag-sierra.jpg",
    alt: "Sierra 250 g pose",
    description:
      "En varm og innbydende kaffe med krydrede undertoner — noter som minner om nystekt eplekake, perfekt for kjølige morgener.",
    smaksprofil: ["Karamell", "Fruktig", "Krydret"],
    category: "classico",
    featured: false,
    week: "uke 36",
    dryingNote: "Honey — tørket på hevede senger i 16 dager.",
    flavourSpectrum: [
      { label: "Karamell", pct: 40, bg: "#8E3A2B", tone: "cream" },
      { label: "Eple", pct: 24, bg: "#DDA83A", tone: "ink" },
      { label: "Kanel", pct: 16, bg: "#B22F35", tone: "cream" },
      { label: "Rund", pct: 20, bg: "#5C7148", tone: "cream" },
    ],
    farm: "Finca La Guatilla",
    variety: "Castillo & Caturra",
    processDetail: "Honey, 16 døgn",
    roastDetail: "Middels · filter",
    brew: {
      dose: "30 g / 500 ml",
      water: "96 °C",
      time: "3 min 10 s",
      recommended: "Filter, V60",
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
