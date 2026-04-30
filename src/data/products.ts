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
}

export const products: Product[] = [
  {
    id: "origen",
    slug: "origen",
    name: "Origen",
    origin: "Serranía del Perijá",
    roast: "Medium",
    altitude: "1.600 - 1.800 moh",
    process: "Vasket",
    notes: "Kakao, panela, røde bær",
    weight: "250g / 500g",
    price: "Fra 189 NOK",
    priceNum: 189,
    currency: "NOK",
    image: "/assets/coffee_bag_1.png",
    alt: "Origen - Serranía del Perijá",
    description: "Vår signaturkaffe fra Cesar-regionen. En balansert kopp med dype noter av kakao og en naturlig sødme fra panela, avrundet med friske røde bær.",
    smaksprofil: ["Kakao", "Fruktig"],
    category: "classico",
    featured: true,
  },
  {
    id: "mestizaje",
    slug: "mestizaje",
    name: "Mestizaje",
    origin: "Serranía del Perijá",
    roast: "Medium-mørk",
    altitude: "1.400 - 1.700 moh",
    process: "Natural",
    notes: "Karamell, mandel, sitrus",
    weight: "250g / 500g",
    price: "Fra 195 NOK",
    priceNum: 195,
    currency: "NOK",
    image: "/assets/coffee_bag_2.png",
    alt: "Mestizaje - Serranía del Perijá",
    description: "Mestizaje representerer møtet mellom tradisjon og innovasjon. Denne natural-prosesserte kaffen gir en fyldig munnfølelse med tydelige toner av karamell og mandel.",
    smaksprofil: ["Karamell", "Fruktig"],
    category: "classico",
    featured: false,
  },
  {
    id: "encuentro",
    slug: "encuentro",
    name: "Encuentro",
    origin: "Serranía del Perijá",
    roast: "Medium",
    altitude: "1.500 - 1.750 moh",
    process: "Honey",
    notes: "Honning, nøtter, krydder",
    weight: "250g / 500g",
    price: "Fra 199 NOK",
    priceNum: 199,
    currency: "NOK",
    image: "/assets/coffee_bag_3.png",
    alt: "Encuentro - Serranía del Perijá",
    description: "En unik kaffe som fanger essensen av Perijá-fjellene. Honey-prosessen bevarer mer av kaffebærets naturlige sødme, noe som resulterer i en kompleks profil.",
    smaksprofil: ["Honning", "Krydret"],
    category: "classico",
    featured: false,
  },
  {
    id: "territorio",
    slug: "territorio",
    name: "Territorio",
    origin: "Serranía del Perijá",
    roast: "Mørk",
    altitude: "1.600 - 1.800 moh",
    process: "Vasket",
    notes: "Mørk sjokolade, kirsebær, florale toner",
    weight: "250g / 500g",
    price: "Fra 185 NOK",
    priceNum: 185,
    currency: "NOK",
    image: "/assets/coffee_bag_4.png",
    alt: "Territorio - Serranía del Perijá",
    description: "Vår dypeste brenning. Territorio er en hyllest til jordsmonnet i La Guajira, med kraftige smaker av mørk sjokolade og en overraskende floral avslutning.",
    smaksprofil: ["Kakao", "Fruktig", "Floral"],
    category: "classico",
    featured: false,
  },
  {
    id: "heritage",
    slug: "heritage",
    name: "Heritage",
    origin: "Serranía del Perijá",
    roast: "Lys",
    altitude: "1.700 - 1.850 moh",
    process: "Natural",
    notes: "Tørket frukt, vanilje, bergamott",
    weight: "250g / 500g",
    price: "Fra 215 NOK",
    priceNum: 215,
    currency: "NOK",
    image: "/assets/coffee_bag_1.png",
    alt: "Heritage - Serranía del Perijá",
    description: "Vår mest eksklusive og komplekse kaffe. Heritage-partiene velges ut fra de høyestliggende gårdene, hvor det kjølige klimaet gir en langsom modning.",
    smaksprofil: ["Fruktig", "Floral"],
    category: "premium",
    featured: true,
  },
  {
    id: "sierra",
    slug: "sierra",
    name: "Sierra",
    origin: "Serranía del Perijá",
    roast: "Medium-mørk",
    altitude: "1.550 - 1.800 moh",
    process: "Honey",
    notes: "Ristet karamell, eple, kanel",
    weight: "250g / 500g",
    price: "Fra 192 NOK",
    priceNum: 192,
    currency: "NOK",
    image: "/assets/coffee_bag_2.png",
    alt: "Sierra - Serranía del Perijá",
    description: "En varm og innbydende kaffe med krydrede undertoner. Sierra er perfekt for kjølige morgener, med noter som minner om nystekt eplekake.",
    smaksprofil: ["Karamell", "Fruktig", "Krydret"],
    category: "classico",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}
