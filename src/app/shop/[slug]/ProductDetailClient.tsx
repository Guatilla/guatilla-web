"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeVariantName } from "@/i18n/products";
import { formatNok } from "@/lib/money";
import type { StorefrontCatalogProduct } from "@/types/catalog";

const COPY = {
  no: {
    back: "Tilbake til butikken",
    variant: "Velg variant",
    weight: "Vekt",
    grind: "Maling",
    inStock: "På lager",
    soldOut: "Utsolgt",
    add: "Legg i handlekurven",
    added: "Lagt i handlekurven",
    trace: "Se sporbarhet",
  },
  en: {
    back: "Back to the shop",
    variant: "Choose a variant",
    weight: "Weight",
    grind: "Grind",
    inStock: "In stock",
    soldOut: "Sold out",
    add: "Add to cart",
    added: "Added to cart",
    trace: "View traceability",
  },
  es: {
    back: "Volver a la tienda",
    variant: "Elige una variante",
    weight: "Peso",
    grind: "Molienda",
    inStock: "Disponible",
    soldOut: "Agotado",
    add: "Añadir al carrito",
    added: "Añadido al carrito",
    trace: "Ver trazabilidad",
  },
} as const;

export default function ProductDetailClient({ product }: { product: StorefrontCatalogProduct }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const [selectedId, setSelectedId] = useState(product.variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const selected = product.variants.find((variant) => variant.id === selectedId) ?? product.variants[0];

  function handleAdd() {
    if (!selected?.inStock) return;
    addItem(selected.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="pdp-db">
      <style>{`
        .pdp-db{background:#fdf1e5;color:#4a382c;min-height:72vh;padding:clamp(28px,5vw,68px) 0 78px;font-family:var(--font-karla),sans-serif}
        .pdp-db__back{color:#a94b2f;font:700 11px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase;text-decoration:none}
        .pdp-db__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.85fr);gap:clamp(28px,5vw,68px);margin-top:26px;align-items:start}
        .pdp-db__media{aspect-ratio:4/3;background:#f2e6d8;border:2px solid #2e2018;overflow:hidden}.pdp-db__media img{width:100%;height:100%;object-fit:cover}.pdp-db__placeholder{height:100%;display:grid;place-items:center;font:800 clamp(28px,5vw,54px) var(--font-bitter);color:#6b5a4e}
        .pdp-db__category{display:inline-block;background:#dda83a;border:2px solid #2e2018;padding:7px 10px;font:700 10px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}
        .pdp-db h1{font:800 clamp(42px,7vw,72px)/.95 var(--font-bitter);letter-spacing:-.035em;color:#2e2018;margin:18px 0}.pdp-db__description{font-size:17px;line-height:1.65;margin:0 0 28px}
        .pdp-db fieldset{border:0;padding:0;margin:0}.pdp-db legend{font:700 11px var(--font-space-mono);letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
        .pdp-db__options{display:grid;gap:8px}.pdp-db__option{display:flex;align-items:center;gap:12px;border:2px solid #2e2018;padding:13px;background:#fdf1e5;cursor:pointer}.pdp-db__option:has(input:checked){background:#dda83a}.pdp-db__option input{accent-color:#2e2018}
        .pdp-db__option-name{font-weight:700;color:#2e2018}.pdp-db__meta{font:700 10px var(--font-space-mono);text-transform:uppercase;color:#6b5a4e}.pdp-db__option-price{margin-left:auto;font:700 12px var(--font-space-mono)}
        .pdp-db__actions{display:grid;grid-template-columns:1fr auto;gap:10px;margin-top:18px}.pdp-db__add,.pdp-db__trace{border:2px solid #2e2018;padding:16px;font:700 11px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}.pdp-db__add{background:#2e2018;color:#fff7ef}.pdp-db__add:disabled{opacity:.5}.pdp-db__trace{background:#fdf1e5;color:#2e2018;text-decoration:none;text-align:center}
        .pdp-db__status{margin:10px 0 0;font:700 11px var(--font-space-mono);color:#5c7148}
        @media(max-width:760px){.pdp-db__grid{grid-template-columns:1fr}.pdp-db__actions{grid-template-columns:1fr}.pdp-db h1{font-size:44px}}
      `}</style>
      <div className="container-page">
        <Link className="pdp-db__back" href="/shop">← {copy.back}</Link>
        <div className="pdp-db__grid">
          <div className="pdp-db__media">{product.image ? <Image src={product.image} alt={product.name} width={960} height={720} priority unoptimized /> : <div className="pdp-db__placeholder">Kaffe Guatilla</div>}</div>
          <section>
            {product.category && <span className="pdp-db__category">{product.category.name}</span>}
            <h1>{product.name}</h1>
            {product.description && <p className="pdp-db__description">{product.description}</p>}
            <fieldset><legend>{copy.variant}</legend><div className="pdp-db__options">{product.variants.map((variant) => (
              <label className="pdp-db__option" key={variant.id}><input type="radio" name="variant" value={variant.id} checked={selected?.id === variant.id} onChange={() => { setSelectedId(variant.id); setAdded(false); }} /><span className="pdp-db__option-name">{localizeVariantName(variant, locale)}</span><span className="pdp-db__option-price">{variant.inStock ? formatNok(variant.priceOre, locale) : copy.soldOut}</span></label>
            ))}</div></fieldset>
            <div className="pdp-db__actions"><button className="pdp-db__add" type="button" disabled={!selected?.inStock} onClick={handleAdd}>{selected?.inStock ? `${copy.add} · ${formatNok(selected.priceOre, locale)}` : copy.soldOut}</button><Link className="pdp-db__trace" href="/sporbarhet">{copy.trace}</Link></div>
            {added && <p className="pdp-db__status" role="status">{copy.added}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
