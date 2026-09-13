"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart, type CartItem } from "@/components/CartProvider";

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const PHOTO_CELL = "#F7ECDE";
const HAIRLINE = "#E2D2BF";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TERRA = "#A94B2F";
const DEEP_TERRA = "#8E3A2B";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
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

type Tone = "cream" | "ink";
const toneColor = (t: Tone) => (t === "ink" ? INK : ON_DARK);

/* Grade colour per known product; anything else derives from data. */
const NOTE_META: Record<string, { note: string; bg: string; tone: Tone }> = {
  "montana-hele-bonner": { note: "Excelso", bg: DEEP_TERRA, tone: "cream" },
  "montana-malt": { note: "Excelso", bg: DEEP_TERRA, tone: "cream" },
  "especial-hele-bonner": { note: "Especial", bg: MUSTARD, tone: "ink" },
  "especial-malt": { note: "Especial", bg: MUSTARD, tone: "ink" },
};

const findProduct = (item: CartItem) =>
  products.find((p) => p.id === item.id) ||
  (item.slug ? products.find((p) => p.slug === item.slug) : undefined);

function deriveLine(item: CartItem) {
  const p = findProduct(item);
  const meta = NOTE_META[item.id] ?? (p ? NOTE_META[p.id] : undefined);

  const seg = p?.flavourSpectrum?.[0];
  const note = meta?.note ?? p?.smaksprofil?.[0];
  const noteBg = meta?.bg ?? seg?.bg ?? DEEP_TERRA;
  const noteTone: Tone = meta?.tone ?? (seg?.tone === "ink" ? "ink" : "cream");

  const grind = item.grind ?? (p ? "Hele bønner" : undefined);
  const size = item.weight ?? p?.weight?.split(" / ")[0];

  const originLine = item.subscription
    ? "Abonnement · hver 4. uke"
    : p
    ? `${p.origin} · ${p.process.toLowerCase()}`
    : item.origin;

  return {
    note,
    noteBg,
    noteTone,
    grind,
    size,
    originLine,
    unitPrice: item.priceNum,
    lineTotal: item.priceNum * item.quantity,
  };
}

