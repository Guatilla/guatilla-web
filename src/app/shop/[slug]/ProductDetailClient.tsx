"use client";

import Image from "next/image";
import Link from "@/components/LocalizedLink";
import type { Product } from "@/data/products";
import { useLocale } from "@/i18n/LocaleProvider";

interface ProductDetailClientProps {
  product: Product;
}

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM_CREAM = "#F2E6D8";
const INK = "#2E2018";
const BODY_INK = "#4A382C";
const MUTED = "#6B5A4E";
const SLASH = "#B3A395";
const TERRACOTTA = "#A94B2F";
const MUSTARD = "#DDA83A";
const ORANGE = "#E8862A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

/* seamed container: 2px ink lines between and around abutting cells */
const seam = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: INK,
  border: `2px solid ${INK}`,
  gap: "2px",
  ...extra,
});

const label: React.CSSProperties = {
  fontFamily: F_MONO,
  fontWeight: 700,
  fontSize: "10.5px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: MUTED,
};

const PDP_COPY = {
  no: {
    breadcrumb: "Kaffe",
    breadcrumbLabel: "Brødsmulesti",
    illustration: "illustrasjonsbilde",
    rawAlt: "Råkaffe fra Colombia",
    mountainAlt: "Fjellkjeden Serranía del Perijá",
    price: "Pris kommer",
    ground: "Malt kaffe",
    wholeBean: "Hele bønner",
    groundNote:
      "Vi tilpasser kverningsgraden til filterkaffe, presskanne eller espresso ved bestilling.",
    wholeBeanNote: "Hele bønner — kvern dem rett før brygging for best resultat.",
    inCup: "I koppen",
    profileBefore:
      "Full smaksprofil og cuppingpoeng for dette partiet publiseres for hvert partinummer under",
    traceability: "Sporbarhet",
    format: "Format",
    construction: "🚧 Nettbutikken er under oppbygging",
    constructionBody:
      "Det er ennå ikke mulig å bestille dette partiet på nett. Ta kontakt så hjelper vi deg i mellomtiden.",
    contact: "Ta kontakt",
    trust: ["Brennes på bestilling", "Sporbar med partinummer", "Direkte handel"],
    specs: ["Gård", "Kaffesort", "Prosess", "Brenning"],
    brewTitle: "Bryggeforslag",
    brewRows: ["Dose", "Vann", "Tid"],
    recommended: "Anbefalt",
    sameRange: "Fra samme fjellkjede",
    familyTitle: "Fire kaffeprodukter, samme fjellkjede",
    familyBody:
      "Dette er ett av fire kaffeprodukter fra Serranía del Perijá — se resten av sortimentet mens vi bygger butikken.",
    allProducts: "Se hele sortimentet",
  },
  en: {
    breadcrumb: "Coffee",
    breadcrumbLabel: "Breadcrumb",
    illustration: "packaging illustration",
    rawAlt: "Green coffee from Colombia",
    mountainAlt: "The Serranía del Perijá mountain range",
    price: "Price coming soon",
    ground: "Ground coffee",
    wholeBean: "Whole bean",
    groundNote:
      "We adjust the grind for filter, French press or espresso when you order.",
    wholeBeanNote: "Whole bean — grind just before brewing for the best result.",
    inCup: "In the cup",
    profileBefore:
      "The full flavour profile and cupping score for this lot are published for each lot number under",
    traceability: "Traceability",
    format: "Format",
    construction: "🚧 Our online shop is under construction",
    constructionBody:
      "This lot cannot be ordered online yet. Contact us and we will help you in the meantime.",
    contact: "Contact us",
    trust: ["Roasted to order", "Traceable by lot number", "Direct trade"],
    specs: ["Farm", "Variety", "Process", "Roast"],
    brewTitle: "Brewing guide",
    brewRows: ["Dose", "Water", "Time"],
    recommended: "Recommended",
    sameRange: "From the same mountain range",
    familyTitle: "Four coffee products, one mountain range",
    familyBody:
      "This is one of four coffee products from Serranía del Perijá — explore the rest of the range while we build the shop.",
    allProducts: "View the full range",
  },
  es: {
    breadcrumb: "Café",
    breadcrumbLabel: "Migas de pan",
    illustration: "ilustración del empaque",
    rawAlt: "Café verde de Colombia",
    mountainAlt: "La Serranía del Perijá",
    price: "Precio próximamente",
    ground: "Café molido",
    wholeBean: "En grano",
    groundNote:
      "Adaptamos la molienda para filtro, prensa francesa o espresso cuando hagas el pedido.",
    wholeBeanNote: "En grano: muélelo justo antes de prepararlo para obtener el mejor resultado.",
    inCup: "En la taza",
    profileBefore:
      "El perfil de sabor completo y la puntuación de cata de este lote se publican para cada número de lote en",
    traceability: "Trazabilidad",
    format: "Formato",
    construction: "🚧 Nuestra tienda está en construcción",
    constructionBody:
      "Todavía no es posible pedir este lote por internet. Contáctanos y te ayudaremos mientras tanto.",
    contact: "Contáctanos",
    trust: ["Tostado bajo pedido", "Trazable por número de lote", "Comercio directo"],
    specs: ["Finca", "Variedad", "Proceso", "Tueste"],
    brewTitle: "Guía de preparación",
    brewRows: ["Dosis", "Agua", "Tiempo"],
    recommended: "Recomendado",
    sameRange: "De la misma serranía",
    familyTitle: "Cuatro cafés, una misma serranía",
    familyBody:
      "Este es uno de los cuatro cafés de la Serranía del Perijá. Descubre el resto de la selección mientras construimos la tienda.",
    allProducts: "Ver toda la selección",
  },
} as const;

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const locale = useLocale();
  const copy = PDP_COPY[locale];
  const grindNote =
    product.grind === "Malt"
      ? copy.groundNote
      : copy.wholeBeanNote;

  return (
    <div
      className="pdp"
      style={{ background: CREAM, color: BODY_INK, fontFamily: F_KARLA }}
    >
      <style>{`
        .pdp *:focus-visible { outline: 2px solid ${INK}; outline-offset: 2px; }
        .pdp .on-dark:focus-visible { outline-color: ${MUSTARD}; }
        .pdp a.btn { cursor: pointer; }
        .pdp .thumb-row {
          display: grid;
          gap: 2px;
          grid-template-columns: 1fr 1fr;
        }
        .pdp .thumb-row > .thumb {
          position: relative;
          min-height: 128px;
          background: ${WARM_CREAM};
        }
        .pdp .thumb-row > .thumb-cap {
          grid-column: 1 / -1;
          min-height: 0;
        }
        @media (min-width: 760px) {
          .pdp .thumb-row {
            grid-template-columns: 1fr 1fr 1fr;
            height: 150px;
          }
          .pdp .thumb-row > .thumb { min-height: 0; }
          .pdp .thumb-row > .thumb-cap { grid-column: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pdp * { transition: none !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding:
            "clamp(20px,4vw,40px) clamp(16px,3vw,44px) clamp(48px,6vw,72px)",
        }}
      >
        {/* 1) BREADCRUMB */}
        <nav
          aria-label={copy.breadcrumbLabel}
          style={{
            fontFamily: F_KARLA,
            fontWeight: 400,
            fontSize: "12.5px",
            color: MUTED,
          }}
        >
          <Link href="/shop" style={{ color: MUTED, textDecoration: "none" }}>
            {copy.breadcrumb}
          </Link>
          <span style={{ color: SLASH, margin: "0 7px" }}>/</span>
          <span style={{ color: INK, fontWeight: 700 }}>{product.name}</span>
        </nav>

        {/* 2) MAIN SPLIT */}
        <div
          style={{
            marginTop: "clamp(18px,2.4vw,28px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(24px,3vw,40px)",
            alignItems: "start",
          }}
        >
          {/* LEFT — GALLERY QUILT */}
          <div
            style={seam({
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            })}
          >
            {/* hero */}
            <div
              style={{
                position: "relative",
                minHeight: "min(520px, 60vw)",
                background: WARM_CREAM,
              }}
            >
              <Image
                src={product.image}
                alt={product.alt}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 640px"
                style={{ objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "18px",
                  background: MUSTARD,
                  border: `1.5px solid ${INK}`,
                  padding: "9px 15px",
                  fontFamily: F_BITTER,
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: INK,
                  transform: "rotate(-2deg)",
                }}
              >
                {copy.illustration}
              </span>
            </div>

            {/* thumb row */}
            <div className="thumb-row">
              <div className="thumb">
                <Image
                  src="/assets/about-raw-coffee.jpg"
                  alt={copy.rawAlt}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="thumb">
                <Image
                  src="/assets/perija-hero.jpg"
                  alt={copy.mountainAlt}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="thumb-cap"
                style={{
                  background: OLIVE,
                  color: ON_DARK,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: F_BITTER,
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: "22px",
                    lineHeight: 1,
                  }}
                >
                  {product.process}
                </span>
                <span
                  style={{
                    marginTop: "6px",
                    fontFamily: F_KARLA,
                    fontSize: "13px",
                    lineHeight: 1.4,
                  }}
                >
                  {product.dryingNote}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — INFO COLUMN */}
          <div
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "26px",
            }}
          >
            {/* a) eyebrow */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span
                style={{
                  fontFamily: F_MONO,
                  fontWeight: 700,
                  fontSize: "10.5px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: TERRACOTTA,
                }}
              >
                {product.origin} · {product.altitude}
              </span>

              {/* b) H1 */}
              <h1
                style={{
                  margin: 0,
                  fontFamily: F_BITTER,
                  fontWeight: 800,
                  fontSize: "clamp(38px, 6vw, 62px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                  color: INK,
                }}
              >
                {product.name}
              </h1>

              {/* c) paragraph */}
              <p
                style={{
                  margin: 0,
                  maxWidth: "44ch",
                  fontFamily: F_KARLA,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: BODY_INK,
                }}
              >
                {product.description}
              </p>

              {/* d) price row — no real prices yet */}
              <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: WARM_CREAM,
                    border: `1.5px solid ${INK}`,
                    padding: "7px 12px",
                    color: INK,
                  }}
                >
                  {copy.price}
                </span>
                <span
                  style={{
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: MUTED,
                  }}
                >
                  {product.weight} · {product.grind === "Malt" ? copy.ground : copy.wholeBean}
                </span>
              </p>
            </div>

            {/* e) I KOPPEN — flavour spectrum, when we have real data for this lot */}
            {product.flavourSpectrum ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={label}>{copy.inCup}</span>
                <div
                  style={{
                    display: "flex",
                    height: "52px",
                    border: `2px solid ${INK}`,
                    overflow: "hidden",
                  }}
                >
                  {product.flavourSpectrum.map((seg, i) => (
                    <div
                      key={seg.label}
                      style={{
                        flexGrow: seg.pct,
                        flexBasis: 0,
                        minWidth: 0,
                        background: seg.bg,
                        color: seg.tone === "ink" ? INK : ON_DARK,
                        borderLeft: i === 0 ? "none" : `2px solid ${INK}`,
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "6px 8px",
                        fontFamily: F_BITTER,
                        fontWeight: 800,
                        fontStyle: "italic",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {seg.label}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={label}>{copy.inCup}</span>
                <p
                  style={{
                    margin: 0,
                    background: WARM_CREAM,
                    border: `1.5px solid ${INK}`,
                    padding: "14px 16px",
                    fontSize: "14px",
                    lineHeight: 1.55,
                    color: BODY_INK,
                  }}
                >
                  {copy.profileBefore}{" "}
                  <Link href="/sporbarhet" style={{ color: TERRACOTTA, fontWeight: 700 }}>
                    {copy.traceability}
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* f) FORMAT — fast per pose, ikke valgbart */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={label}>{copy.format}</span>
              <div
                style={seam({
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                })}
              >
                <div style={{ background: MUSTARD, padding: "15px 16px" }}>
                  <p style={{ margin: 0, fontFamily: F_BITTER, fontWeight: 600, fontSize: "15px", color: INK }}>
                    {product.grind === "Malt" ? copy.ground : copy.wholeBean}
                  </p>
                </div>
                <div style={{ background: CREAM, padding: "15px 16px" }}>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.4, color: BODY_INK }}>
                    {grindNote}
                  </p>
                </div>
              </div>
            </div>

            {/* g) under-construction notice — replaces kjøp/legg i kurv */}
            <div
              style={seam({
                display: "flex",
                flexDirection: "column",
              })}
            >
              <div style={{ background: MUSTARD, padding: "18px 20px" }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: F_BITTER,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: INK,
                  }}
                >
                  {copy.construction}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: INK }}>
                  {copy.constructionBody}
                </p>
              </div>
              <Link
                href="/contact"
                className="on-dark btn"
                style={{
                  background: INK,
                  color: ON_DARK,
                  padding: "16px 20px",
                  textAlign: "center",
                  fontFamily: F_MONO,
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {copy.contact}
              </Link>
            </div>

            {/* i) trust strip */}
            <div style={seam({ display: "flex", flexWrap: "wrap" })}>
              {[
                { t: copy.trust[0], bg: ORANGE, fg: INK },
                { t: copy.trust[1], bg: MUSTARD, fg: INK },
                { t: copy.trust[2], bg: TEAL, fg: ON_DARK },
              ].map((c) => (
                <span
                  key={c.t}
                  style={{
                    flex: "1 1 140px",
                    background: c.bg,
                    color: c.fg,
                    padding: "13px 14px",
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "10.5px",
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                  }}
                >
                  {c.t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3) SPEC STRIP */}
        <div
          style={seam({
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          })}
        >
          {[
            { l: copy.specs[0], v: product.farm },
            { l: copy.specs[1], v: product.variety },
            { l: copy.specs[2], v: product.processDetail },
            { l: copy.specs[3], v: product.roastDetail },
          ].map((s) => (
            <div key={s.l} style={{ background: CREAM, padding: "22px 20px" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: F_MONO,
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {s.l}
              </p>
              <p
                style={{
                  margin: "6px 0 0",
                  fontFamily: F_BITTER,
                  fontWeight: 800,
                  fontSize: "19px",
                  color: INK,
                }}
              >
                {s.v}
              </p>
            </div>
          ))}
        </div>

        {/* 4) LOWER SPLIT */}
        <div
          style={{
            paddingTop: "56px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(24px,3vw,40px)",
          }}
        >
          {/* LEFT — Bryggeforslag */}
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: "0 0 18px",
                fontFamily: F_BITTER,
                fontWeight: 800,
                fontSize: "34px",
                letterSpacing: "-0.025em",
                color: INK,
              }}
            >
              {copy.brewTitle}
            </h2>
            <div style={seam({ display: "flex", flexDirection: "column" })}>
              {[
                { l: copy.brewRows[0], v: product.brew.dose },
                { l: copy.brewRows[1], v: product.brew.water },
                { l: copy.brewRows[2], v: product.brew.time },
              ].map((r) => (
                <div
                  key={r.l}
                  style={{
                    background: CREAM,
                    padding: "15px 18px",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontFamily: F_KARLA, fontSize: "15px", color: BODY_INK }}>
                    {r.l}
                  </span>
                  <span
                    style={{
                      fontFamily: F_MONO,
                      fontWeight: 700,
                      fontSize: "13px",
                      color: INK,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  background: MUSTARD,
                  padding: "15px 18px",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: F_BITTER,
                    fontWeight: 600,
                    fontSize: "15px",
                    color: INK,
                  }}
                >
                  {copy.recommended}
                </span>
                <span
                  style={{
                    fontFamily: F_BITTER,
                    fontWeight: 600,
                    fontSize: "15px",
                    color: INK,
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.brew.recommended}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — same mountain range panel */}
          <div
            style={{
              minWidth: 0,
              background: TERRACOTTA,
              color: ON_DARK,
              padding: "32px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: F_MONO,
                fontWeight: 700,
                fontSize: "10.5px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFF1E8",
              }}
            >
              {copy.sameRange}
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: F_BITTER,
                fontWeight: 800,
                fontStyle: "italic",
                fontSize: "clamp(24px, 3.2vw, 30px)",
                lineHeight: 1.05,
                color: ON_DARK,
              }}
            >
              {copy.familyTitle}
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: "34ch",
                fontFamily: F_KARLA,
                fontSize: "15px",
                lineHeight: 1.6,
                color: ON_DARK,
              }}
            >
              {copy.familyBody}
            </p>
            <Link
              href="/shop"
              className="on-dark btn"
              style={{
                alignSelf: "flex-start",
                background: INK,
                color: ON_DARK,
                padding: "14px 22px",
                fontFamily: F_MONO,
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {copy.allProducts}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
