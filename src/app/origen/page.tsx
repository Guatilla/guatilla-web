import Image from "next/image";
import { getRequestLocale } from "@/i18n/server";

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const PHOTO_CELL = "#F7ECDE";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TERRA = "#A94B2F";
const DEEP_TERRA = "#8E3A2B";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const PEOPLE = [
  {
    name: "Stevenson",
    role: "Jord og foredling · Codazzi",
    line: "Har ansvar for dyrkingen og foredlingen i Agustín Codazzi.",
    accent: OLIVE,
  },
  {
    name: "Jennifer",
    role: "Teknisk eksport · Colombia",
    line: "Styrer den tekniske eksporten og dokumentasjonen fra Colombia.",
    accent: TEAL,
  },
  {
    name: "Wilkins",
    role: "Brenning og levering · Stavanger",
    line: "Leder brenningen og leveringen i Stavanger.",
    accent: TERRA,
  },
];

const ORIGIN_COPY = {
  no: {
    metaTitle: "Opprinnelse | Kaffe Guatilla",
    metaDescription:
      "Røttene våre i Serranía del Perijá — familiegårder i Agustín Codazzi i Cesar, familiens tørrmølle og direkte handel til Stavanger.",
    bannerAlt: "Serranía del Perijá — tåkeskog og skogkledde skråninger på Cesars østside",
    bannerTag: "Serranía del Perijá · Cesars østskråning",
    heroEyebrow: "Opprinnelse · Colombia",
    heroTitle: "Røttene våre i Serranía del Perijá",
    heroLead: "Mellom tåkeskoger og fruktbar vulkansk jord dyrker vi spesialkaffe med generasjoners kunnskap — og forpliktelsen til å bringe den rett til Norge, uten mellomledd.",
    altitude: ["Dalen", "Skråning", "Topp", "Familiegårder"],
    metres: "moh",
    arabica: "100 % Arabica",
    terroir: "Terroiret",
    terroirTitle: "Naturen som former koppen",
    tiles: [
      { title: "Høyde", meta: "900–1 800 moh", body: "Langsom modning gir høyere tetthet i bønnen og en kompleks syrlighet." },
      { title: "Mikroklima", meta: "VIND · SKY · KJØLIGE NETTER", body: "Naturlig konsentrasjon av sukker — søte toner av panela og karamell." },
      { title: "Jord og skygge", meta: "NATURLIG SKOGDEKKE", body: "Skogdekket bidrar til jevn fuktighet og ensartet modning." },
    ],
    controlEyebrow: "Kontroll i alle ledd · Fra frø til tørrmølle",
    controlTitle: "Vi følger hvert steg",
    steps: [
      { title: "Stell av kaffetreet", body: "Tradisjonelle arabicasorter — Caturra og Castillo — og mikropartier i toppklasse: Rosa Bourbon og Red Bourbon.", chip: "Sertifisert plantemateriale · Rosa Bourbon", alt: "Rosa Bourbon-kaffefrø, klare til planting" },
      { title: "Selektiv håndplukking", body: "Vi høster bare kaffebær på sitt optimale modningspunkt — med riktig Brix-verdi — og unngår umodne og overmodne bær." },
      { title: "Våtforedling og tørrmølle", body: "Tradisjonell våtforedling med kontrollert fermentering og jevn tørking. Mekanisk tørrmølling sorterer etter tetthet og størrelse — siktestørrelse over 14/16 — og gir råkaffe med fuktighet på 11,5–12,5 %.", chip: "INGESEC-tørrmølle · 80 kg/t", alt: "Familiens tørrmølle" },
    ],
    peopleEyebrow: "Den menneskelige dimensjonen · Direkte handel",
    quoteBefore: "Broen er",
    quoteEmphasis: "familien",
    quoteAfter: "— ikke et slagord.",
    peopleLead: "I den globale kaffekjeden er det ofte mange ledd mellom den som dyrker, og den som drikker kaffen. Hos Guatilla AS er familiebåndet selve driftsmodellen.",
    routeEyebrow: "Fra Cartagena til Stavanger",
    routeTitle: "Den direkte ruten",
    registeredExporter: "Registrert eksportør",
    originControl: "Kontroll ved opprinnelsen",
    originControlBody: "Plantehelse- og tollsertifisering i Colombia, håndtert gjennom FNC og plattformen Cafenlace.",
    cleanRoute: "Ren rute",
    cleanRouteBody: "Sjøfrakt fra Sociedad Portuaria de Cartagena rett til Stavanger, med kvaliteten ivaretatt helt fram til mikrobrenneriet.",
    institutional: ["FNC-godkjent produksjon og eksport", "Forsendelser via Cafenlace"],
  },
  en: {
    metaTitle: "Origin | Kaffe Guatilla",
    metaDescription: "Our roots in Serranía del Perijá — family farms in Agustín Codazzi, Cesar, the family dry mill and direct trade to Stavanger.",
    bannerAlt: "Serranía del Perijá — cloud forest and wooded slopes on the eastern side of Cesar",
    bannerTag: "Serranía del Perijá · eastern Cesar slope",
    heroEyebrow: "Origin · Colombia",
    heroTitle: "Our roots in Serranía del Perijá",
    heroLead: "Among cloud forests and fertile volcanic soil, we grow specialty coffee with generations of knowledge — and a commitment to bring it directly to Norway, without intermediaries.",
    altitude: ["Valley", "Slope", "Peak", "Family farms"],
    metres: "m a.s.l.",
    arabica: "100% Arabica",
    terroir: "The terroir",
    terroirTitle: "Nature shapes the cup",
    tiles: [
      { title: "Altitude", meta: "900–1,800 m a.s.l.", body: "Slow ripening increases bean density and creates complex acidity." },
      { title: "Microclimate", meta: "WIND · SHADE · COOL NIGHTS", body: "Natural sugar concentration — sweet notes of panela and caramel." },
      { title: "Soil and shade", meta: "NATURAL FOREST COVER", body: "The forest cover helps maintain even moisture and uniform ripening." },
    ],
    controlEyebrow: "Control at every stage · From seed to dry mill",
    controlTitle: "We follow every step",
    steps: [
      { title: "Caring for the coffee tree", body: "Traditional Arabica varieties — Caturra and Castillo — and top-tier microlots: Pink Bourbon and Red Bourbon.", chip: "Certified plant material · Pink Bourbon", alt: "Pink Bourbon coffee seeds ready for planting" },
      { title: "Selective hand-picking", body: "We harvest only cherries at their optimal point of ripeness — with the correct Brix value — avoiding unripe and overripe fruit." },
      { title: "Wet processing and dry mill", body: "Traditional wet processing with controlled fermentation and even drying. Mechanical dry milling sorts by density and size — screen size above 14/16 — and produces green coffee with 11.5–12.5% moisture.", chip: "INGESEC dry mill · 80 kg/h", alt: "The family dry mill" },
    ],
    peopleEyebrow: "The human dimension · Direct trade",
    quoteBefore: "The bridge is",
    quoteEmphasis: "the family",
    quoteAfter: "— not a slogan.",
    peopleLead: "The global coffee chain often has many links between the grower and the person drinking the coffee. At Guatilla AS, the family bond is the operating model itself.",
    people: [
      { role: "Growing and processing · Codazzi", line: "Responsible for cultivation and processing in Agustín Codazzi." },
      { role: "Technical export · Colombia", line: "Manages technical exports and documentation from Colombia." },
      { role: "Roasting and delivery · Stavanger", line: "Leads roasting and delivery in Stavanger." },
    ],
    routeEyebrow: "From Cartagena to Stavanger",
    routeTitle: "The direct route",
    registeredExporter: "Registered exporter",
    originControl: "Control at origin",
    originControlBody: "Plant-health and customs certification in Colombia, managed through FNC and the Cafenlace platform.",
    cleanRoute: "A clean route",
    cleanRouteBody: "Sea freight from Sociedad Portuaria de Cartagena directly to Stavanger, with quality protected all the way to the micro-roastery.",
    institutional: ["FNC-approved production and export", "Shipments through Cafenlace"],
  },
  es: {
    metaTitle: "Origen | Kaffe Guatilla",
    metaDescription: "Nuestras raíces en la Serranía del Perijá: fincas familiares en Agustín Codazzi, Cesar, la trilladora familiar y comercio directo con Stavanger.",
    bannerAlt: "Serranía del Perijá: bosque de niebla y laderas arboladas al este del Cesar",
    bannerTag: "Serranía del Perijá · ladera oriental del Cesar",
    heroEyebrow: "Origen · Colombia",
    heroTitle: "Nuestras raíces en la Serranía del Perijá",
    heroLead: "Entre bosques de niebla y suelos volcánicos fértiles cultivamos café de especialidad con el conocimiento de generaciones y el compromiso de llevarlo directamente a Noruega, sin intermediarios.",
    altitude: ["Valle", "Ladera", "Cima", "Fincas familiares"],
    metres: "m s. n. m.",
    arabica: "100 % arábica",
    terroir: "El terroir",
    terroirTitle: "La naturaleza que da forma a la taza",
    tiles: [
      { title: "Altitud", meta: "900–1.800 m s. n. m.", body: "La maduración lenta aumenta la densidad del grano y crea una acidez compleja." },
      { title: "Microclima", meta: "VIENTO · SOMBRA · NOCHES FRESCAS", body: "Concentración natural de azúcares: notas dulces de panela y caramelo." },
      { title: "Suelo y sombra", meta: "COBERTURA NATURAL DE BOSQUE", body: "El bosque ayuda a mantener una humedad estable y una maduración uniforme." },
    ],
    controlEyebrow: "Control en cada etapa · De la semilla a la trilladora",
    controlTitle: "Seguimos cada paso",
    steps: [
      { title: "Cuidado del cafeto", body: "Variedades tradicionales de arábica — Caturra y Castillo — y microlotes de alta gama: Bourbon Rosado y Bourbon Rojo.", chip: "Material vegetal certificado · Bourbon Rosado", alt: "Semillas de café Bourbon Rosado listas para sembrar" },
      { title: "Recolección manual selectiva", body: "Cosechamos solo las cerezas en su punto óptimo de maduración, con el valor Brix correcto, y evitamos frutos verdes o sobremaduros." },
      { title: "Proceso húmedo y trilladora", body: "Proceso húmedo tradicional con fermentación controlada y secado uniforme. La trilla mecánica clasifica por densidad y tamaño — malla superior a 14/16 — y produce café verde con una humedad del 11,5–12,5 %.", chip: "Trilladora INGESEC · 80 kg/h", alt: "La trilladora de la familia" },
    ],
    peopleEyebrow: "La dimensión humana · Comercio directo",
    quoteBefore: "El puente es",
    quoteEmphasis: "la familia",
    quoteAfter: "— no un eslogan.",
    peopleLead: "En la cadena mundial del café suele haber muchos eslabones entre quien lo cultiva y quien lo bebe. En Guatilla AS, el vínculo familiar es el propio modelo operativo.",
    people: [
      { role: "Cultivo y proceso · Codazzi", line: "Responsable del cultivo y el proceso en Agustín Codazzi." },
      { role: "Exportación técnica · Colombia", line: "Gestiona la exportación técnica y la documentación desde Colombia." },
      { role: "Tueste y entrega · Stavanger", line: "Dirige el tueste y la entrega en Stavanger." },
    ],
    routeEyebrow: "De Cartagena a Stavanger",
    routeTitle: "La ruta directa",
    registeredExporter: "Exportador registrado",
    originControl: "Control en el origen",
    originControlBody: "Certificación fitosanitaria y aduanera en Colombia, gestionada mediante la FNC y la plataforma Cafenlace.",
    cleanRoute: "Una ruta limpia",
    cleanRouteBody: "Transporte marítimo desde la Sociedad Portuaria de Cartagena directamente a Stavanger, cuidando la calidad hasta la microtostadora.",
    institutional: ["Producción y exportación aprobadas por la FNC", "Envíos mediante Cafenlace"],
  },
} as const;

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = ORIGIN_COPY[locale];

  return { title: copy.metaTitle, description: copy.metaDescription };
}