const CSS = `
.cart { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.cart *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.cart .on-dark:focus-visible { outline-color:${MUSTARD}; }
.cart button { cursor:pointer; }

.cart-inner { max-width:1300px; margin:0 auto; padding:clamp(24px,4vw,48px) clamp(16px,3vw,44px) 64px; }
.cart .eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:${MUTED}; }

.page-head { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:20px; }
.page-head h1 { margin:8px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(36px,5.5vw,56px); line-height:.95; letter-spacing:-.035em; color:${INK}; }

.steps { display:flex; flex-wrap:wrap; }
.step { display:flex; align-items:center; justify-content:center; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; padding:11px 16px; }

.layout { margin-top:clamp(28px,3.5vw,44px); display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap:clamp(24px,3vw,40px); align-items:start; }
.left-col { min-width:0; display:flex; flex-direction:column; gap:26px; }

.cart-block-head { background:${CREAM}; display:flex; flex-wrap:wrap; align-items:center; gap:12px; padding:12px 18px; }
.link-btn { border:none; background:transparent; padding:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:${TERRA}; }

.li { background:${CREAM}; padding:18px; display:grid; grid-template-columns:auto 1fr; column-gap:18px; row-gap:14px; align-items:start; grid-template-areas:"thumb body" ". controls"; }
.li--noimg { grid-template-columns:1fr; grid-template-areas:"body" "controls"; }
.li--noimg .li-thumb { display:none; }
.li-thumb { grid-area:thumb; align-self:center; width:clamp(96px,26vw,132px); aspect-ratio:1/1; box-sizing:border-box; position:relative; overflow:hidden; background:${PHOTO_CELL}; border:1.5px solid ${HAIRLINE}; }
.li-body { grid-area:body; min-width:0; display:flex; flex-direction:column; gap:12px; }
.li-controls { grid-area:controls; display:flex; flex-wrap:wrap; align-items:center; gap:16px; }
.li-titlerow { display:flex; flex-wrap:wrap; align-items:baseline; gap:8px 14px; }
.li-name { font-family:${F_BITTER}; font-weight:800; font-size:24px; color:${INK}; }
.li-total { font-family:${F_BITTER}; font-weight:800; font-size:20px; color:${INK}; white-space:nowrap; }
.li-strip { align-self:flex-start; max-width:100%; display:flex; flex-wrap:wrap; background:${INK}; border:1.5px solid ${INK}; gap:2px; }
.li-note { font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:12px; padding:5px 10px; white-space:nowrap; }
.li-tag { background:${WARM}; color:${INK}; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.06em; text-transform:uppercase; padding:5px 10px; white-space:nowrap; }
.li-origin { margin:0; font-family:${F_KARLA}; font-size:13.5px; line-height:1.45; color:${BODY}; }

.stepper { display:inline-flex; flex:none; background:${INK}; border:2px solid ${INK}; gap:2px; }
.step-btn { width:40px; height:44px; border:none; font-family:${F_MONO}; font-weight:700; font-size:15px; }
.step-val { min-width:40px; height:44px; display:grid; place-items:center; background:${CREAM}; color:${INK}; font-family:${F_MONO}; font-weight:700; font-size:14px; }
.li-unit { font-family:${F_KARLA}; font-size:12.5px; color:${MUTED}; white-space:nowrap; }
.remove-btn { flex:none; border:none; background:transparent; padding:0; min-height:44px; display:inline-flex; align-items:center; font-family:${F_KARLA}; font-size:12.5px; color:${TERRA}; text-decoration:underline; text-underline-offset:4px; }

.empty { background:${WARM}; border:2px solid ${INK}; padding:34px 30px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; }
.empty-copy { display:flex; flex-wrap:wrap; align-items:baseline; gap:6px 14px; min-width:0; }
.empty-title { font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:24px; color:${INK}; }
.empty-text { font-family:${F_KARLA}; font-size:15px; color:${BODY}; }
.btn-ink { display:inline-flex; align-items:center; justify-content:center; border:none; background:${INK}; color:${ON_DARK}; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.12em; text-transform:uppercase; padding:12px 18px; text-decoration:none; }
.continue { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:${TERRA}; text-decoration:none; }

.summary { min-width:0; position:sticky; top:24px; display:flex; flex-direction:column; }
.sum-olive { background:${OLIVE}; color:${ON_DARK}; padding:28px 26px; }
.sum-h2 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:28px; color:${ON_DARK}; }
.sum-rows { margin-top:16px; display:flex; flex-direction:column; gap:10px; }
.sum-row { display:flex; justify-content:space-between; gap:12px; }
.sum-row-label { font-family:${F_KARLA}; font-size:15px; color:${ON_DARK}; }
.sum-row-value { font-family:${F_MONO}; font-weight:700; font-size:13px; color:${ON_DARK}; }
.sum-divider { height:2px; background:${ON_DARK}; margin:6px 0; }
.sum-totalrow { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
.sum-total { font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:30px; }
.summary-checkout { border:none; background:${INK}; color:${ON_DARK}; padding:22px 26px; font-family:${F_MONO}; font-weight:700; font-size:12px; letter-spacing:.14em; text-transform:uppercase; }
.reassure { background:${TERRA}; color:${ON_DARK}; padding:18px 26px; font-family:${F_KARLA}; font-size:13px; }

.sticky-bar { display:none; }

@media (max-width: 640px) {
  .cart-inner { padding:20px 16px 24px; }
  .page-head { flex-direction:column; align-items:stretch; gap:16px; }
  .page-head h1 { font-size:38px; }
  .steps { width:100%; }
  .step { flex:1; padding:12px 6px; font-size:9.5px; letter-spacing:.12em; }
  .layout { margin-top:22px; gap:22px; }
  .cart .eyebrow { font-size:9.5px; }
  .link-btn { font-size:9.5px; }
  .cart-block-head { padding:11px 14px; }
  .li { padding:14px; column-gap:13px; row-gap:11px; grid-template-areas:"thumb body" "controls controls"; }
  .li--noimg { grid-template-columns:1fr; grid-template-areas:"body" "controls"; }
  .li-thumb { align-self:start; width:72px; }
  .li-body { gap:8px; }
  .li-name { font-size:19px; }
  .li-total { font-size:16px; }
  .li-strip { flex-wrap:nowrap; overflow:hidden; }
  .li-note { font-size:10px; padding:3px 7px; }
  .li-tag { font-size:8.5px; padding:3px 7px; letter-spacing:.03em; }
  .li-origin { font-size:12px; line-height:1.4; }
  .li-controls { gap:10px; flex-wrap:nowrap; }
  .step-btn { width:38px; height:44px; }
  .step-val { min-width:34px; height:44px; }
  .li-unit { font-size:11px; }
  .li-unit .stk { display:none; }
  .empty { flex-direction:column; align-items:stretch; padding:26px 20px; gap:14px; }
  .empty-title { font-size:21px; }
  .empty-text { font-size:14px; }
  .empty .btn-ink { width:100%; padding:16px; }
  .sum-olive { padding:22px 20px; }
  .sum-h2 { font-size:23px; }
  .sum-row-label { font-size:14px; }
  .sum-row-value { font-size:12px; }
  .sum-total { font-size:26px; }
  .reassure { padding:15px 20px; font-size:12.5px; }
  .summary { position:static; top:auto; }
  .summary-checkout { display:none; }
  .sticky-bar { display:flex; }
}

@media (max-width: 860px) {
  .summary { position:static; top:auto; }
}

@media (prefers-reduced-motion: reduce) { .cart * { transition:none !important; } }
`;

