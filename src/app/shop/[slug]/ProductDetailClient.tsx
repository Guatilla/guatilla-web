"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

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

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const grindNote =
    product.grind === "Malt"
      ? "Vi tilpasser malingsgrad (filter, press, espresso) ved bestilling."
      : "Hele bønner — mal selv rett før trakting for best resultat.";

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
          aria-label="Sti"
          style={{
            fontFamily: F_KARLA,
            fontWeight: 400,
            fontSize: "12.5px",
            color: MUTED,
          }}
        >
          <Link href="/shop" style={{ color: MUTED, textDecoration: "none" }}>
            Kaffe
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
                illustrasjonsbilde
              </span>
            </div>

            {/* thumb row */}
            <div className="thumb-row">
              <div className="thumb">
                <Image
                  src="/assets/about-raw-coffee.jpg"
                  alt="Grønne kaffebønner"
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="thumb">
                <Image
                  src="/assets/perija-hero.jpg"
                  alt="Fjellkjeden Serranía del Perijá"
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
                  Pris kommer
                </span>
                <span
                  style={{
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: MUTED,
                  }}
                >
                  {product.weight} · {product.grind}
                </span>
              </p>
            </div>

            {/* e) I KOPPEN — flavour spectrum, when we have real data for this lot */}
            {product.flavourSpectrum ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={label}>I koppen</span>
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
                <span style={label}>I koppen</span>
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
                  Full smaksprofil og cupping-score for dette partiet
                  publiseres per lotnummer under{" "}
                  <Link href="/sporbarhet" style={{ color: TERRACOTTA, fontWeight: 700 }}>
                    Sporbarhet
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* f) FORMAT — fast per pose, ikke valgbart */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={label}>Format</span>
              <div
                style={seam({
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                })}
              >
                <div style={{ background: MUSTARD, padding: "15px 16px" }}>
                  <p style={{ margin: 0, fontFamily: F_BITTER, fontWeight: 600, fontSize: "15px", color: INK }}>
                    {product.grind}
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
                  🚧 Nettbutikken er under oppbygging
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: INK }}>
                  Det er ennå ikke mulig å bestille dette partiet online.
                  Ta kontakt så hjelper vi deg i mellomtiden.
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
                Ta kontakt
              </Link>
            </div>

            {/* i) trust strip */}
            <div style={seam({ display: "flex", flexWrap: "wrap" })}>
              {[
                { t: "Ristes på bestilling", bg: ORANGE, fg: INK },
                { t: "Sporbar til lotnummer", bg: MUSTARD, fg: INK },
                { t: "Direktekjøpt parti", bg: TEAL, fg: ON_DARK },
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
            { l: "Gård", v: product.farm },
            { l: "Varietet", v: product.variety },
            { l: "Prosess", v: product.processDetail },
            { l: "Brenning", v: product.roastDetail },
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
              Bryggeforslag
            </h2>
            <div style={seam({ display: "flex", flexDirection: "column" })}>
              {[
                { l: "Dose", v: product.brew.dose },
                { l: "Vann", v: product.brew.water },
                { l: "Tid", v: product.brew.time },
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
                  Anbefalt
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
              Fra samme fjellkjede
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
              Fire produkter, samme fjellkjede
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
              {product.name} er ett av fire produkter fra Serranía del
              Perijá — se resten av sortimentet mens vi bygger butikken.
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
              Se hele sortimentet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
