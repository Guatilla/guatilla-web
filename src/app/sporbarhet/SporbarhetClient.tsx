"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";
import type { CoffeeLot, LotImage } from "@/types/coffeeLot";

type Status = "idle" | "loading" | "found" | "not-found" | "error";
type Field = { label: string; value: string | null | undefined };

const COPY = {
  no: {
    eyebrow: "Kaffe Guatilla · Sporbarhet", title: "Spor kaffen din",
    lead: "Skriv inn partinummeret som står på kaffeposen, så viser vi deg hele reisen – fra gården i Serranía del Perijá til posen din.",
    lot: "Partinummer", placeholder: "F.eks. KG-261015-01", search: "Vis sporbarhet", searching: "Søker …",
    hint: "Partinummeret finner du trykket på kaffeposen.", retry: "Søk på nytt", notFound: "Partinummeret ble ikke funnet.",
    check: "Kontroller nummeret på kaffeposen og prøv igjen.", contact: "Kontakt oss", requestError: "Noe gikk galt. Prøv igjen.",
    networkError: "Ingen kontakt med serveren. Sjekk internettforbindelsen og prøv igjen.", product: "Produkt", origin: "Opprinnelse",
    coffee: "Kaffen", quality: "Kvalitetskontroll", journey: "Fra Colombia til Norge", roasting: "Brenning og pakking", story: "Historien bak kaffen",
    productName: "Produktnavn", format: "Format", netWeight: "Nettovekt", roastDegree: "Brenningsgrad", roastDate: "Brennedato",
    bestBefore: "Best før", country: "Land", region: "Region / departement", municipality: "Kommune", farm: "Gård", producer: "Produsent",
    altitude: "Høyde over havet", harvest: "Innhøstingsår / periode", species: "Art", variety: "Kaffesort", grade: "Klassifisering",
    process: "Prosess", screen: "Siktestørrelse", moisture: "Fuktighet", waterActivity: "Vannaktivitet", defects: "Defekter",
    labs: "Laboratoriekontroller", score: "Cuppingpoeng", flavour: "Smaksprofil", exporter: "Eksportør", exportDate: "Eksportdato",
    importer: "Importør", received: "Mottaksdato i Norge", roastedBy: "Brent hos", packingDate: "Pakkedato", production: "Produksjonsopplysninger",
    imageDialog: "Bilder fra partiet", close: "Lukk bilde", previous: "Forrige bilde", next: "Neste bilde", openImage: "Vis bilde i full størrelse",
    video: "Video fra partiet", ground: "Malt kaffe", whole: "Hele bønner",
  },
  en: {
    eyebrow: "Kaffe Guatilla · Traceability", title: "Trace your coffee",
    lead: "Enter the lot number printed on your coffee bag and we will show you the entire journey – from the farm in Serranía del Perijá to your bag.",
    lot: "Lot number", placeholder: "E.g. KG-261015-01", search: "View traceability", searching: "Searching …",
    hint: "You will find the lot number printed on the coffee bag.", retry: "Search again", notFound: "We could not find that lot number.",
    check: "Check the number on the coffee bag and try again.", contact: "Contact us", requestError: "Something went wrong. Please try again.",
    networkError: "We could not reach the server. Check your internet connection and try again.", product: "Product", origin: "Origin",
    coffee: "The coffee", quality: "Quality control", journey: "From Colombia to Norway", roasting: "Roasting and packing", story: "The story behind the coffee",
    productName: "Product name", format: "Format", netWeight: "Net weight", roastDegree: "Roast level", roastDate: "Roast date",
    bestBefore: "Best before", country: "Country", region: "Region / department", municipality: "Municipality", farm: "Farm", producer: "Producer",
    altitude: "Altitude", harvest: "Harvest year / period", species: "Species", variety: "Coffee variety", grade: "Grade",
    process: "Process", screen: "Screen size", moisture: "Moisture", waterActivity: "Water activity", defects: "Defects",
    labs: "Laboratory checks", score: "Cupping score", flavour: "Flavour profile", exporter: "Exporter", exportDate: "Export date",
    importer: "Importer", received: "Date received in Norway", roastedBy: "Roasted by", packingDate: "Packing date", production: "Production details",
    imageDialog: "Images from this lot", close: "Close image", previous: "Previous image", next: "Next image", openImage: "View full-size image",
    video: "Video from this lot", ground: "Ground coffee", whole: "Whole beans",
  },
  es: {
    eyebrow: "Kaffe Guatilla · Trazabilidad", title: "Rastrea tu café",
    lead: "Introduce el número de lote impreso en la bolsa y te mostraremos todo el recorrido: desde la finca en la Serranía del Perijá hasta tu café.",
    lot: "Número de lote", placeholder: "Ej. KG-261015-01", search: "Ver trazabilidad", searching: "Buscando …",
    hint: "Encontrarás el número de lote impreso en la bolsa de café.", retry: "Buscar de nuevo", notFound: "No encontramos ese número de lote.",
    check: "Comprueba el número de la bolsa e inténtalo de nuevo.", contact: "Contáctanos", requestError: "Algo salió mal. Inténtalo de nuevo.",
    networkError: "No pudimos conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.", product: "Producto", origin: "Origen",
    coffee: "El café", quality: "Control de calidad", journey: "De Colombia a Noruega", roasting: "Tueste y empaque", story: "La historia detrás del café",
    productName: "Nombre del producto", format: "Formato", netWeight: "Peso neto", roastDegree: "Nivel de tueste", roastDate: "Fecha de tueste",
    bestBefore: "Consumir preferentemente antes de", country: "País", region: "Región / departamento", municipality: "Municipio", farm: "Finca", producer: "Productor",
    altitude: "Altitud", harvest: "Año / periodo de cosecha", species: "Especie", variety: "Variedad de café", grade: "Clasificación",
    process: "Proceso", screen: "Tamaño de malla", moisture: "Humedad", waterActivity: "Actividad de agua", defects: "Defectos",
    labs: "Controles de laboratorio", score: "Puntuación de cata", flavour: "Perfil de sabor", exporter: "Exportador", exportDate: "Fecha de exportación",
    importer: "Importador", received: "Fecha de recepción en Noruega", roastedBy: "Tostado por", packingDate: "Fecha de empaque", production: "Datos de producción",
    imageDialog: "Imágenes de este lote", close: "Cerrar imagen", previous: "Imagen anterior", next: "Imagen siguiente", openImage: "Ver imagen a tamaño completo",
    video: "Video de este lote", ground: "Café molido", whole: "Granos enteros",
  },
} as const;