const CSS = `
.org { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.org *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.org a { transition:background-color .16s ease, color .16s ease; }

.org-sect { max-width:1180px; margin:0 auto; padding:clamp(60px,6vw,104px) clamp(24px,4vw,56px); }
.org-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:${TERRA}; }
.org-disp { margin:0; font-family:${F_BITTER}; font-weight:800; color:${INK}; letter-spacing:-.035em; line-height:1; }

/* banner */
.org-banner { position:relative; width:100%; height:clamp(240px,40vw,460px); overflow:hidden;
  border-bottom:2px solid ${INK}; background:${TEAL}; }
.org-banner-tag { position:absolute; left:0; bottom:0; background:${CREAM}; color:${INK};
  padding:9px 15px; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }

/* hero */
.org-hero { padding-top:clamp(52px,5.5vw,88px); }
.org-h1 { margin:24px 0 0; font-size:clamp(38px,6.2vw,88px); max-width:15ch; text-wrap:balance; }
.org-lead { margin:30px 0 0; max-width:52ch; font-size:18px; line-height:1.62; color:${BODY}; }

.org-altbar { margin-top:48px; display:flex; align-items:flex-end; gap:2px; background:${CREAM}; }
.org-alt { flex:1; box-shadow:0 0 0 2px ${INK}; padding:12px 18px; display:flex; flex-direction:column; justify-content:flex-end; color:${ON_DARK}; }
.org-alt .k { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; }
.org-alt .v { font-family:${F_BITTER}; font-weight:800; font-size:20px; }

/* terroir */
.org-band { background:${WARM}; border-top:2px solid ${INK}; border-bottom:2px solid ${INK}; }
.org-tiles { margin-top:40px; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-tile { padding:30px 24px; display:flex; flex-direction:column; gap:14px; min-height:300px; }
.org-tile .t { font-family:${F_BITTER}; font-weight:800; font-size:27px; line-height:1; }
.org-tile .m { font-family:${F_MONO}; font-weight:700; font-size:12px; }
.org-tile .b { margin-top:auto; font-size:14.5px; line-height:1.55; }

/* vertikal kontroll */
.org-steps { margin-top:40px; display:flex; flex-direction:column; gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-step { display:flex; gap:2px; background:${INK}; }
.org-step-n { flex:0 0 120px; display:flex; align-items:center; justify-content:center; color:${ON_DARK};
  font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:40px; }
.org-step-c { flex:1; background:${CREAM}; padding:24px 26px; min-width:0; }
.org-step-c h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:20px; color:${INK}; }
.org-step-c p { margin:8px 0 0; font-size:14.5px; line-height:1.6; color:${BODY}; }
.org-chip { margin-top:14px; display:inline-block; background:${INK}; color:${CREAM}; padding:8px 14px;
  font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
.org-step-photo { margin:18px auto 0; position:relative; width:100%; max-width:300px; overflow:hidden; border:2px solid ${INK}; }

/* human */
.org-quote { margin:22px 0 0; max-width:30ch; font-family:${F_BITTER}; font-weight:800;
  font-size:clamp(24px,3.2vw,42px); line-height:1.15; letter-spacing:-.02em; color:${INK}; }
.org-quote em { font-style:italic; color:${TERRA}; }
.org-humans { margin-top:40px; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-human { background:${CREAM}; padding:26px 22px; display:flex; flex-direction:column; gap:10px; }
.org-human .bar { height:8px; width:56px; }
.org-human .n { margin-top:4px; font-family:${F_BITTER}; font-weight:800; font-size:22px; color:${INK}; }
.org-human .r { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:${MUTED}; }
.org-human .l { font-size:13.5px; line-height:1.55; color:${BODY}; }

/* route */
.org-route { margin-top:40px; display:flex; align-items:center; gap:clamp(6px,3vw,16px); flex-wrap:nowrap; }
.org-route .dot { width:clamp(9px,2.6vw,14px); height:clamp(9px,2.6vw,14px); flex:none; }
.org-route .city { font-family:${F_BITTER}; font-weight:800; font-size:clamp(13px,4vw,20px); color:${INK}; white-space:nowrap; }
.org-route .line { flex:1; min-width:10px; height:2px; background:${INK}; }
.org-route svg { flex:none; width:clamp(18px,5.5vw,30px); height:auto; }
.org-blocks { margin-top:34px; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-block { padding:26px 24px 28px; }
.org-credit { display:flex; align-items:center; gap:16px; margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid ${INK}2e; }
.org-credit img { width:72px; height:auto; display:block; flex:none; opacity:.95; }
.org-credit span { font-family:${F_MONO}; font-weight:700; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:${BODY}; line-height:1.6; }
.org-block h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:19px; color:${INK}; }
.org-block p { margin:10px 0 0; font-size:14.5px; line-height:1.6; color:${BODY}; }

/* institusjonelt */
.org-inst { border-top:2px solid ${INK}; }
.org-inst-row { max-width:1180px; margin:0 auto; }
.org-inst-inner { display:flex; flex-wrap:wrap; gap:2px; background:${INK}; border-left:2px solid ${INK}; border-right:2px solid ${INK}; }
.org-inst-inner span { flex:1 1 220px; background:${WARM}; color:${INK}; padding:22px 24px;
  font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.08em; text-transform:uppercase; }

@media (max-width: 760px) {
  .org-tiles { grid-template-columns:1fr; }
  .org-tile { min-height:0; }
  .org-humans { grid-template-columns:1fr; }
  .org-blocks { grid-template-columns:1fr; }
}
@media (max-width: 560px) {
  .org-altbar { flex-wrap:wrap; }
  .org-alt { padding:10px 12px; }
  .org-alt .k { font-size:9px; }
  .org-alt .v { font-size:13px; }
  .org-alt:last-child { flex:1 0 100% !important; }
  .org-step-n { flex-basis:84px; font-size:32px; }
}
@media (prefers-reduced-motion: reduce) { .org * { transition:none !important; } }
`;

