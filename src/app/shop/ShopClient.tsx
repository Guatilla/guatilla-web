"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeCatalogProducts, localizeGrind } from "@/i18n/products";
import { formatNok } from "@/lib/money";
import type { StorefrontCatalogProduct } from "@/types/catalog";

const COPY = {
  no: {
    eyebrow: "Butikk",
    title: "All kaffen vår",
    lead: "Publiserte produkter og tilgjengelige varianter fra vårt offisielle katalog.",
    category: "Kategori",
    grind: "Maling",
    all: "Alle",
    reset: "Nullstill filtre",
    showing: (shown: number, total: number) => `Viser ${shown} av ${total}`,
    noMatch: "Ingen produkter samsvarer med filtrene.",
    coming: "Salget åpner snart",
    comingBody: "Vi klargjør katalogen. Kom tilbake snart for å se publiserte produkter.",
    unavailable: "Katalogen er midlertidig utilgjengelig",
    unavailableBody: "Vi får ikke kontakt med katalogtjenesten akkurat nå. Prøv igjen litt senere.",
    from: "Fra",
    view: "Se produkt",
    soldOut: "Utsolgt",
  },
  en: {
    eyebrow: "Shop",
    title: "All our coffee",
    lead: "Published products and available variants from our official catalogue.",
    category: "Category",
    grind: "Grind",
    all: "All",
    reset: "Reset filters",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    noMatch: "No products match these filters.",
    coming: "Sales coming soon",
    comingBody: "We are preparing the catalogue. Come back soon to see published products.",
    unavailable: "The catalogue is temporarily unavailable",
    unavailableBody: "We cannot reach the catalogue service right now. Please try again shortly.",
    from: "From",
    view: "View product",
    soldOut: "Sold out",
  },
  es: {
    eyebrow: "Tienda",
    title: "Todo nuestro café",
    lead: "Productos publicados y variantes disponibles de nuestro catálogo oficial.",
    category: "Categoría",
    grind: "Molienda",
    all: "Todas",
    reset: "Restablecer filtros",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    noMatch: "Ningún producto coincide con los filtros.",
    coming: "Venta próximamente",
    comingBody: "Estamos preparando el catálogo. Vuelve pronto para ver los productos publicados.",
    unavailable: "El catálogo no está disponible temporalmente",
    unavailableBody: "No podemos conectar con el servicio del catálogo en este momento. Inténtalo de nuevo más tarde.",
    from: "Desde",
    view: "Ver producto",
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
  const [category, setCategory] = useState("");
  const [grind, setGrind] = useState("");
  const filtered = localized.filter(
    (product) =>
      (!category || product.category?.slug === category) &&
      (!grind || product.variants.some((variant) => variant.grind === grind)),
  );

  return (
    <main className="shop-db">
      <style>{`
        .shop-db{background:#fdf1e5;color:#4a382c;min-height:70vh;font-family:var(--font-karla),sans-serif}
        .shop-db__hero{background:#3b2a20;color:#fff7ef;padding:clamp(38px,6vw,72px) 0;border-bottom:2px solid #2e2018}
        .shop-db__hero p{max-width:58ch;line-height:1.6}.shop-db__eyebrow{font:700 11px var(--font-space-mono);letter-spacing:.18em;text-transform:uppercase;color:#dda83a}
        .shop-db h1{font:800 clamp(38px,6vw,62px)/.95 var(--font-bitter);margin:12px 0 18px}
        .shop-db__body{padding-top:36px;padding-bottom:72px}.shop-db__filters{display:flex;flex-wrap:wrap;gap:12px;align-items:end;margin-bottom:28px}
        .shop-db label{display:grid;gap:6px;font:700 10px var(--font-space-mono);letter-spacing:.12em;text-transform:uppercase}
        .shop-db select,.shop-db button{border:2px solid #2e2018;background:#fdf1e5;color:#2e2018;padding:11px 14px;font:700 12px var(--font-space-mono)}
        .shop-db__meta{margin:0 0 16px;color:#6b5a4e}.shop-db__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .shop-db__card{display:flex;flex-direction:column;border:2px solid #2e2018;background:#fdf1e5}.shop-db__image{aspect-ratio:4/3;background:#f2e6d8;overflow:hidden;border-bottom:2px solid #2e2018}
        .shop-db__image img{width:100%;height:100%;object-fit:cover}.shop-db__placeholder{height:100%;display:grid;place-items:center;font:700 11px var(--font-space-mono);color:#6b5a4e;text-transform:uppercase}
        .shop-db__cardbody{padding:18px;display:flex;flex:1;flex-direction:column;gap:10px}.shop-db__card h2{font:800 24px var(--font-bitter);margin:0;color:#2e2018}
        .shop-db__category,.shop-db__variant{font:700 10px var(--font-space-mono);letter-spacing:.08em;text-transform:uppercase}.shop-db__card p{line-height:1.5;margin:0}
        .shop-db__foot{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-top:auto;padding-top:18px}.shop-db__price{font:700 12px var(--font-space-mono)}
        .shop-db__cta{background:#2e2018;color:#fff7ef!important;padding:12px 15px;text-decoration:none;font:700 10px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}
        .shop-db__empty{border:2px solid #2e2018;background:#f2e6d8;padding:clamp(36px,7vw,80px);text-align:center}.shop-db__empty h2{font:800 32px var(--font-bitter);margin:0 0 10px}.shop-db__empty p{margin:auto;max-width:48ch;line-height:1.6}
        @media(max-width:960px){.shop-db__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.shop-db__grid{grid-template-columns:1fr}.shop-db__filters>*{width:100%}}
      `}</style>
      <header className="shop-db__hero"><div className="container-page"><span className="shop-db__eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.lead}</p></div></header>
      <div className="container-page shop-db__body">
        {catalogUnavailable ? (
          <section className="shop-db__empty"><h2>{copy.unavailable}</h2><p>{copy.unavailableBody}</p></section>
        ) : localized.length === 0 ? (
          <section className="shop-db__empty"><h2>{copy.coming}</h2><p>{copy.comingBody}</p></section>
        ) : (
          <>
            <div className="shop-db__filters">
              {categories.length > 0 && <label>{copy.category}<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">{copy.all}</option>{categories.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}</select></label>}
              {grinds.length > 0 && <label>{copy.grind}<select value={grind} onChange={(event) => setGrind(event.target.value)}><option value="">{copy.all}</option>{grinds.map((value) => <option key={value} value={value}>{localizeGrind(value, locale)}</option>)}</select></label>}
              {(category || grind) && <button type="button" onClick={() => { setCategory(""); setGrind(""); }}>{copy.reset}</button>}
            </div>
            <p className="shop-db__meta">{copy.showing(filtered.length, localized.length)}</p>
            {filtered.length === 0 ? <section className="shop-db__empty"><p>{copy.noMatch}</p></section> : <div className="shop-db__grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
          </>
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: StorefrontCatalogProduct }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const minPrice = Math.min(...product.variants.map((variant) => variant.priceOre));
  const hasStock = product.variants.some((variant) => variant.inStock);
  const variantLabels = Array.from(new Set(product.variants.map((variant) => localizeGrind(variant.grind, locale)).filter(Boolean)));

  return <article className="shop-db__card">
    <div className="shop-db__image">{product.image ? <Image src={product.image} alt={product.name} width={800} height={600} unoptimized /> : <div className="shop-db__placeholder">Kaffe Guatilla</div>}</div>
    <div className="shop-db__cardbody">
      {product.category && <span className="shop-db__category">{product.category.name}</span>}
      <h2>{product.name}</h2>
      <span className="shop-db__variant">{variantLabels.join(" · ")}</span>
      {product.description && <p>{product.description}</p>}
      <div className="shop-db__foot"><span className="shop-db__price">{hasStock ? `${copy.from} ${formatNok(minPrice, locale)}` : copy.soldOut}</span><Link className="shop-db__cta" href={`/shop/${product.slug}`}>{copy.view}</Link></div>
    </div>
  </article>;
}
