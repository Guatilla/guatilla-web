"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  localizeCatalogProducts,
  localizeGrind,
  localizeVariantName,
} from "@/i18n/products";
import { formatNok } from "@/lib/money";
import { getVariantDisplaySlot } from "@/lib/catalogImages";
import type {
  StorefrontCatalogProduct,
  StorefrontCatalogVariant,
} from "@/types/catalog";

const CARD_TONES = ["#dda83a", "#205654", "#5c7148", "#cf6549"] as const;

interface CatalogListing {
  product: StorefrontCatalogProduct;
  variant: StorefrontCatalogVariant;
  toneIndex: number;
}

const COPY = {
  no: {
    eyebrow: "Butikk",
    title: "All kaffen vår",
    lead: "Publiserte produkter og tilgjengelige varianter fra vårt offisielle katalog.",
    category: "Kategori",
    grind: "Maling",
    weight: "Vekt",
    all: "Alle",
    reset: "Nullstill filtre",
    showing: (shown: number, total: number) => `Viser ${shown} av ${total}`,
    noMatch: "Ingen produkter samsvarer med filtrene.",
    coming: "Salget åpner snart",
    comingBody: "Vi klargjør katalogen. Kom tilbake snart for å se publiserte produkter.",
    unavailable: "Katalogen er midlertidig utilgjengelig",
    unavailableBody: "Vi får ikke kontakt med katalogtjenesten akkurat nå. Prøv igjen litt senere.",
    add: "Legg i kurven",
    added: "Lagt i kurven",
    soldOut: "Utsolgt",
  },
  en: {
    eyebrow: "Shop",
    title: "All our coffee",
    lead: "Published products and available variants from our official catalogue.",
    category: "Category",
    grind: "Grind",
    weight: "Weight",
    all: "All",
    reset: "Reset filters",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    noMatch: "No products match these filters.",
    coming: "Sales coming soon",
    comingBody: "We are preparing the catalogue. Come back soon to see published products.",
    unavailable: "The catalogue is temporarily unavailable",
    unavailableBody: "We cannot reach the catalogue service right now. Please try again shortly.",
    add: "Add to cart",
    added: "Added to cart",
    soldOut: "Sold out",
  },
  es: {
    eyebrow: "Tienda",
    title: "Todo nuestro café",
    lead: "Productos publicados y variantes disponibles de nuestro catálogo oficial.",
    category: "Categoría",
    grind: "Molienda",
    weight: "Peso",
    all: "Todas",
    reset: "Restablecer filtros",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    noMatch: "Ningún producto coincide con los filtros.",
    coming: "Venta próximamente",
    comingBody: "Estamos preparando el catálogo. Vuelve pronto para ver los productos publicados.",
    unavailable: "El catálogo no está disponible temporalmente",
    unavailableBody: "No podemos conectar con el servicio del catálogo en este momento. Inténtalo de nuevo más tarde.",
    add: "Añadir al carrito",
    added: "Añadido al carrito",
    soldOut: "Agotado",
  },
} as const;