export default async function OrigenPage() {
  const locale = await getRequestLocale();
  const copy = ORIGIN_COPY[locale];
  const people =
    locale === "no"
      ? PEOPLE
      : PEOPLE.map((person, index) => ({
          ...person,
          ...ORIGIN_COPY[locale].people[index],
        }));

  return (
    <div className="org">
      <style>{CSS}</style>

      {/* ── BANNER ───────────────────────────────────────── */}
      <div className="org-banner">
        <Image
          src="/assets/perija-hero.jpg"
          alt={copy.bannerAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
        <span className="org-banner-tag">{copy.bannerTag}</span>
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="org-sect org-hero">
        <p className="org-eyebrow">{copy.heroEyebrow}</p>
        <h1 className="org-disp org-h1">{copy.heroTitle}</h1>
        <p className="org-lead">{copy.heroLead}</p>

        <div className="org-altbar">
          <div className="org-alt" style={{ background: OLIVE, height: 84 }}>
            <span className="k">{copy.altitude[0]}</span>
            <span className="v">900 {copy.metres}</span>
          </div>
          <div className="org-alt" style={{ background: TEAL, height: 122 }}>
            <span className="k">{copy.altitude[1]}</span>
            <span className="v">1 300 {copy.metres}</span>
          </div>
          <div className="org-alt" style={{ background: DEEP_TERRA, height: 168 }}>
            <span className="k">{copy.altitude[2]}</span>
            <span className="v">1 800 {copy.metres}</span>
          </div>
          <div
            className="org-alt"
            style={{ flex: 1.1, background: PHOTO_CELL, color: MUTED, alignSelf: "stretch" }}
          >
            <span className="k">{copy.altitude[3]}</span>
            <span className="v" style={{ color: INK, fontSize: 18 }}>
              {copy.arabica}
            </span>
          </div>
        </div>
      </section>

      {/* ── TERROIR ──────────────────────────────────────── */}
      <section className="org-band">
        <div className="org-sect">
          <p className="org-eyebrow">{copy.terroir}</p>
          <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
            {copy.terroirTitle}
          </h2>

          <div className="org-tiles">
            <div className="org-tile" style={{ background: MUSTARD, color: INK }}>
              <span className="t">{copy.tiles[0].title}</span>
              <span className="m">{copy.tiles[0].meta}</span>
              <span className="b">{copy.tiles[0].body}</span>
            </div>
            <div className="org-tile" style={{ background: OLIVE, color: ON_DARK }}>
              <span className="t">{copy.tiles[1].title}</span>
              <span className="m">{copy.tiles[1].meta}</span>
              <span className="b">{copy.tiles[1].body}</span>
            </div>
            <div className="org-tile" style={{ background: TEAL, color: ON_DARK }}>
              <span className="t">{copy.tiles[2].title}</span>
              <span className="m">{copy.tiles[2].meta}</span>
              <span className="b">{copy.tiles[2].body}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTIKAL KONTROLL ────────────────────────────── */}
      <section className="org-sect">
        <p className="org-eyebrow">{copy.controlEyebrow}</p>
        <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
          {copy.controlTitle}
        </h2>

        <div className="org-steps">
          <div className="org-step">
            <div className="org-step-n" style={{ background: DEEP_TERRA }}>01</div>
            <div className="org-step-c">
              <h3>{copy.steps[0].title}</h3>
              <p>{copy.steps[0].body}</p>
              <span className="org-chip">{copy.steps[0].chip}</span>
              <div className="org-step-photo" style={{ aspectRatio: "1159 / 1280" }}>
                <Image
                  src="/assets/semilla-bourbon-rosado.jpg"
                  alt={copy.steps[0].alt}
                  fill
                  sizes="(max-width: 480px) 60vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div className="org-step">
            <div className="org-step-n" style={{ background: MUSTARD, color: INK }}>02</div>
            <div className="org-step-c">
              <h3>{copy.steps[1].title}</h3>
              <p>{copy.steps[1].body}</p>
            </div>
          </div>
          <div className="org-step">
            <div className="org-step-n" style={{ background: TEAL }}>03</div>
            <div className="org-step-c">
              <h3>{copy.steps[2].title}</h3>
              <p>{copy.steps[2].body}</p>
              <span className="org-chip">{copy.steps[2].chip}</span>
              <div className="org-step-photo" style={{ aspectRatio: "1400 / 1867" }}>
                <Image
                  src="/assets/trilladora-maskin.jpg"
                  alt={copy.steps[2].alt}
                  fill
                  sizes="(max-width: 480px) 60vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEN MENNESKELIGE DIMENSJONEN ─────────────────── */}
      <section className="org-band">
        <div className="org-sect">
          <p className="org-eyebrow">{copy.peopleEyebrow}</p>
          <p className="org-quote">
            {copy.quoteBefore} <em>{copy.quoteEmphasis}</em> {copy.quoteAfter}
          </p>
          <p style={{ margin: "20px 0 0", maxWidth: "60ch", fontSize: 15.5, lineHeight: 1.7, color: BODY }}>
            {copy.peopleLead}
          </p>

          <div className="org-humans">
            {people.map((p) => (
              <div key={p.name} className="org-human">
                <span className="bar" style={{ background: p.accent }} />
                <span className="n">{p.name}</span>
                <span className="r">{p.role}</span>
                <span className="l">{p.line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRA CARTAGENA TIL STAVANGER ──────────────────── */}
      <section className="org-sect">
        <p className="org-eyebrow">{copy.routeEyebrow}</p>
        <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
          {copy.routeTitle}
        </h2>

        <div className="org-route">
          <span className="dot" style={{ background: TEAL }} />
          <span className="city">Cartagena</span>
          <span className="line" />
          <svg
            aria-hidden="true"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16h16l-2.4 4.5H6.4z" />
            <path d="M12 3.5v9.5" />
            <path d="M12 4.5l5.5 8H12z" />
          </svg>
          <span className="line" />
          <span className="city">Stavanger</span>
          <span className="dot" style={{ background: OLIVE }} />
        </div>

        <div className="org-blocks">
          <div className="org-block" style={{ background: CREAM }}>
            <div className="org-credit">
              <Image src="/assets/cace-logo-ink.png" alt="CACE L&G S.A.S." width={72} height={72} style={{ width: 72, height: "auto" }} />
              <span>
                {copy.registeredExporter}
                <br />
                CACE L&amp;G S.A.S.
              </span>
            </div>
            <h3>{copy.originControl}</h3>
            <p>{copy.originControlBody}</p>
          </div>
          <div className="org-block" style={{ background: PHOTO_CELL }}>
            <h3>{copy.cleanRoute}</h3>
            <p>{copy.cleanRouteBody}</p>
          </div>
        </div>
      </section>

      {/* ── INSTITUSJONELT ──────────────────────────────── */}
      <div className="org-inst">
        <div className="org-inst-row org-sect" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="org-inst-inner">
            <span>{copy.institutional[0]}</span>
            <span>{copy.institutional[1]}</span>
          </div>
        </div>
      </div>
      <div style={{ height: 56 }} />
    </div>
  );
}
