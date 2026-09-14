import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { getRequestLocale } from "@/i18n/server";

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const PHOTO_CELL = "#F7ECDE";
const HAIRLINE = "#E2D2BF";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const DARK_BROWN = "#3B2A20";
const TERRA = "#A94B2F";
const DEEP_TERRA = "#8E3A2B";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const RED = "#B22F35";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const onColor = (bg: string) => (bg === MUSTARD ? INK : ON_DARK);

type Seg = { label: string; pct: number; bg: string };

const PRODUCTS: {
  name: string;
  tag: string;
  tagBg: string;
  variant: string;
  image: string;
  imagePosition?: string;
  alt: string;
  spectrum: Seg[];
  profile: string;
  format: string;
  anbefalt: string;
  cta: string;
  href: string;
}[] = [
  {
    name: "Guatilla Signature",
    tag: "Fast sortiment",
    tagBg: TERRA,
    variant: "Vasket Excelso",
    image: "/assets/bag-origen.jpg",
    alt: "Guatilla Signature — vasket Excelso",
    spectrum: [
      { label: "Sjokolade", pct: 42, bg: DEEP_TERRA },
      { label: "Panela", pct: 33, bg: MUSTARD },
      { label: "Sitrus", pct: 25, bg: OLIVE },
    ],
    profile:
      "Smaksnoter av sjokolade og panela, rund munnfølelse og en mild, balansert sitrussyrlighet. Hverdagskaffen vår.",
    format: "250 g / 500 g",
    anbefalt: "Filter og espresso",
    cta: "Se Guatilla Signature",
    href: "/shop",
  },
  {
    name: "Serranía Microlot",
    tag: "Begrenset utgave",
    tagBg: OLIVE,
    variant: "Rosa Bourbon",
    image: "/assets/bag-heritage.jpg",
    alt: "Serranía Microlot — Rosa Bourbon",
    spectrum: [
      { label: "Jasmin", pct: 40, bg: OLIVE },
      { label: "Røde bær", pct: 34, bg: RED },
      { label: "Silkeaktig", pct: 26, bg: MUSTARD },
    ],
    profile:
      "Intenst floralt — jasmin, modne røde bær og silkeaktig tekstur. Utviklet for håndbrygg.",
    format: "Nummererte partier",
    anbefalt: "V60, Chemex, Aeropress",
    cta: "Se Serranía Microlot",
    href: "/shop",
  },
  {
    name: "Råkaffe til brennerier",
    tag: "B2B",
    tagBg: TEAL,
    variant: "Råkaffe",
    image: "/assets/raw-coffee-export.jpg",
    imagePosition: "center 25%",
    alt: "Råkaffe pakket for eksport i vakuumsekker merket café verde",
    spectrum: [
      { label: "Siktestørrelse 16", pct: 38, bg: TEAL },
      { label: "11,5–12,5 %", pct: 36, bg: DARK_BROWN },
      { label: "FNC", pct: 26, bg: MUSTARD },
    ],
    profile:
      "Utvalgt ved opprinnelsen, med kontrollert fuktighet og komplett datablad — for norske mikrobrennerier.",
    format: "10 kg eske / 50 kg sekk",
    anbefalt: "Tilpasset brenneprofil",
    cta: "Be om smaksprøve og datablad",
    href: "/contact",
  },
];

const TRACE = [
  {
    n: "01",
    bg: TERRA,
    title: "Direkte handel",
    body: "Familien som dyrker i Colombia er den samme som importerer og distribuerer i Rogaland.",
  },
  {
    n: "02",
    bg: MUSTARD,
    title: "Registrert matimportør",
    body: "Registrert hos Mattilsynet som importør og første mottaker av næringsmidler.",
  },
  {
    n: "03",
    bg: TEAL,
    title: "GS1-sporbarhet",
    body: "Partikoding og sporing etter internasjonal GS1-standard, hele veien.",
  },
];

