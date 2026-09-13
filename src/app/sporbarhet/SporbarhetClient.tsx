"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CoffeeLot } from "@/types/coffeeLot";

/* ── Tokens (modern patchwork · samme turkis/petrol som posene) ──── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TEAL = "#1F4B4B";
const MUSTARD = "#DDA83A";
const TERRA = "#A94B2F";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const seam = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: INK,
  border: `2px solid ${INK}`,
  gap: "2px",
  ...extra,
});

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "long" }).format(d);
}

function formatGrind(value: string | null): string | null {
  return value === "Malt" ? "Malt kaffe" : value;
}

type Status = "idle" | "loading" | "found" | "not-found" | "error";

const CSS = `
.spb { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; min-height:100dvh; }
.spb *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.spb a { color:${TEAL}; }
.spb button { cursor:pointer; }
.spb-wrap { max-width:820px; margin:0 auto; padding:clamp(28px,5vw,56px) clamp(16px,4vw,28px) 80px; }

.spb-hero { background:${TEAL}; border:2px solid ${INK}; padding:clamp(28px,5vw,44px) clamp(20px,4vw,36px); text-align:center; }
.spb-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${MUSTARD}; }
.spb-h1 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(30px,6vw,44px); line-height:1.02; letter-spacing:-.02em; color:${ON_DARK}; }
.spb-lead { margin:14px auto 0; max-width:44ch; font-size:15.5px; line-height:1.6; color:rgba(255,247,239,.82); }

.spb-form { margin-top:22px; display:flex; flex-direction:column; gap:2px; }
.spb-input { border:2px solid ${INK}; background:${CREAM}; color:${INK}; padding:16px 18px; font-family:${F_MONO}; font-weight:700; font-size:16px; letter-spacing:.04em; text-transform:uppercase; text-align:center; }
.spb-input::placeholder { color:rgba(46,32,24,.4); text-transform:none; font-weight:400; letter-spacing:normal; }
.spb-submit { border:none; background:${INK}; color:${ON_DARK}; padding:17px; font-family:${F_MONO}; font-weight:700; font-size:13px; letter-spacing:.14em; text-transform:uppercase; }
.spb-submit:disabled { opacity:.6; cursor:default; }
.spb-formerr { margin:0; padding:10px 4px 0; font-size:13px; color:${ON_DARK}; background:${TERRA}; padding:10px 14px; }

.spb-example { margin-top:12px; font-size:12.5px; color:rgba(255,247,239,.6); }

.spb-back { display:inline-flex; align-items:center; gap:6px; margin-bottom:18px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:${TEAL}; text-decoration:none; }

.spb-nf { background:${WARM}; border:2px solid ${INK}; padding:40px 28px; text-align:center; }
.spb-nf h2 { margin:0; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:24px; color:${INK}; }
.spb-nf p { margin:12px 0 0; font-size:14.5px; line-height:1.6; color:${BODY}; }
.spb-nf .btn { margin-top:20px; display:inline-flex; border:none; background:${INK}; color:${ON_DARK}; padding:14px 24px; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; }

.spb-result-hd { background:${TEAL}; border:2px solid ${INK}; padding:22px 24px; }
.spb-result-hd .lot { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:${MUSTARD}; }
.spb-result-hd h1 { margin:8px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(26px,4.4vw,36px); line-height:1.05; color:${ON_DARK}; }
.spb-result-hd .sub { margin:10px 0 0; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.06em; color:rgba(255,247,239,.8); }

.spb-section { margin-top:22px; }
.spb-section-hd { background:${INK}; color:${ON_DARK}; padding:10px 16px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.14em; text-transform:uppercase; }
.spb-fields { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); }
.spb-fields.spb-fields-1 { grid-template-columns:1fr; }
.spb-field { background:${CREAM}; padding:15px 16px; border:1.5px solid ${WARM}; }
.spb-field .l { margin:0; font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; color:${MUTED}; }
.spb-field .v { margin:5px 0 0; font-family:${F_BITTER}; font-weight:700; font-size:16px; color:${INK}; line-height:1.35; }

.spb-story { background:${WARM}; border:2px solid ${INK}; padding:24px; margin-top:22px; }
.spb-story h2 { margin:0 0 12px; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:24px; color:${INK}; }
.spb-story p { margin:0; font-size:15px; line-height:1.7; color:${BODY}; white-space:pre-line; }
.spb-gallery { margin-top:16px; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.spb-gallery img { display:block; width:100%; height:100%; object-fit:cover; aspect-ratio:4/3; }
.spb-video { margin-top:16px; aspect-ratio:16/9; border:2px solid ${INK}; }
.spb-video iframe { width:100%; height:100%; display:block; }

@media (max-width:560px) {
  .spb-fields { grid-template-columns:1fr; }
  .spb-field-filler { display:none; }
  .spb-gallery { grid-template-columns:1fr; }
}
@media (prefers-reduced-motion:reduce) { .spb * { transition:none !important; } }
`;

type FieldDef = { label: string; value: string | null | undefined };

function FieldGrid({ fields }: { fields: FieldDef[] }) {
  const visible = fields.filter((f): f is { label: string; value: string } => Boolean(f.value));
  if (visible.length === 0) return null;
  return (
    <div className="spb-fields" style={seam()}>
      {visible.map((f) => (
        <div className="spb-field" key={f.label}>
          <p className="l">{f.label}</p>
          <p className="v">{f.value}</p>
        </div>
      ))}
      {visible.length % 2 !== 0 && <div className="spb-field spb-field-filler" aria-hidden="true" />}
    </div>
  );
}

function LotResult({ lot }: { lot: CoffeeLot }) {
  const images = Array.isArray(lot.images) ? lot.images : [];
  return (
    <div>
      <div className="spb-result-hd">
        <p className="lot">Partinummer {lot.lot_number}</p>
        <h1>{lot.product_name || "Kaffe Guatilla"}</h1>
        {(lot.grind || lot.net_weight) && (
          <p className="sub">
            {[formatGrind(lot.grind), lot.net_weight].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      {/* Produkt */}
      <section className="spb-section">
        <div className="spb-section-hd">Produkt</div>
        <FieldGrid
          fields={[
            { label: "Produktnavn", value: lot.product_name },
            { label: "Format", value: formatGrind(lot.grind) },
            { label: "Nettovekt", value: lot.net_weight },
            { label: "Brenningsgrad", value: lot.roast_degree },
            { label: "Brennedato", value: formatDate(lot.roast_date) },
            { label: "Best før", value: formatDate(lot.best_before) },
            { label: "Partinummer", value: lot.lot_number },
          ]}
        />
      </section>

      {/* Opprinnelse */}
      <section className="spb-section">
        <div className="spb-section-hd">Opprinnelse</div>
        <FieldGrid
          fields={[
            { label: "Land", value: lot.country },
            { label: "Region / departement", value: lot.region },
            { label: "Kommune", value: lot.municipality },
            { label: "Gård", value: lot.farm },
            { label: "Produsent", value: lot.producer },
            { label: "Høyde over havet", value: lot.altitude },
            { label: "Innhøstingsår / periode", value: lot.harvest_period },
          ]}
        />
      </section>

      {/* Kaffen */}
      <section className="spb-section">
        <div className="spb-section-hd">Kaffen</div>
        <FieldGrid
          fields={[
            { label: "Art", value: lot.species },
            { label: "Kaffesort", value: lot.variety },
            { label: "Klassifisering", value: lot.grade },
            { label: "Prosess", value: lot.process },
            { label: "Siktestørrelse", value: lot.screen_size },
          ]}
        />
      </section>

      {/* Kvalitetskontroll */}
      {(lot.moisture ||
        lot.water_activity ||
        lot.defects ||
        lot.lab_notes ||
        lot.cupping_score ||
        lot.flavour_profile) && (
        <section className="spb-section">
          <div className="spb-section-hd">Kvalitetskontroll</div>
          <FieldGrid
            fields={[
              { label: "Fuktighet", value: lot.moisture },
              { label: "Vannaktivitet", value: lot.water_activity },
              { label: "Defekter", value: lot.defects },
              { label: "Laboratoriekontroller", value: lot.lab_notes },
              { label: "Cuppingpoeng", value: lot.cupping_score },
              { label: "Smaksprofil", value: lot.flavour_profile },
            ]}
          />
        </section>
      )}

      {/* Fra Colombia til Norge */}
      <section className="spb-section">
        <div className="spb-section-hd">Fra Colombia til Norge</div>
        <FieldGrid
          fields={[
            { label: "Eksportør", value: lot.exporter },
            { label: "Eksportdato", value: formatDate(lot.export_date) },
            { label: "Importør", value: lot.importer },
            { label: "Mottaksdato i Norge", value: formatDate(lot.received_date_norway) },
          ]}
        />
      </section>

      {/* Brenning og pakking */}
      <section className="spb-section">
        <div className="spb-section-hd">Brenning og pakking</div>
        <FieldGrid
          fields={[
            { label: "Brent hos", value: lot.roasted_by },
            { label: "Brennedato", value: formatDate(lot.roast_date) },
            { label: "Brenningsgrad", value: lot.roast_degree },
            { label: "Pakkedato", value: formatDate(lot.packing_date) },
            { label: "Produksjonsopplysninger", value: lot.production_notes },
          ]}
        />
      </section>

      {/* Historien bak kaffen */}
      {(lot.story_text || images.length > 0 || lot.story_video_url) && (
        <div className="spb-story">
          <h2>Historien bak kaffen</h2>
          {lot.story_text && <p>{lot.story_text}</p>}
          {images.length > 0 && (
            <div className="spb-gallery">
              {images.map((img, i) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={img.caption || lot.product_name || "Bilde fra partiet"}
                  width={480}
                  height={360}
                  unoptimized
                  style={
                    i === images.length - 1 && images.length % 2 !== 0
                      ? { gridColumn: "1 / -1" }
                      : undefined
                  }
                />
              ))}
            </div>
          )}
          {lot.story_video_url && (
            <div className="spb-video">
              <iframe
                src={lot.story_video_url}
                title="Video fra partiet"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SporbarhetClient({ initialLot }: { initialLot?: string }) {
  const [value, setValue] = useState(initialLot ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [lot, setLot] = useState<CoffeeLot | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(`/api/sporbarhet/lookup?lot=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Noe gikk galt. Prøv igjen.");
        setStatus("error");
        return;
      }
      if (data.found) {
        setLot(data.lot);
        setStatus("found");
      } else {
        setLot(null);
        setStatus("not-found");
      }
    } catch {
      setError("Ingen kontakt med serveren. Sjekk internettforbindelsen og prøv igjen.");
      setStatus("error");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(value);
  }

  const showingResult = status === "found" && lot;

  return (
    <div className="spb">
      <style>{CSS}</style>
      <div className="spb-wrap">
        {showingResult ? (
          <>
            <button
              type="button"
              className="spb-back"
              onClick={() => {
                setStatus("idle");
                setLot(null);
              }}
            >
              ← Søk på nytt
            </button>
            <LotResult lot={lot} />
          </>
        ) : (
          <>
            <div className="spb-hero">
              <p className="spb-eyebrow">Kaffe Guatilla · Sporbarhet</p>
              <h1 className="spb-h1">Spor kaffen din</h1>
              <p className="spb-lead">
                Skriv inn partinummeret som står på kaffeposen, så viser vi deg
                hele reisen — fra gård i Serranía del Perijá til posen din.
              </p>

              <form className="spb-form" onSubmit={handleSubmit} style={seam()}>
                <label className="sr-only" htmlFor="lotnummer" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                  Partinummer
                </label>
                <input
                  id="lotnummer"
                  className="spb-input"
                  placeholder="F.eks. KG-261015-01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="submit" className="spb-submit" disabled={status === "loading" || !value.trim()}>
                  {status === "loading" ? "Søker …" : "Vis sporbarhet"}
                </button>
                {status === "error" && error && <p className="spb-formerr">{error}</p>}
              </form>

              <p className="spb-example">Partinummeret finner du trykket på kaffeposen.</p>
            </div>

            {status === "not-found" && (
              <div className="spb-nf" style={{ marginTop: 22 }}>
                <h2>Partinummeret ble ikke funnet.</h2>
                <p>Kontroller nummeret på kaffeposen og prøv igjen.</p>
                <Link href="/contact" className="btn">
                  Kontakt oss
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
