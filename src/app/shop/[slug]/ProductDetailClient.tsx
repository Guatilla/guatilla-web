"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

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
const DEEP_TERRACOTTA = "#8E3A2B";
const MUSTARD = "#DDA83A";
const ORANGE = "#E8862A";
const OLIVE = "#5C7148";
const RED = "#B22F35";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const GRINDS = ["Hele bønner", "Filter", "Espresso", "Presskanne"];

const BATCH_NOTES: { label: string; bg: string; tone: string }[] = [
  { label: "Kakao", bg: DEEP_TERRACOTTA, tone: ON_DARK },
  { label: "Fruktig", bg: MUSTARD, tone: INK },
  { label: "Floral", bg: RED, tone: ON_DARK },
  { label: "Fyldig", bg: OLIVE, tone: ON_DARK },
];

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
  const { addItem } = useCart();
  const uid = useId();

  const [grind, setGrind] = useState(GRINDS[0]);
  const [subscription, setSubscription] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const subPrice = product.priceNum - Math.round(product.priceNum * 0.15);
  const shownPrice = subscription ? subPrice : product.priceNum;
  const unit = product.weight.split(" / ")[0];

  const handleAdd = () => {
    for (let n = 0; n < qty; n += 1) {
      addItem({
        id: product.id,
        name: product.name,
        origin: product.origin,
        price: product.price,
        priceNum: shownPrice,
        listPriceNum: product.priceNum,
        currency: product.currency,
        image: product.image,
        slug: product.slug,
        grind,
        weight: unit,
        subscription,
      });
    }
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="pdp"
      style={{ background: CREAM, color: BODY_INK, fontFamily: F_KARLA }}
    >
      <style>{`
        .pdp *:focus-visible { outline: 2px solid ${INK}; outline-offset: 2px; }
        .pdp .on-dark:focus-visible { outline-color: ${MUSTARD}; }
        .pdp button { cursor: pointer; }
        .pdp .radio { transition: background-color .14s ease, color .14s ease; }
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
                alt={`${product.name} ${unit} bag`}
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
                nyristet · {product.week}
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

          {/* RIGHT — BUY COLUMN */}
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

              {/* d) price row */}
              <p style={{ margin: 0, display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: F_BITTER,
                    fontWeight: 800,
                    fontSize: "34px",
                    color: INK,
                  }}
                >
                  {shownPrice} NOK
                </span>
                <span
                  style={{
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: MUTED,
                  }}
                >
                  / {unit}
                </span>
              </p>
            </div>

            {/* e) I KOPPEN — flavour spectrum */}
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

            {/* f) MALING — grind radio group */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={label}>Maling</span>
              <div
                role="radiogroup"
                aria-label="Maling"
                style={seam({
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
                })}
              >
                {GRINDS.map((g) => {
                  const on = grind === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setGrind(g)}
                      className="radio"
                      style={{
                        border: "none",
                        textAlign: "left",
                        padding: "15px 16px",
                        fontFamily: F_BITTER,
                        fontWeight: 600,
                        fontSize: "15px",
                        background: on ? MUSTARD : CREAM,
                        color: INK,
                      }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* g) KJØP SOM — plan radio group */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={label}>Kjøp som</span>
              <div
                role="radiogroup"
                aria-label="Kjøp som"
                style={seam({ display: "flex", flexDirection: "column" })}
              >
                {[
                  { key: false, name: "Engangskjøp", price: `${product.priceNum} NOK` },
                  {
                    key: true,
                    name: "Abonnement, hver 4. uke",
                    price: `${subPrice} NOK · −15 %`,
                  },
                ].map((opt) => {
                  const on = subscription === opt.key;
                  return (
                    <button
                      key={String(opt.key)}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setSubscription(opt.key)}
                      className={`radio${on ? " on-dark" : ""}`}
                      style={{
                        border: "none",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "15px 16px",
                        background: on ? OLIVE : CREAM,
                        color: on ? ON_DARK : INK,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F_BITTER,
                          fontWeight: 600,
                          fontSize: "15px",
                        }}
                      >
                        {opt.name}
                      </span>
                      <span
                        style={{
                          fontFamily: F_MONO,
                          fontWeight: 700,
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* h) action row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <div
                role="group"
                aria-label="Antall"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `2px solid ${INK}`,
                }}
              >
                <button
                  type="button"
                  aria-label="Færre"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={stepBtn}
                >
                  −
                </button>
                <span
                  aria-hidden="true"
                  style={{
                    minWidth: "34px",
                    textAlign: "center",
                    fontFamily: F_MONO,
                    fontWeight: 700,
                    fontSize: "15px",
                    color: INK,
                  }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Flere"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  style={stepBtn}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                aria-describedby={`${uid}-live`}
                className="on-dark"
                style={{
                  flex: "1 1 180px",
                  height: "60px",
                  border: "none",
                  background: INK,
                  color: ON_DARK,
                  fontFamily: F_MONO,
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {added ? "Lagt i kurv ✓" : "Legg i kurv"}
              </button>
              <p
                id={`${uid}-live`}
                aria-live="polite"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                {added ? `${qty} × ${product.name} lagt i kurv` : ""}
              </p>
            </div>

            {/* i) trust strip */}
            <div style={seam({ display: "flex", flexWrap: "wrap" })}>
              {[
                { t: "Ristet hver mandag", bg: ORANGE, fg: INK },
                { t: "Sendes innen 2 dager", bg: MUSTARD, fg: INK },
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
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
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
              Fire partier, ett teppe
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
              {product.name} er én av fire lapper fra Serranía del Perijá.
              Abonnementet syr dem sammen — et nytt parti hver måned.
            </p>
            <div style={seam({ display: "flex", flexWrap: "wrap" })}>
              {BATCH_NOTES.map((n) => (
                <span
                  key={n.label}
                  style={{
                    flex: "1 1 96px",
                    background: n.bg,
                    color: n.tone,
                    padding: "12px 12px",
                    fontFamily: F_BITTER,
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: "13px",
                  }}
                >
                  {n.label}
                </span>
              ))}
            </div>
            <Link
              href="/shop"
              className="on-dark"
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
              Se abonnementet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const stepBtn: React.CSSProperties = {
  width: "46px",
  height: "56px",
  border: "none",
  background: "transparent",
  fontFamily: F_MONO,
  fontWeight: 700,
  fontSize: "18px",
  color: INK,
  lineHeight: 1,
};