const KAFFE_COPY = {
  no: {
    metaTitle: "Vår kaffe | Kaffe Guatilla",
    metaDescription:
      "Spesialkaffe av 100 % arabica fra Agustín Codazzi i Colombia — dyrket i Serranía del Perijá, foredlet i familiens tørrmølle og brent i mikropartier i Stavanger.",
    altitude: "900–1 800 moh",
    heroEyebrow: "Vår kaffe · Codazzi → Stavanger",
    heroBefore: "Dyrket i Serranía del Perijá. Foredlet for",
    heroEmphasis: "nordiske",
    heroAfter: "ganer.",
    heroLead:
      "Spesialkaffe av 100 % arabica fra Agustín Codazzi i Colombia. Vi følger hvert steg — fra jord og skyggetre til brenningen i Stavanger.",
    portfolioCta: "Se sortimentet",
    originCta: "Opprinnelsen",
    terroirEyebrow: "Terroiret · Colombia",
    terroirTitle: "Langsom modning, håndplukket kirsebær",
    terroirBody: [
      "Partiene våre vokser i Agustín Codazzi i Cesar, fra 900–1 300 moh til vår mest eksklusive kaffe fra opp mot 1 800 moh. Kjølig mikroklima gir langsom modning — mer sukker, klarere syre og et bredere aromaspekter i koppen.",
      "Vi kjøper ikke anonyme kaffepartier gjennom mellomledd. Familiegårdene våre plukker selektivt for hånd — kun modne kaffebær — og vi foredler dem i familiens lokale tørrmølle.",
    ],
    stats: [
      { b: "900–1 800", s: "moh" },
      { b: "Siktestørrelse 16", s: "FNC-sortering" },
      { b: "11,5–12,5 %", s: "Fuktighet" },
    ],
    cherryAlt: "Modne kaffekirsebær, håndplukket på familiegården i Codazzi",
    terroirNotes: [
      { title: "Selektiv høsting.", body: "Kun modne kaffebær, plukket for hånd i flere runder." },
      { title: "Familiens tørrmølle.", body: "Lokal foredling til eksportstandard." },
      { title: "FNC-standard.", body: "Resolusjon 02/2016, kontrollert utvalg per parti." },
    ],
    roastingEyebrow: "Brenningen · Norge",
    roastingTitle: "Nordisk brenning i mikropartier",
    roastCards: [
      { bg: OLIVE, k: "Foredling ved opprinnelsen", t: "Ren, vasket foredling", b: "Tradisjonell vasket foredling med kontrollert fermentering — en ren kopp, lyse toner og jevn kvalitet fra parti til parti." },
      { bg: MUSTARD, k: "Lys- og mellombrent", t: "Smaken står i sentrum", b: "Varmen styres presist for å bevare jasmin, panela, røde bær og mild sjokolade — uten at brennepreget tar over." },
      { bg: DEEP_TERRA, k: "Brent på bestilling", t: "Pakket nybrent", b: "Brent i Stavanger og pakket samme uke, slik at kaffen når deg i riktig avgassingsvindu." },
    ],
    assortment: "Sortimentet",
    variants: "Våre varianter",
    fullShop: "Hele butikken",
    format: "Format",
    recommended: "Anbefalt",
    traceability: "Sporbarhet",
    traceTitle: "Samme familie fra jorda i Cesar til lageret i Rogaland",
  },
  en: {
    metaTitle: "Our coffee | Kaffe Guatilla",
    metaDescription:
      "100% Arabica specialty coffee from Agustín Codazzi, Colombia — grown in Serranía del Perijá, processed at the family dry mill and roasted in microlots in Stavanger.",
    altitude: "900–1,800 m a.s.l.",
    heroEyebrow: "Our coffee · Codazzi → Stavanger",
    heroBefore: "Grown in Serranía del Perijá. Crafted for",
    heroEmphasis: "Nordic",
    heroAfter: "palates.",
    heroLead:
      "100% Arabica specialty coffee from Agustín Codazzi in Colombia. We follow every step — from soil and shade trees to roasting in Stavanger.",
    portfolioCta: "View the range",
    originCta: "The origin",
    terroirEyebrow: "The terroir · Colombia",
    terroirTitle: "Slow ripening, hand-picked cherries",
    terroirBody: [
      "Our lots grow in Agustín Codazzi in Cesar, from 900–1,300 metres to our most exclusive coffee at up to 1,800 metres above sea level. The cool microclimate allows slow ripening — more sugar, brighter acidity and a broader spectrum of aromas in the cup.",
      "We do not buy anonymous lots through intermediaries. Our family farms pick selectively by hand — only ripe cherries — and process them at the family's local dry mill.",
    ],
    stats: [
      { b: "900–1,800", s: "m a.s.l." },
      { b: "Screen size 16", s: "FNC grading" },
      { b: "11.5–12.5%", s: "Moisture" },
    ],
    cherryAlt: "Ripe coffee cherries, hand-picked on the family farm in Codazzi",
    terroirNotes: [
      { title: "Selective harvesting.", body: "Only ripe cherries, hand-picked over several rounds." },
      { title: "The family dry mill.", body: "Local processing to export standard." },
      { title: "FNC standard.", body: "Resolution 02/2016, with controlled grading for each lot." },
    ],
    roastingEyebrow: "Roasting · Norway",
    roastingTitle: "Nordic roasting in microlots",
    roastCards: [
      { bg: OLIVE, k: "Processing at origin", t: "Clean, washed process", b: "Traditional washed processing with controlled fermentation — a clean cup, bright notes and consistent quality from lot to lot." },
      { bg: MUSTARD, k: "Light and medium-light", t: "Flavour takes centre stage", b: "Heat is precisely controlled to preserve jasmine, panela, red berries and mild chocolate — without the roast taking over." },
      { bg: DEEP_TERRA, k: "Roasted to order", t: "Packed fresh", b: "Roasted in Stavanger and packed the same week, so the coffee reaches you in the right degassing window." },
    ],
    assortment: "The range",
    variants: "Our coffees",
    fullShop: "Full shop",
    format: "Format",
    recommended: "Recommended",
    traceability: "Traceability",
    traceTitle: "The same family from the soil in Cesar to the warehouse in Rogaland",
    products: [
      { name: "Guatilla Signature", tag: "Core range", variant: "Washed Excelso", alt: "Guatilla Signature — washed Excelso", spectrum: ["Chocolate", "Panela", "Citrus"], profile: "Notes of chocolate and panela, a round mouthfeel and mild, balanced citrus acidity. Our everyday coffee.", format: "250 g / 500 g", recommended: "Filter and espresso", cta: "View Guatilla Signature" },
      { name: "Serranía Microlot", tag: "Limited edition", variant: "Pink Bourbon", alt: "Serranía Microlot — Pink Bourbon", spectrum: ["Jasmine", "Red berries", "Silky"], profile: "Intensely floral — jasmine, ripe red berries and a silky texture. Developed for hand brewing.", format: "Numbered lots", recommended: "V60, Chemex, Aeropress", cta: "View Serranía Microlot" },
      { name: "Green coffee for roasteries", tag: "B2B", variant: "Green coffee", alt: "Green coffee packed for export in vacuum bags labelled café verde", spectrum: ["Screen size 16", "11.5–12.5%", "FNC"], profile: "Selected at origin, with controlled moisture and a complete data sheet — for Norwegian micro-roasteries.", format: "10 kg box / 50 kg bag", recommended: "Custom roast profile", cta: "Request a sample and data sheet" },
    ],
    trace: [
      { title: "Direct trade", body: "The family that grows in Colombia is the same family that imports and distributes in Rogaland." },
      { title: "Registered food importer", body: "Registered with the Norwegian Food Safety Authority as importer and first recipient of food products." },
      { title: "GS1 traceability", body: "Lot coding and tracking to the international GS1 standard, all the way." },
    ],
  },
  es: {
    metaTitle: "Nuestro café | Kaffe Guatilla",
    metaDescription:
      "Café de especialidad 100 % arábica de Agustín Codazzi, Colombia: cultivado en la Serranía del Perijá, procesado en la trilladora familiar y tostado en microlotes en Stavanger.",
    altitude: "900–1.800 m s. n. m.",
    heroEyebrow: "Nuestro café · Codazzi → Stavanger",
    heroBefore: "Cultivado en la Serranía del Perijá. Elaborado para",
    heroEmphasis: "paladares",
    heroAfter: "nórdicos.",
    heroLead:
      "Café de especialidad 100 % arábica de Agustín Codazzi, Colombia. Seguimos cada paso: desde la tierra y los árboles de sombra hasta el tueste en Stavanger.",
    portfolioCta: "Ver la selección",
    originCta: "El origen",
    terroirEyebrow: "El terroir · Colombia",
    terroirTitle: "Maduración lenta, cerezas recolectadas a mano",
    terroirBody: [
      "Nuestros lotes crecen en Agustín Codazzi, Cesar, desde los 900–1.300 metros hasta nuestro café más exclusivo, a 1.800 metros. El microclima fresco favorece una maduración lenta: más azúcar, acidez más viva y un espectro aromático más amplio en taza.",
      "No compramos lotes anónimos a través de intermediarios. Nuestras fincas familiares seleccionan a mano solo las cerezas maduras y las procesan en la trilladora local de la familia.",
    ],
    stats: [
      { b: "900–1.800", s: "m s. n. m." },
      { b: "Malla 16", s: "Clasificación FNC" },
      { b: "11,5–12,5 %", s: "Humedad" },
    ],
    cherryAlt: "Cerezas maduras de café recolectadas a mano en la finca familiar de Codazzi",
    terroirNotes: [
      { title: "Cosecha selectiva.", body: "Solo cerezas maduras, recolectadas a mano en varias pasadas." },
      { title: "Trilladora familiar.", body: "Procesamiento local conforme al estándar de exportación." },
      { title: "Estándar FNC.", body: "Resolución 02/2016 y selección controlada por lote." },
    ],
    roastingEyebrow: "El tueste · Noruega",
    roastingTitle: "Tueste nórdico en microlotes",
    roastCards: [
      { bg: OLIVE, k: "Proceso en el origen", t: "Proceso lavado y limpio", b: "Proceso lavado tradicional con fermentación controlada: una taza limpia, notas vivas y calidad constante entre lotes." },
      { bg: MUSTARD, k: "Tueste claro y medio-claro", t: "El sabor es protagonista", b: "Controlamos el calor con precisión para conservar jazmín, panela, frutos rojos y chocolate suave, sin que domine el tueste." },
      { bg: DEEP_TERRA, k: "Tostado bajo pedido", t: "Empacado recién tostado", b: "Tostado en Stavanger y empacado esa misma semana para que te llegue en la ventana adecuada de desgasificación." },
    ],
    assortment: "La selección",
    variants: "Nuestros cafés",
    fullShop: "Toda la tienda",
    format: "Formato",
    recommended: "Recomendado",
    traceability: "Trazabilidad",
    traceTitle: "La misma familia desde la tierra del Cesar hasta el almacén en Rogaland",
    products: [
      { name: "Guatilla Signature", tag: "Selección permanente", variant: "Excelso lavado", alt: "Guatilla Signature — Excelso lavado", spectrum: ["Chocolate", "Panela", "Cítricos"], profile: "Notas de chocolate y panela, cuerpo redondo y una acidez cítrica suave y equilibrada. Nuestro café de diario.", format: "250 g / 500 g", recommended: "Filtro y espresso", cta: "Ver Guatilla Signature" },
      { name: "Microlote Serranía", tag: "Edición limitada", variant: "Bourbon Rosado", alt: "Microlote Serranía — Bourbon Rosado", spectrum: ["Jazmín", "Frutos rojos", "Sedoso"], profile: "Intensamente floral: jazmín, frutos rojos maduros y textura sedosa. Desarrollado para preparaciones manuales.", format: "Lotes numerados", recommended: "V60, Chemex, Aeropress", cta: "Ver Microlote Serranía" },
      { name: "Café verde para tostadoras", tag: "B2B", variant: "Café verde", alt: "Café verde empacado para exportación en bolsas al vacío", spectrum: ["Malla 16", "11,5–12,5 %", "FNC"], profile: "Seleccionado en origen, con humedad controlada y ficha técnica completa para microtostadores noruegos.", format: "Caja de 10 kg / saco de 50 kg", recommended: "Perfil de tueste personalizado", cta: "Solicitar muestra y ficha técnica" },
    ],
    trace: [
      { title: "Comercio directo", body: "La familia que cultiva en Colombia es la misma que importa y distribuye en Rogaland." },
      { title: "Importador de alimentos registrado", body: "Registrados ante la Autoridad Noruega de Seguridad Alimentaria como importador y primer receptor." },
      { title: "Trazabilidad GS1", body: "Codificación y seguimiento de lotes bajo el estándar internacional GS1, de principio a fin." },
    ],
  },
} as const;

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = KAFFE_COPY[locale];

  return { title: copy.metaTitle, description: copy.metaDescription };
}