function formatDate(iso: string | null, locale: Locale) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const code = locale === "no" ? "nb-NO" : locale === "en" ? "en-GB" : "es-ES";
  return new Intl.DateTimeFormat(code, { dateStyle: "long" }).format(date);
}

function formatGrind(value: string | null, locale: Locale) {
  if (!value) return null;
  const copy = COPY[locale];
  if (value === "Malt") return copy.ground;
  if (value === "Hele bønner" || value === "Hele b�nner") return copy.whole;
  return value;
}

function FieldGrid({ fields }: { fields: Field[] }) {
  const visible = fields.filter((field): field is { label: string; value: string } => Boolean(field.value));
  if (!visible.length) return null;
  return (
    <div className="spb-fields">
      {visible.map((field) => <div className="spb-field" key={field.label}><p>{field.label}</p><strong>{field.value}</strong></div>)}
      {visible.length % 2 !== 0 && <div className="spb-field filler" aria-hidden="true" />}
    </div>
  );
}

function Lightbox({ images, index, onClose, onNavigate }: { images: LotImage[]; index: number; onClose: () => void; onNavigate: (index: number) => void }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const navigate = useCallback((offset: number) => onNavigate((index + offset + images.length) % images.length), [images.length, index, onNavigate]);

  useEffect(() => closeRef.current?.focus(), []);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [navigate, onClose]);

  return (
    <div className="spb-lightbox-backdrop" role="dialog" aria-modal="true" aria-label={copy.imageDialog} onClick={onClose}>
      <button ref={closeRef} type="button" className="spb-lightbox-close" onClick={onClose} aria-label={copy.close}>×</button>
      {images.length > 1 && <>
        <button type="button" className="spb-lightbox-nav prev" aria-label={copy.previous} onClick={(event) => { event.stopPropagation(); navigate(-1); }}>←</button>
        <button type="button" className="spb-lightbox-nav next" aria-label={copy.next} onClick={(event) => { event.stopPropagation(); navigate(1); }}>→</button>
      </>}
      <div className="spb-lightbox" onClick={(event) => event.stopPropagation()}>
        <Image src={image.url} alt={image.caption || copy.imageDialog} width={920} height={690} sizes="92vw" />
        {image.caption && <p>{image.caption}</p>}
      </div>
    </div>
  );
}