export default function ShopClient({
  products,
  catalogUnavailable,
}: {
  products: StorefrontCatalogProduct[];
  catalogUnavailable: boolean;
}) {
  const locale = useLocale();
  const copy = COPY[locale];
  const localized = useMemo(
    () => localizeCatalogProducts(products, locale),
    [locale, products],
  );
  const categories = useMemo(
    () => Array.from(new Map(localized.flatMap((product) => product.category ? [[product.category.slug, product.category.name] as const] : [])).entries()),
    [localized],
  );
  const grinds = useMemo(
    () => Array.from(new Set(localized.flatMap((product) => product.variants.map((variant) => variant.grind).filter((value): value is string => Boolean(value))))),
    [localized],
  );
  const listings = useMemo(
    () =>
      localized
        .flatMap((product) =>
          product.variants.map((variant) => ({ product, variant })),
        )
        .sort(
          (left, right) =>
            getVariantDisplaySlot(left.variant) - getVariantDisplaySlot(right.variant),
        )
        .map((listing, toneIndex) => ({ ...listing, toneIndex })),
    [localized],
  );
  const weights = useMemo(
    () =>
      Array.from(
        new Set(
          listings
            .map(({ variant }) => variant.weightGrams)
            .filter((value): value is number => value !== null),
        ),
      ).sort((left, right) => left - right),
    [listings],
  );
  const [category, setCategory] = useState("");
  const [grind, setGrind] = useState("");
  const [weight, setWeight] = useState("");
  const filtered = listings.filter(
    ({ product, variant }) =>
      (!category || product.category?.slug === category) &&
      (!grind || variant.grind === grind) &&
      (!weight || variant.weightGrams === Number(weight)),
  );

  return (
    <main className="shop-db">
      <style>{`
        .shop-db{background:#fdf1e5;color:#4a382c;min-height:70vh;font-family:var(--font-karla),sans-serif}
        .shop-db *:focus-visible{outline:2px solid #2e2018;outline-offset:3px}
        .shop-db__hero{background:#cf6549;color:#fff7ef;padding:clamp(38px,6vw,66px) 0;border-bottom:2px dashed #2e2018}
        .shop-db__hero p{max-width:60ch;line-height:1.6;font-weight:600}.shop-db__eyebrow{font:700 11px var(--font-space-mono);letter-spacing:.18em;text-transform:uppercase;color:#2e2018}
        .shop-db h1{font:800 clamp(38px,6vw,62px)/.95 var(--font-bitter);margin:12px 0 18px}
        .shop-db__body{display:grid;grid-template-columns:260px minmax(0,1fr);gap:28px;padding-top:46px;padding-bottom:72px;align-items:start}
        .shop-db__filters{display:flex;flex-direction:column;gap:14px;position:sticky;top:92px}
        .shop-db__filter-group{border:2px dashed rgba(46,32,24,.48);padding:20px;background:#fffaf5}
        .shop-db__filter-label{display:block;margin:0 0 12px;font:700 10px var(--font-space-mono);letter-spacing:.15em;text-transform:uppercase;color:#2e2018}
        .shop-db__choices{display:grid;gap:8px}.shop-db__choice,.shop-db__reset{border:2px dashed rgba(46,32,24,.45);background:#fffaf5;color:#2e2018;padding:10px 12px;text-align:left;font:700 11px var(--font-space-mono);cursor:pointer}
        .shop-db__choice[aria-pressed="true"]{background:#dda83a;border-color:#2e2018}.shop-db__reset{border-style:solid;background:#2e2018;color:#fff7ef;text-align:center;text-transform:uppercase;letter-spacing:.08em}
        .shop-db__meta{margin:0 0 18px;color:#6b5a4e}.shop-db__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .shop-db__card{display:flex;min-width:0;flex-direction:column;border:2px solid #2e2018;background:#fffaf5;box-shadow:6px 6px 0 rgba(46,32,24,.12)}
        .shop-db__cardhead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:13px 16px;border-bottom:2px dashed #2e2018;color:#fff7ef}
        .shop-db__cardhead h2{margin:0;font:800 20px/1.1 var(--font-bitter)}.shop-db__cardhead span{font:700 9px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase;text-align:right}
        .shop-db__image{position:relative;display:block;aspect-ratio:1000/735;background:#f2e6d8;overflow:hidden;border-bottom:2px dashed #2e2018}
        .shop-db__image img{object-fit:cover;transition:transform .45s ease}.shop-db__card:hover .shop-db__image img{transform:scale(1.035)}
        .shop-db__cardbody{padding:15px 16px;border-bottom:2px dashed #2e2018;display:flex;flex:1;flex-direction:column;gap:8px}.shop-db__card h3{font:800 18px/1.2 var(--font-bitter);margin:0;color:#2e2018}
        .shop-db__category{font:700 9px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}.shop-db__cardbody p{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-height:1.45;margin:0;font-size:13px}
        .shop-db__foot{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:14px 16px}.shop-db__price{font:800 16px var(--font-bitter);white-space:nowrap}
        .shop-db__add{border:2px solid #2e2018;background:#2e2018;color:#fff7ef;padding:12px 14px;font:700 9px var(--font-space-mono);letter-spacing:.09em;text-transform:uppercase;cursor:pointer}.shop-db__add:disabled{cursor:not-allowed;opacity:.55}
        .shop-db__empty{grid-column:1/-1;border:2px solid #2e2018;background:#f2e6d8;padding:clamp(36px,7vw,80px);text-align:center}.shop-db__empty h2{font:800 32px var(--font-bitter);margin:0 0 10px}.shop-db__empty p{margin:auto;max-width:48ch;line-height:1.6}
        @media(max-width:1200px){.shop-db__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:820px){.shop-db__body{grid-template-columns:1fr}.shop-db__filters{position:static;display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.shop-db__reset{grid-column:1/-1}}@media(max-width:560px){.shop-db__grid,.shop-db__filters{grid-template-columns:1fr}.shop-db__reset{grid-column:auto}.shop-db__foot{align-items:stretch;flex-direction:column}.shop-db__add{width:100%}}
        @media(prefers-reduced-motion:reduce){.shop-db__image img{transition:none}}
      `}</style>
      <header className="shop-db__hero">
        <div className="container-page">
          <span className="shop-db__eyebrow">{copy.eyebrow} · {listings.length}</span>
          <h1>{copy.title}</h1>
          <p>{copy.lead}</p>
        </div>
      </header>
      <div className="container-page shop-db__body">
        {catalogUnavailable ? (
          <section className="shop-db__empty"><h2>{copy.unavailable}</h2><p>{copy.unavailableBody}</p></section>
        ) : localized.length === 0 ? (
          <section className="shop-db__empty"><h2>{copy.coming}</h2><p>{copy.comingBody}</p></section>
        ) : (
          <>
            <aside className="shop-db__filters" aria-label={copy.reset}>
              {categories.length > 1 && <FilterGroup label={copy.category}>{categories.map(([slug, name]) => <button className="shop-db__choice" type="button" aria-pressed={category === slug} key={slug} onClick={() => setCategory((current) => current === slug ? "" : slug)}>{name}</button>)}</FilterGroup>}
              {grinds.length > 0 && <FilterGroup label={copy.grind}>{grinds.map((value) => <button className="shop-db__choice" type="button" aria-pressed={grind === value} key={value} onClick={() => setGrind((current) => current === value ? "" : value)}>{localizeGrind(value, locale)}</button>)}</FilterGroup>}
              {weights.length > 0 && <FilterGroup label={copy.weight}>{weights.map((value) => <button className="shop-db__choice" type="button" aria-pressed={weight === String(value)} key={value} onClick={() => setWeight((current) => current === String(value) ? "" : String(value))}>{value} g</button>)}</FilterGroup>}
              {(category || grind || weight) && <button className="shop-db__reset" type="button" onClick={() => { setCategory(""); setGrind(""); setWeight(""); }}>{copy.reset}</button>}
            </aside>
            <section>
              <p className="shop-db__meta">{copy.showing(filtered.length, listings.length)}</p>
              {filtered.length === 0 ? <div className="shop-db__empty"><p>{copy.noMatch}</p></div> : <div className="shop-db__grid">{filtered.map((listing) => <ProductCard key={listing.variant.id} listing={listing} />)}</div>}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return <div className="shop-db__filter-group"><span className="shop-db__filter-label">{label}</span><div className="shop-db__choices">{children}</div></div>;
}

function ProductCard({ listing }: { listing: CatalogListing }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { product, variant, toneIndex } = listing;
  const variantName = localizeVariantName(variant, locale);
  const href = `/shop/${product.slug}?variant=${encodeURIComponent(variant.id)}`;
  const tone = CARD_TONES[toneIndex % CARD_TONES.length];
  const textColor = tone === "#dda83a" ? "#2e2018" : "#fff7ef";

  function handleAdd() {
    if (!variant.inStock) return;
    addItem(variant.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return <article className="shop-db__card">
    <div className="shop-db__cardhead" style={{ background: tone, color: textColor }}><h2>{variantName}</h2><span>{product.category?.name ?? "Kaffe Guatilla"}</span></div>
    <Link className="shop-db__image" href={href} aria-label={`${product.name} · ${variantName}`}><Image src={variant.image} alt={`${product.name} · ${variantName}`} fill loading={toneIndex === 0 ? "eager" : "lazy"} sizes="(max-width: 560px) 100vw, (max-width: 1200px) 50vw, 28vw" /></Link>
    <div className="shop-db__cardbody">
      {product.category && <span className="shop-db__category">{product.category.name}</span>}
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
    </div>
    <div className="shop-db__foot"><span className="shop-db__price">{variant.inStock ? formatNok(variant.priceOre, locale) : copy.soldOut}</span><button className="shop-db__add" type="button" disabled={!variant.inStock} onClick={handleAdd}>{added ? copy.added : variant.inStock ? copy.add : copy.soldOut}</button></div>
  </article>;
}