const CSS = `
.vk { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.vk *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.vk .on-dark:focus-visible { outline-color:${MUSTARD}; }
.vk a { transition:background-color .16s ease, color .16s ease; }

.vk-section { max-width:1300px; margin:0 auto; padding:clamp(44px,5vw,72px) clamp(16px,3vw,44px) 0; }
.vk-section:last-child { padding-bottom:clamp(44px,5vw,72px); }
.vk-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; }
.vk-h2 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(28px,3.6vw,46px); line-height:1.05; letter-spacing:-.03em; color:${INK}; text-wrap:balance; max-width:20ch; }

.seam { background:${INK}; border:2px solid ${INK}; gap:2px; }

/* ── HERO ─────────────────────────────────────────── */
.vk-hero { border-bottom:2px solid ${INK}; background:${INK}; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:2px; }
.vk-hero-photo { position:relative; min-height:min(500px,60vw); background:${WARM}; }
.vk-hero-label { position:absolute; left:0; bottom:0; background:${CREAM}; color:${INK}; padding:8px 12px; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.08em; text-transform:uppercase; }
.vk-hero-panel { background:${TERRA}; color:${ON_DARK}; padding:clamp(28px,4vw,60px) clamp(20px,4vw,60px); display:flex; flex-direction:column; justify-content:center; gap:26px; }
.vk-hero-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:#FFF1E8; }
.vk-hero-h1 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(28px,4.2vw,56px); line-height:1; letter-spacing:-.035em; color:${ON_DARK}; text-wrap:balance; }
.vk-hero-h1 em { font-style:italic; }
.vk-hero-lead { margin:0; max-width:44ch; font-family:${F_KARLA}; font-size:16.5px; line-height:1.6; color:${ON_DARK}; }
.vk-hero-btns { display:flex; flex-wrap:wrap; align-self:flex-start; background:${INK}; border:2px solid ${INK}; gap:2px; }
.vk-btn-a { padding:15px 22px; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; text-align:center; }
@media (max-width: 460px) {
  .vk-hero-btns { align-self:stretch; }
  .vk-btn-a { flex:1 1 100%; }
}

/* ── generic 3-col seam row ───────────────────────── */
.row3 { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; }
@media (max-width: 820px) { .row3 { grid-template-columns:1fr; } }

/* ── TERROIR ──────────────────────────────────────── */
.terroir-wrap { margin-top:clamp(22px,3vw,32px); }
.terroir-block { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:2px; background:${INK}; border:2px solid ${INK}; }
.terroir-left { display:grid; grid-template-rows:auto auto; gap:2px; background:${INK}; }
.terroir-copy { background:${TEAL}; color:${ON_DARK}; padding:clamp(24px,3vw,38px); }
.terroir-copy p { margin:0; font-family:${F_KARLA}; font-size:15px; line-height:1.6; }
.terroir-copy p + p { margin-top:14px; }
.terroir-stats { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; }
.terroir-stat { background:${CREAM}; padding:20px 16px; }
.terroir-stat b { display:block; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:24px; color:${TERRA}; }
.terroir-stat span { display:block; margin-top:4px; font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:${MUTED}; }
.terroir-photo { position:relative; min-height:min(420px,55vw); background:${WARM}; }
.terroir-sub { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; border-top:0; }
.terroir-sub div { background:${WARM}; padding:18px 20px; font-family:${F_KARLA}; font-size:13.5px; line-height:1.55; color:${BODY}; }
.terroir-sub b { font-family:${F_BITTER}; font-weight:800; font-style:normal; color:${INK}; }
@media (max-width: 860px) {
  .terroir-block { grid-template-columns:1fr; }
  .terroir-photo { min-height:280px; }
}
@media (max-width: 520px) { .terroir-stats { grid-template-columns:1fr; } }
@media (max-width: 720px) { .terroir-sub { grid-template-columns:1fr; } }

/* ── ROASTING ─────────────────────────────────────── */
.roast-cell { padding:clamp(24px,3vw,34px); display:flex; flex-direction:column; gap:12px; }
.roast-kicker { margin:0; font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; }
.roast-title { margin:0; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:24px; line-height:1.1; }
.roast-body { margin:0; font-family:${F_KARLA}; font-size:14.5px; line-height:1.55; }

/* ── PORTFOLIO ────────────────────────────────────── */
.pf-head { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:16px 24px; }
.pf-link { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:${TERRA}; text-decoration:none; }
.pf-row { margin-top:clamp(22px,3vw,32px); }
.pf-card { background:${CREAM}; display:flex; flex-direction:column; }
.pf-photo { position:relative; height:260px; background:${PHOTO_CELL}; border-bottom:2px solid ${INK}; }
.pf-tag { position:absolute; left:0; top:0; padding:7px 11px; font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; }
.pf-body { padding:24px 22px; display:flex; flex-direction:column; gap:14px; flex:1; }
.pf-name { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:25px; line-height:1.05; color:${INK}; }
.pf-variant { margin:0; font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:${MUTED}; }
.pf-spectrum { display:flex; height:34px; border:2px solid ${INK}; overflow:hidden; }
.pf-seg { position:relative; }
.pf-seg span { position:absolute; left:6px; bottom:3px; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:11.5px; line-height:1; white-space:nowrap; }
.pf-profile { margin:0; font-family:${F_KARLA}; font-size:14px; line-height:1.55; color:${BODY}; }
.pf-specs { display:flex; flex-direction:column; }
.pf-spec { display:flex; justify-content:space-between; gap:12px; padding:9px 0; font-size:13px; }
.pf-spec + .pf-spec { border-top:1px solid ${HAIRLINE}; }
.pf-spec dt { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:${MUTED}; }
.pf-spec dd { margin:0; font-family:${F_KARLA}; color:${BODY}; text-align:right; }
.pf-cta { margin-top:auto; display:block; background:${INK}; color:${CREAM}; text-align:center; padding:16px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; }
.pf-cta:hover { color:${ON_DARK}; }

/* ── TRACEABILITY ─────────────────────────────────── */
.trace-block { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.trace-head { grid-column:1 / -1; background:${DARK_BROWN}; padding:clamp(24px,3vw,36px); }
.trace-head p { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:${MUSTARD}; }
.trace-head h2 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(24px,2.8vw,34px); line-height:1.15; letter-spacing:-.02em; color:${CREAM}; text-wrap:balance; max-width:24ch; }
.trace-badge { background:${DARK_BROWN}; padding:24px 22px; display:flex; gap:16px; align-items:flex-start; }
.trace-patch { width:44px; height:44px; flex:none; display:grid; place-items:center; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:18px; }
.trace-badge h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:17px; color:${CREAM}; }
.trace-badge p { margin:6px 0 0; font-family:${F_KARLA}; font-size:14px; line-height:1.5; color:#EFE3D6; }
@media (max-width: 720px) { .trace-block { grid-template-columns:1fr; } }

@media (max-width: 860px) { .vk-hero { grid-template-columns:1fr; } .vk-hero-photo { min-height:300px; } }
@media (prefers-reduced-motion: reduce) { .vk * { transition:none !important; } }
`;