function Section({ title, fields }: { title: string; fields: Field[] }) {
  const hasValue = fields.some((field) => Boolean(field.value));
  if (!hasValue) return null;
  return <section className="spb-section"><h2>{title}</h2><FieldGrid fields={fields} /></section>;
}

function LotResult({ lot }: { lot: CoffeeLot }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const images = Array.isArray(lot.images) ? lot.images : [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const date = (value: string | null) => formatDate(value, locale);

  return (
    <div>
      <header className="spb-result-hd">
        <p>{copy.lot} {lot.lot_number}</p><h1>{lot.product_name || "Kaffe Guatilla"}</h1>
        {(lot.grind || lot.net_weight) && <span>{[formatGrind(lot.grind, locale), lot.net_weight].filter(Boolean).join(" · ")}</span>}
      </header>
      <Section title={copy.product} fields={[
        { label: copy.productName, value: lot.product_name }, { label: copy.format, value: formatGrind(lot.grind, locale) },
        { label: copy.netWeight, value: lot.net_weight }, { label: copy.roastDegree, value: lot.roast_degree },
        { label: copy.roastDate, value: date(lot.roast_date) }, { label: copy.bestBefore, value: date(lot.best_before) },
        { label: copy.lot, value: lot.lot_number },
      ]} />
      <Section title={copy.origin} fields={[
        { label: copy.country, value: lot.country }, { label: copy.region, value: lot.region }, { label: copy.municipality, value: lot.municipality },
        { label: copy.farm, value: lot.farm }, { label: copy.producer, value: lot.producer }, { label: copy.altitude, value: lot.altitude },
        { label: copy.harvest, value: lot.harvest_period },
      ]} />
      <Section title={copy.coffee} fields={[
        { label: copy.species, value: lot.species }, { label: copy.variety, value: lot.variety }, { label: copy.grade, value: lot.grade },
        { label: copy.process, value: lot.process }, { label: copy.screen, value: lot.screen_size },
      ]} />
      <Section title={copy.quality} fields={[
        { label: copy.moisture, value: lot.moisture }, { label: copy.waterActivity, value: lot.water_activity }, { label: copy.defects, value: lot.defects },
        { label: copy.labs, value: lot.lab_notes }, { label: copy.score, value: lot.cupping_score }, { label: copy.flavour, value: lot.flavour_profile },
      ]} />
      <Section title={copy.journey} fields={[
        { label: copy.exporter, value: lot.exporter }, { label: copy.exportDate, value: date(lot.export_date) },
        { label: copy.importer, value: lot.importer }, { label: copy.received, value: date(lot.received_date_norway) },
      ]} />
      <Section title={copy.roasting} fields={[
        { label: copy.roastedBy, value: lot.roasted_by }, { label: copy.roastDate, value: date(lot.roast_date) },
        { label: copy.roastDegree, value: lot.roast_degree }, { label: copy.packingDate, value: date(lot.packing_date) },
        { label: copy.production, value: lot.production_notes },
      ]} />

      {(lot.story_text || images.length > 0 || lot.story_video_url) && <section className="spb-story">
        <h2>{copy.story}</h2>{lot.story_text && <p>{lot.story_text}</p>}
        {images.length > 0 && <div className="spb-gallery">{images.map((image, index) => (
          <button key={image.id} type="button" onClick={() => setOpenIndex(index)} aria-label={image.caption ? `${copy.openImage}: ${image.caption}` : copy.openImage}>
            <div className="frame"><span>{index + 1}/{images.length}</span><Image src={image.url} alt={image.caption || lot.product_name || copy.imageDialog} width={480} height={360} /></div>
            {image.caption && <p>{image.caption}</p>}
          </button>
        ))}</div>}
        {openIndex !== null && <Lightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />}
        {lot.story_video_url && <div className="spb-video"><iframe src={lot.story_video_url} title={copy.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>}
      </section>}
    </div>
  );
}

const CSS = `
.spb{background:#FDF1E5;color:#4A382C;font-family:var(--font-karla),system-ui,sans-serif;min-height:100dvh}.spb *:focus-visible{outline:2px solid #2E2018;outline-offset:2px}.spb-wrap{max-width:820px;margin:0 auto;padding:clamp(28px,5vw,56px) clamp(16px,4vw,28px) 80px}.spb-hero,.spb-result-hd{background:#1F4B4B;border:2px solid #2E2018;padding:clamp(28px,5vw,44px) clamp(20px,4vw,36px);text-align:center}.spb-eyebrow,.spb-result-hd p{margin:0;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#DDA83A}.spb h1{margin:12px 0 0;font-family:var(--font-bitter),Georgia,serif;font-weight:800;font-size:clamp(30px,6vw,44px);line-height:1.02;color:#FFF7EF}.spb-lead{margin:14px auto 0;max-width:48ch;font-size:15.5px;line-height:1.6;color:rgba(255,247,239,.82)}.spb-form{margin-top:22px;display:flex;flex-direction:column;gap:2px}.spb-input{border:2px solid #2E2018;background:#FDF1E5;color:#2E2018;padding:16px 18px;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:16px;text-transform:uppercase;text-align:center}.spb-submit{border:0;background:#2E2018;color:#FFF7EF;padding:17px;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase}.spb-submit:disabled{opacity:.6}.spb-formerr{margin:0;padding:10px 14px;color:#FFF7EF;background:#A94B2F}.spb-hint{font-size:12.5px;color:rgba(255,247,239,.65)}.spb-back{border:0;background:none;margin-bottom:18px;padding:0;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:11px;text-transform:uppercase;color:#1F4B4B;cursor:pointer}.spb-nf{margin-top:22px;background:#F2E6D8;border:2px solid #2E2018;padding:40px 28px;text-align:center}.spb-nf h2,.spb-story h2{margin:0;font-family:var(--font-bitter),Georgia,serif;font-weight:800;font-style:italic;font-size:24px;color:#2E2018}.spb-nf p{line-height:1.6}.spb-nf a{display:inline-flex;margin-top:10px;background:#2E2018;color:#FFF7EF;padding:14px 24px;font-family:var(--font-space-mono),monospace;font-size:11px;text-transform:uppercase;text-decoration:none}.spb-result-hd{text-align:left;padding:22px 24px}.spb-result-hd h1{font-size:clamp(26px,4.4vw,36px)}.spb-result-hd span{display:block;margin-top:10px;color:rgba(255,247,239,.8)}.spb-section{margin-top:22px}.spb-section>h2{margin:0;background:#2E2018;color:#FFF7EF;padding:10px 16px;font-family:var(--font-space-mono),monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase}.spb-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:2px solid #2E2018;background:#2E2018;gap:2px}.spb-field{background:#FDF1E5;padding:15px 16px}.spb-field p{margin:0;font-family:var(--font-space-mono),monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#6B5A4E}.spb-field strong{display:block;margin-top:5px;font-family:var(--font-bitter),Georgia,serif;font-size:16px;color:#2E2018}.spb-story{background:#F2E6D8;border:2px solid #2E2018;padding:24px;margin-top:22px}.spb-story>p{line-height:1.7;white-space:pre-line}.spb-gallery{margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:2px;background:#2E2018;border:2px solid #2E2018}.spb-gallery button{all:unset;background:#FDF1E5;cursor:zoom-in}.spb-gallery .frame{position:relative;aspect-ratio:4/3;overflow:hidden}.spb-gallery img{width:100%;height:100%;object-fit:cover}.spb-gallery .frame span{position:absolute;z-index:1;top:8px;left:8px;background:#2E2018;color:#FFF7EF;padding:3px 7px;font-size:10px}.spb-gallery button>p{padding:0 10px;font-size:12px;font-weight:700}.spb-video{margin-top:16px;aspect-ratio:16/9;border:2px solid #2E2018}.spb-video iframe{width:100%;height:100%}.spb-lightbox-backdrop{position:fixed;inset:0;z-index:100;background:rgba(46,32,24,.94);display:flex;align-items:center;justify-content:center;padding:32px}.spb-lightbox{max-width:min(920px,92vw);text-align:center;color:#FFF7EF}.spb-lightbox img{max-width:100%;max-height:72vh;width:auto;height:auto}.spb-lightbox-close,.spb-lightbox-nav{position:fixed;border:2px solid #FFF7EF;background:#2E2018;color:#FFF7EF;width:44px;height:44px;font-size:20px}.spb-lightbox-close{top:16px;right:16px}.spb-lightbox-nav{top:50%}.spb-lightbox-nav.prev{left:16px}.spb-lightbox-nav.next{right:16px}
@media(max-width:560px){.spb-fields{grid-template-columns:1fr}.spb-field.filler{display:none}.spb-gallery{grid-template-columns:1fr}}
`;

export default function SporbarhetClient({ initialLot }: { initialLot?: string }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const [value, setValue] = useState(initialLot ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [lot, setLot] = useState<CoffeeLot | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;
    setStatus("loading"); setError(null);
    try {
      const response = await fetch(`/api/sporbarhet/lookup?lot=${encodeURIComponent(trimmed)}`);
      const data = await response.json();
      if (!response.ok) { setError(copy.requestError); setStatus("error"); return; }
      if (data.found) { setLot(data.lot); setStatus("found"); }
      else { setLot(null); setStatus("not-found"); }
    } catch { setError(copy.networkError); setStatus("error"); }
  }

  return (
    <div className="spb"><style>{CSS}</style><div className="spb-wrap">
      {status === "found" && lot ? <>
        <button type="button" className="spb-back" onClick={() => { setStatus("idle"); setLot(null); }}>← {copy.retry}</button>
        <LotResult lot={lot} />
      </> : <>
        <div className="spb-hero">
          <p className="spb-eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="spb-lead">{copy.lead}</p>
          <form className="spb-form" onSubmit={(event) => { event.preventDefault(); runSearch(value); }}>
            <label className="sr-only" htmlFor="lotnummer">{copy.lot}</label>
            <input id="lotnummer" className="spb-input" placeholder={copy.placeholder} value={value} onChange={(event) => setValue(event.target.value)} autoCapitalize="characters" autoComplete="off" spellCheck={false} />
            <button type="submit" className="spb-submit" disabled={status === "loading" || !value.trim()}>{status === "loading" ? copy.searching : copy.search}</button>
            {status === "error" && error && <p className="spb-formerr">{error}</p>}
          </form>
          <p className="spb-hint">{copy.hint}</p>
        </div>
        {status === "not-found" && <div className="spb-nf"><h2>{copy.notFound}</h2><p>{copy.check}</p><LocalizedLink href="/contact">{copy.contact}</LocalizedLink></div>}
      </>}
    </div></div>
  );
}
