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
  image: string;
  description: string;
  smaksprofil: string[];
}

export const products: Product[] = [
  {
    id: "origen",
    slug: "origen",
    name: "Origen",
    origin: "Perijá, Cesar",
    roast: "Medium",
    altitude: "1.600 - 1.800 moh",
    process: "Vasket",
    notes: "Kakao, panela, røde bær",
    weight: "250g / 500g",
    price: "Fra 189 NOK",
    image: "/assets/coffee_bag_1.png",
    description: "Vår signaturkaffe fra Cesar-regionen. En balansert kopp med dype noter av kakao og en naturlig sødme fra panela, avrundet med friske røde bær.",
    smaksprofil: ["Kakao", "Fruktig"],
  },
  {
    id: "mestizaje",
    slug: "mestizaje",
    name: "Mestizaje",
    origin: "Perijá, La Guajira",
    roast: "Medium-mørk",
    altitude: "1.400 - 1.700 moh",
    process: "Natural",
    notes: "Karamell, mandel, sitrus",
    weight: "250g / 500g",
    price: "Fra 195 NOK",
    image: "/assets/coffee_bag_2.png",
    description: "Mestizaje representerer møtet mellom tradisjon og innovasjon. Denne natural-prosesserte kaffen gir en fyldig munnfølelse med tydelige toner av karamell og mandel.",
    smaksprofil: ["Karamell", "Fruktig"],
  },
  {
    id: "encuentro",
    slug: "encuentro",
    name: "Encuentro",
    origin: "Perijá, Cesar",
    roast: "Medium",
    altitude: "1.500 - 1.750 moh",
    process: "Honey",
    notes: "Honning, nøtter, krydder",
    weight: "250g / 500g",
    price: "Fra 199 NOK",
    image: "/assets/coffee_bag_3.png",
    description: "En unik kaffe som fanger essensen av Perijá-fjellene. Honey-prosessen bevarer mer av kaffebærets naturlige sødme, noe som resulterer i en kompleks profil.",
    smaksprofil: ["Honning", "Krydret"],
  },
  {
    id: "territorio",
    slug: "territorio",
    name: "Territorio",
    origin: "Perijá, La Guajira",
    roast: "Mørk",
    altitude: "1.600 - 1.800 moh",
    process: "Vasket",
    notes: "Mørk sjokolade, kirsebær, florale toner",
    weight: "250g / 500g",
    price: "Fra 185 NOK",
    image: "/assets/coffee_bag_4.png",
    description: "Vår dypeste brenning. Territorio er en hyllest til jordsmonnet i La Guajira, med kraftige smaker av mørk sjokolade og en overraskende floral avslutning.",
    smaksprofil: ["Kakao", "Fruktig", "Floral"],
  },
  {
    id: "heritage",
    slug: "heritage",
    name: "Heritage",
    origin: "Perijá, Cesar",
    roast: "Lys",
    altitude: "1.700 - 1.850 moh",
    process: "Natural",
    notes: "Tørket frukt, vanilje, bergamott",
    weight: "250g / 500g",
    price: "Fra 215 NOK",
    image: "/assets/coffee_bag_1.png",
    description: "Vår mest eksklusive og komplekse kaffe. Heritage-partiene velges ut fra de høyestliggende gårdene, hvor det kjølige klimaet gir en langsom modning.",
    smaksprofil: ["Fruktig", "Floral"],
  },
  {
    id: "sierra",
    slug: "sierra",
    name: "Sierra",
    origin: "Perijá, La Guajira",
    roast: "Medium-mørk",
    altitude: "1.550 - 1.800 moh",
    process: "Honey",
    notes: "Ristet karamell, eple, kanel",
    weight: "250g / 500g",
    price: "Fra 192 NOK",
    image: "/assets/coffee_bag_2.png",
    description: "En varm og innbydende kaffe med krydrede undertoner. Sierra er perfekt for kjølige morgener, med noter som minner om nystekt eplekake.",
    smaksprofil: ["Karamell", "Fruktig", "Krydret"],
  },
];