export default async function VarKaffePage() {
  const locale = await getRequestLocale();
  const copy = KAFFE_COPY[locale];
  const products =
    locale === "no"
      ? PRODUCTS
      : PRODUCTS.map((product, index) => {
          const translated = KAFFE_COPY[locale].products[index];
          return {
            ...product,
            ...translated,
            anbefalt: translated.recommended,
            spectrum: product.spectrum.map((segment, segmentIndex) => ({
              ...segment,
              label: translated.spectrum[segmentIndex],
            })),
          };
        });
  const trace =
    locale === "no"
      ? TRACE
      : TRACE.map((item, index) => ({
          ...item,
          ...KAFFE_COPY[locale].trace[index],
        }));

  return (
    <div className="vk">
      <style>{CSS}</style>

      {/* ── 1) HERO ─────────────────────────────────────── */}
      <section className="vk-hero">
        <div className="vk-hero-photo">
          <Image
            src="/assets/perija-montanas.jpg"
            alt={`Serranía del Perijá, Agustín Codazzi`}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
          <span className="vk-hero-label">{copy.altitude}</span>
        </div>

        <div className="vk-hero-panel">
          <p className="vk-hero-eyebrow">{copy.heroEyebrow}</p>
          <h1 className="vk-hero-h1">
            {copy.heroBefore} <em>{copy.heroEmphasis}</em> {copy.heroAfter}
          </h1>
          <p className="vk-hero-lead">{copy.heroLead}</p>
          <div className="vk-hero-btns">
            <a
              href="#portefolje"
              className="vk-btn-a on-dark"
              style={{ background: MUSTARD, color: INK }}
            >
              {copy.portfolioCta} ↓
            </a>
            <a
              href="#terroir"
              className="vk-btn-a"
              style={{ background: CREAM, color: INK }}
            >
              {copy.originCta} ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── 2) TERROIR ──────────────────────────────────── */}
      <section className="vk-section" id="terroir">
        <p className="vk-eyebrow" style={{ color: TERRA }}>
          {copy.terroirEyebrow}
        </p>
        <h2 className="vk-h2">{copy.terroirTitle}</h2>

        <div className="terroir-wrap">
          <div className="terroir-block">
            <div className="terroir-left">
              <div className="terroir-copy">
                {copy.terroirBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="terroir-stats">
                {copy.stats.map((st) => (
                  <div key={st.s} className="terroir-stat">
                    <b>{st.b}</b>
                    <span>{st.s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="terroir-photo">
              <Image
                src="/assets/cerezas-cosecha.jpg"
                alt={copy.cherryAlt}
                fill
                sizes="(max-width: 860px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="terroir-sub">
            {copy.terroirNotes.map((note) => (
              <div key={note.title}>
                <b>{note.title}</b> {note.body}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3) ROASTING ─────────────────────────────────── */}
      <section className="vk-section">
        <p className="vk-eyebrow" style={{ color: TERRA }}>
          {copy.roastingEyebrow}
        </p>
        <h2 className="vk-h2">{copy.roastingTitle}</h2>

        <div
          className="row3"
          style={{
            marginTop: "clamp(22px,3vw,32px)",
            background: INK,
            border: `2px solid ${INK}`,
          }}
        >
          {copy.roastCards.map((c) => (
            <div
              key={c.k}
              className="roast-cell"
              style={{ background: c.bg, color: onColor(c.bg) }}
            >
              <p className="roast-kicker">{c.k}</p>
              <h3 className="roast-title">{c.t}</h3>
              <p className="roast-body">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4) PORTFOLIO ────────────────────────────────── */}
      <section className="vk-section" id="portefolje">
        <div className="pf-head">
          <div>
            <p className="vk-eyebrow" style={{ color: TERRA }}>
              {copy.assortment}
            </p>
            <h2 className="vk-h2">{copy.variants}</h2>
          </div>
          <Link href="/shop" className="pf-link">
            {copy.fullShop} →
          </Link>
        </div>

        <div
          className="pf-row row3"
          style={{ background: INK, border: `2px solid ${INK}` }}
        >
          {products.map((p) => (
            <article key={p.name} className="pf-card">
              <div className="pf-photo">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: p.imagePosition ?? "center" }}
                />
                <span
                  className="pf-tag"
                  style={{ background: p.tagBg, color: onColor(p.tagBg) }}
                >
                  {p.tag}
                </span>
              </div>

              <div className="pf-body">
                <h3 className="pf-name">{p.name}</h3>
                <p className="pf-variant">{p.variant}</p>

                <div className="pf-spectrum">
                  {p.spectrum.map((s) => (
                    <div
                      key={s.label}
                      className="pf-seg"
                      style={{ flex: `0 0 ${s.pct}%`, background: s.bg }}
                    >
                      <span style={{ color: onColor(s.bg) }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <p className="pf-profile">{p.profile}</p>

                <dl className="pf-specs">
                  <div className="pf-spec">
                    <dt>{copy.format}</dt>
                    <dd>{p.format}</dd>
                  </div>
                  <div className="pf-spec">
                    <dt>{copy.recommended}</dt>
                    <dd>{p.anbefalt}</dd>
                  </div>
                </dl>

                <Link href={p.href} className="pf-cta on-dark">
                  {p.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 5) TRACEABILITY ─────────────────────────────── */}
      <section className="vk-section">
        <div className="trace-block">
          <div className="trace-head">
            <p>{copy.traceability}</p>
            <h2>{copy.traceTitle}</h2>
          </div>
          {trace.map((t) => (
            <div key={t.n} className="trace-badge">
              <span
                className="trace-patch"
                style={{ background: t.bg, color: onColor(t.bg) }}
                aria-hidden
              >
                {t.n}
              </span>
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
