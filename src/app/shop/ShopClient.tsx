"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { products, type Product } from "@/data/products";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeProducts } from "@/i18n/products";

/* ── Tokens (modern patchwork) ─────────────────────────── */
const CREAM = "#FDF1E5";
const INK = "#2E2018";
const DARK_BROWN = "#3B2A20";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const GRINDS = ["Hele bønner", "Malt"];
const GRADES: Product["grade"][] = ["Excelso", "Especial"];
const HEADER_TONES = [OLIVE, TEAL];

const SHOP_COPY = {
  no: {
    eyebrow: (count: number) => `Butikk · ${count} produkter`,
    title: "All kaffen vår",
    lead: "Mikropartier fra Serranía del Perijá. Hele bønner eller malt kaffe — samme kaffe, tilpasset bryggemetoden din.",
    format: "Format",
    quality: "Kvalitet",
    wholeBean: "Hele bønner",
    ground: "Malt kaffe",
    reset: "Nullstill filtre",
    showing: (shown: number, total: number) => `Viser ${shown} av ${total}`,
    empty: "Ingen kaffe matcher filtrene. Prøv en annen kombinasjon.",
    price: "Pris kommer",
    cta: "Se partiet",
  },
  en: {
    eyebrow: (count: number) => `Shop · ${count} products`,
    title: "All our coffee",
    lead: "Microlots from Serranía del Perijá. Whole bean or ground — the same coffee, prepared for your brewing method.",
    format: "Format",
    quality: "Quality",
    wholeBean: "Whole bean",
    ground: "Ground coffee",
    reset: "Reset filters",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    empty: "No coffee matches these filters. Try another combination.",
    price: "Price coming soon",
    cta: "View the lot",
  },
  es: {
    eyebrow: (count: number) => `Tienda · ${count} productos`,
    title: "Todo nuestro café",
    lead: "Microlotes de la Serranía del Perijá. En grano o molido: el mismo café, adaptado a tu método de preparación.",
    format: "Formato",
    quality: "Calidad",
    wholeBean: "En grano",
    ground: "Café molido",
    reset: "Restablecer filtros",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    empty: "Ningún café coincide con los filtros. Prueba otra combinación.",
    price: "Precio próximamente",
    cta: "Ver el lote",
  },
} as const;

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const CSS = `
.shop { background:${CREAM}; color:#4A382C; font-family:${F_KARLA}; }
.shop a { color:${TERRA}; text-decoration:none; }
.shop a:hover { color:${INK}; }
.shop *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }

.shop-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.2em; text-transform:uppercase; }
.shop-kicker { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; }
.shop-cover { object-fit:cover; transition:transform .5s ease; }
.shop-card:hover .shop-cover { transform:scale(1.06); }

/* header band */
.shop-hd { background:${DARK_BROWN}; border-bottom:2px solid ${INK}; padding-top:56px; padding-bottom:44px; }
.shop-hd h1 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(34px,4.4vw,52px); line-height:1; letter-spacing:-.03em; color:${CREAM}; }
.shop-hd p { margin:16px 0 0; max-width:56ch; font-size:16px; line-height:1.6; color:rgba(253,241,229,.78); }

/* layout */
.shop-layout { padding-top:44px; padding-bottom:72px; display:grid; grid-template-columns:264px 1fr; gap:40px; align-items:start; }

/* sidebar */
.shop-side { display:flex; flex-direction:column; gap:2px; }
.shop-grp { background:${CREAM}; border:2px solid ${INK}; padding:20px; }
.shop-grp .shop-eyebrow { color:rgba(74,56,44,.5); margin-bottom:14px; }
.shop-chipcol { display:flex; flex-direction:column; gap:2px; }
.shop-chipwrap { display:flex; flex-wrap:wrap; gap:6px; }
.shop-chip { border:2px solid ${INK}; padding:9px 12px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.04em; background:${CREAM}; color:${INK}; cursor:pointer; text-align:left; transition:background-color .15s ease; }
.shop-chip--on { background:${MUSTARD}; }
.shop-reset { margin-top:4px; align-self:flex-start; background:none; border:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:${TERRA}; border-bottom:2px solid ${TERRA}; padding:0 0 2px; cursor:pointer; }
.shop-reset:hover { color:${INK}; border-color:${INK}; }

/* grid */
.shop-meta { margin:0 0 18px; font-size:13px; color:rgba(74,56,44,.6); }
.shop-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:24px; }
.shop-card { border:2px solid ${INK}; background:${CREAM}; display:flex; flex-direction:column; }
.shop-card-hd { padding:12px 16px; display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:6px 10px; border-bottom:2px solid ${INK}; }
.shop-card-hd a, .shop-card-hd a:hover { color:inherit; }
.shop-card-hd a:hover { opacity:.8; }
.shop-card-hd h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:20px; }
.shop-card-hd .shop-kicker { flex:none; }
.shop-card-photo { position:relative; aspect-ratio:1000/735; border-bottom:2px solid ${INK}; background:#F7ECDE; overflow:hidden; }
.shop-card-body { padding:14px 16px; border-bottom:2px solid ${INK}; }
.shop-card-body .shop-kicker { color:rgba(74,56,44,.55); }
.shop-card-body p { margin:8px 0 0; font-size:13.5px; line-height:1.5; color:rgba(74,56,44,.78); }
.shop-card-foot { padding:13px 16px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; }
.shop-card-foot .price { font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:rgba(74,56,44,.55); white-space:nowrap; }
.shop-cta { font-family:${F_MONO}; flex-shrink:0; white-space:nowrap; text-decoration:none; }

.shop-empty { border:2px solid ${INK}; background:${CREAM}; padding:60px 24px; text-align:center; color:rgba(74,56,44,.5); font-size:14px; }

@media (max-width:1360px) {
  .shop-grid { grid-template-columns:repeat(2, minmax(0,1fr)); }
}
@media (max-width:850px) {
  .shop-hd { padding-top:36px; padding-bottom:30px; }
  .shop-hd p { font-size:15px; }
  .shop-layout { padding-top:30px; padding-bottom:48px; display:flex; flex-direction:column; align-items:stretch; gap:28px; }
  .shop-chipwrap { gap:5px; }
  .shop-grid { grid-template-columns:1fr; gap:18px; }
}
@media (prefers-reduced-motion:reduce) { .shop a, .shop-chip, .shop-reset, .shop-cover { transition:none; } }
`;