/* ── Page ──────────────────────────────────────────────────────── */
export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const count = items.reduce((s, i) => s + i.quantity, 0);

  const { subtotal, discount, total } = useMemo(() => {
    const sub = items.reduce((s, i) => s + (i.listPriceNum ?? i.priceNum) * i.quantity, 0);
    const disc = items.reduce(
      (s, i) => s + ((i.listPriceNum ?? i.priceNum) - i.priceNum) * i.quantity,
      0
    );
    return { subtotal: sub, discount: disc, total: sub - disc };
  }, [items]);

  return (
    <div className="cart">
      <style>{CSS}</style>

      <div className="cart-inner">
        {/* ── PAGE HEAD ─────────────────────────────────────── */}
        <div className="page-head">
          <div>
            <p className="eyebrow">Steg 1 av 3 · Kurv</p>
            <h1>Handlekurv</h1>
          </div>

          <div className="steps" style={seam()}>
            {([
              ["Kurv", true],
              ["Levering", false],
              ["Betaling", false],
            ] as const).map(([label, active]) => (
              <span
                key={label}
                className="step"
                style={{
                  background: active ? INK : CREAM,
                  color: active ? ON_DARK : MUTED,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── LAYOUT ────────────────────────────────────────── */}
        <div className="layout">
          {/* ── LEFT COLUMN ─────────────────────────────────── */}
          <div className="left-col">
            {items.length > 0 ? (
              <div style={seam({ display: "flex", flexDirection: "column" })}>
                {/* header */}
                <div className="cart-block-head">
                  <span className="eyebrow">
                    {count === 1 ? "1 vare i kurven" : `${count} varer i kurven`}
                  </span>
                  <span style={{ flex: 1 }} />
                  <button className="link-btn" onClick={clearCart}>
                    Tøm kurv
                  </button>
                </div>

                {/* line items */}
                {items.map((item) => {
                  const v = deriveLine(item);
                  return (
                    <div key={item.id} className={item.image ? "li" : "li li--noimg"}>
                      {/* thumbnail — omitted entirely when there is no image */}
                      {item.image && (
                        <div className="li-thumb">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 72px, 132px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}

                      {/* body: title + attributes + origin */}
                      <div className="li-body">
                        <div className="li-titlerow">
                          <span className="li-name">{item.name}</span>
                          <span style={{ flex: 1 }} />
                          <span className="li-total">{v.lineTotal} NOK</span>
                        </div>

                        {(v.note || v.grind || v.size) && (
                          <div className="li-strip">
                            {v.note && (
                              <span
                                className="li-note"
                                style={{ background: v.noteBg, color: toneColor(v.noteTone) }}
                              >
                                {v.note}
                              </span>
                            )}
                            {[v.grind, v.size].filter(Boolean).map((t) => (
                              <span key={t} className="li-tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="li-origin">{v.originLine}</p>
                      </div>

                      {/* controls */}
                      <div className="li-controls">
                        <div className="stepper">
                          <button
                            aria-label={`Færre ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            disabled={item.quantity <= 1}
                            className="step-btn"
                            style={{
                              background: item.quantity <= 1 ? WARM : CREAM,
                              color: item.quantity <= 1 ? MUTED : INK,
                            }}
                          >
                            −
                          </button>
                          <span aria-hidden className="step-val">
                            {item.quantity}
                          </span>
                          <button
                            aria-label={`Flere ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, Math.min(9, item.quantity + 1))
                            }
                            disabled={item.quantity >= 9}
                            className="step-btn"
                            style={{
                              background: item.quantity >= 9 ? WARM : CREAM,
                              color: item.quantity >= 9 ? MUTED : INK,
                            }}
                          >
                            +
                          </button>
                        </div>

                        <span className="li-unit">
                          {v.unitPrice} NOK<span className="stk"> / stk</span>
                        </span>
                        <span style={{ flex: 1 }} />
                        <button className="remove-btn" onClick={() => removeItem(item.id)}>
                          Fjern
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── EMPTY STATE ──────────────────────────────── */
              <div className="empty">
                <div className="empty-copy">
                  <span className="empty-title">Kurven er tom</span>
                  <span className="empty-text">
                    Fire partier venter fra samme fjellkjede.
                  </span>
                </div>
                <Link href="/shop" className="btn-ink on-dark">
                  Se all kaffe
                </Link>
              </div>
            )}

            {/* ── CONTINUE ───────────────────────────────────── */}
            <Link href="/shop" className="continue">
              ← Fortsett å handle
            </Link>
          </div>

          {/* ── RIGHT COLUMN ───────────────────────────────── */}
          <div className="summary" style={seam({ display: "flex", flexDirection: "column" })}>
            {/* a) summary */}
            <div className="sum-olive">
              <h2 className="sum-h2">Oppsummering</h2>
              <div className="sum-rows" aria-live="polite">
                <div className="sum-row">
                  <span className="sum-row-label">Delsum</span>
                  <span className="sum-row-value">{subtotal} NOK</span>
                </div>
                {discount > 0 && (
                  <div className="sum-row">
                    <span className="sum-row-label">Rabatt</span>
                    <span className="sum-row-value">−{discount} NOK</span>
                  </div>
                )}
                <div className="sum-divider" />
                <div className="sum-totalrow">
                  <span className="sum-total">Totalt</span>
                  <span className="sum-total">{total} NOK</span>
                </div>
              </div>
            </div>

            {/* b) checkout (desktop only — mobile uses the sticky bar) */}
            <button
              type="button"
              className="summary-checkout on-dark"
              disabled={items.length === 0}
              style={{ opacity: items.length === 0 ? 0.5 : 1 }}
            >
              Til kassen · {total} NOK
            </button>

            {/* c) reassurance */}
            <div className="reassure">
              Vipps · kort · Klarna. Ristet mandag, sendt samme uke.
            </div>
          </div>
        </div>

        {/* ── STICKY CHECKOUT BAR (mobile only) ─────────────── */}
        {items.length > 0 && (
          <div
            className="sticky-bar"
            style={{
              position: "sticky",
              bottom: 0,
              zIndex: 20,
              boxSizing: "border-box",
              margin: "24px -16px 0",
              background: CREAM,
              borderTop: `2px solid ${INK}`,
              padding: "12px 16px calc(16px + env(safe-area-inset-bottom))",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span
                style={{
                  fontFamily: F_MONO,
                  fontWeight: 700,
                  fontSize: "9.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                Totalt
              </span>
              <span style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: F_BITTER,
                  fontWeight: 800,
                  fontSize: "20px",
                  color: INK,
                }}
              >
                {total} NOK
              </span>
            </div>
            <button
              type="button"
              className="on-dark"
              style={{
                width: "100%",
                border: "none",
                background: INK,
                color: ON_DARK,
                padding: "20px",
                fontFamily: F_MONO,
                fontWeight: 700,
                fontSize: "11.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Til kassen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