export default function ShopClient() {
  const locale = useLocale();
  const copy = SHOP_COPY[locale];
  const [grinds, setGrinds] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const localizedProducts = useMemo(
    () => localizeProducts(products, locale),
    [locale],
  );

  const filtered = useMemo(
    () =>
      localizedProducts.filter(
        (p) =>
          (grinds.length === 0 || grinds.includes(p.grind)) &&
          (grades.length === 0 || grades.includes(p.grade))
      ),
    [grinds, grades, localizedProducts]
  );

  let toneIndex = 0;

  return (
    <div className="shop">
      <style>{CSS}</style>

      {/* header band */}
      <header className="shop-hd">
        <div className="container-page">
          <p className="shop-eyebrow" style={{ color: MUSTARD }}>
            {copy.eyebrow(products.length)}
          </p>
          <h1>{copy.title}</h1>
          <p>{copy.lead}</p>
        </div>
      </header>

      <div className="container-page shop-layout">
        {/* ── FILTER SIDEBAR ─────────────────────────────── */}
        <aside className="shop-side">
          <div className="shop-grp">
            <p className="shop-eyebrow">{copy.format}</p>
            <div className="shop-chipcol">
              {GRINDS.map((g) => {
                const active = grinds.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    className={`shop-chip${active ? " shop-chip--on" : ""}`}
                    onClick={() => setGrinds((prev) => toggle(prev, g))}
                  >
                    {g === "Malt" ? copy.ground : copy.wholeBean}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="shop-grp">
            <p className="shop-eyebrow">{copy.quality}</p>
            <div className="shop-chipcol">
              {GRADES.map((g) => {
                const active = grades.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    className={`shop-chip${active ? " shop-chip--on" : ""}`}
                    onClick={() => setGrades((prev) => toggle(prev, g))}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {(grinds.length > 0 || grades.length > 0) && (
            <button
              type="button"
              className="shop-reset"
              onClick={() => {
                setGrinds([]);
                setGrades([]);
              }}
            >
              {copy.reset}
            </button>
          )}
        </aside>

        {/* ── PRODUCT GRID ───────────────────────────────── */}
        <div>
          <p className="shop-meta">
            {copy.showing(filtered.length, products.length)}
          </p>

          {filtered.length === 0 ? (
            <div className="shop-empty">
              {copy.empty}
            </div>
          ) : (
            <div className="shop-grid">
              {filtered.map((product) => {
                const tone =
                  product.grade === "Especial"
                    ? MUSTARD
                    : HEADER_TONES[toneIndex++ % HEADER_TONES.length];
                const onTone = tone === MUSTARD ? INK : ON_DARK;

                return (
                  <ShopCard
                    key={product.id}
                    product={product}
                    tone={tone}
                    onTone={onTone}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShopCard({
  product,
  tone,
  onTone,
}: {
  product: Product;
  tone: string;
  onTone: string;
}) {
  const locale = useLocale();
  const copy = SHOP_COPY[locale];

  return (
    <div className="shop-card">
      <div className="shop-card-hd" style={{ background: tone, color: onTone }}>
        <Link href={`/shop/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <span className="shop-kicker">{product.grade}</span>
      </div>

      <Link href={`/shop/${product.slug}`} className="shop-card-photo">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="shop-cover"
          sizes="(max-width: 920px) 100vw, (max-width: 1200px) 45vw, 24vw"
        />
      </Link>

      <div className="shop-card-body">
        <span className="shop-kicker">
          {product.grind === "Malt" ? copy.ground : copy.wholeBean} · {product.weight}
        </span>
        <p>{product.notes}</p>
      </div>

      <div className="shop-card-foot">
        <span className="price">{copy.price}</span>
        <Link
          href={`/shop/${product.slug}`}
          className="shop-cta border-2 border-[#2E2018] bg-[#2E2018] text-[#FDF1E5] inline-flex items-center justify-center px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em]"
        >
          {copy.cta}
        </Link>
      </div>
    </div>
  );
}
