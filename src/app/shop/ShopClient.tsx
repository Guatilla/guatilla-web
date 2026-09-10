"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/patchwork/ProductCard";

const ROASTS = ["Lys", "Medium", "Medium-mørk", "Mørk"];
const BREW_METHODS = ["Filter", "Espresso", "Presskanne", "Moka"];

const HEADER_TONES = [
  "bg-brand-forest text-brand-cream",
  "bg-brand-teal text-brand-cream",
  "bg-brand-olive text-brand-cream",
  "bg-brand-terracotta text-brand-cream",
  "bg-brand-vichy text-brand-cream",
];

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function ShopClient() {
  const [roasts, setRoasts] = useState<string[]>([]);
  const [brews, setBrews] = useState<string[]>([]);
  const [subscription, setSubscription] = useState(false);

  const filtered = useMemo(
    () => products.filter((p) => roasts.length === 0 || roasts.includes(p.roast)),
    [roasts]
  );

  const groupLabel = "text-[11px] font-bold uppercase tracking-[0.2em]";

  return (
    <div className="bg-brand-linen">
      {/* header patch */}
      <section className="container-page pb-12 pt-16 lg:pt-[72px]">
        <div className="stitch pop bg-brand-terracotta px-7 py-10 text-brand-cream sm:px-12 sm:py-12">
          <span className={`${groupLabel} text-[#FDF0DA]`}>
            Butikk • {products.length} partier
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            All kaffen vår
          </h1>
          <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-brand-cream/90">
            Mikropartier fra Serranía del Perijá. Velg hele bønner eller malt —
            alt ristes når du bestiller.
          </p>
        </div>
      </section>

      <div className="grid gap-7 container-page pb-12 lg:grid-cols-[260px_1fr]">
        {/* ── FILTER SIDEBAR ─────────────────────────────── */}
        <aside className="flex flex-col gap-4">
          {/* Rist */}
          <div className="stitch bg-brand-cream p-5">
            <p className={`${groupLabel} text-brand-coffee/55`}>Rist</p>
            <div className="mt-3 flex flex-col gap-2">
              {ROASTS.map((r) => {
                const active = roasts.includes(r);
                return (
                  <button
                    key={r}
                    onClick={() => setRoasts((prev) => toggle(prev, r))}
                    className={`stitch px-3 py-2 text-left text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-brand-gold text-brand-coffee"
                        : "bg-brand-linen text-brand-coffee"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bryggemetode */}
          <div className="stitch bg-brand-cream p-5">
            <p className={`${groupLabel} text-brand-coffee/55`}>Bryggemetode</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BREW_METHODS.map((b) => {
                const active = brews.includes(b);
                return (
                  <button
                    key={b}
                    onClick={() => setBrews((prev) => toggle(prev, b))}
                    className={`stitch px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-brand-gold text-brand-coffee"
                        : "bg-brand-linen text-brand-coffee"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kjøp som */}
          <div className="stitch bg-brand-forest p-5 text-brand-cream">
            <p className={`${groupLabel} opacity-80`}>Kjøp som</p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => setSubscription(false)}
                className={`stitch px-3 py-2 text-left text-[12px] font-semibold transition-colors ${
                  !subscription
                    ? "bg-brand-gold text-brand-coffee"
                    : "bg-brand-cream text-brand-coffee"
                }`}
              >
                Engangskjøp
              </button>
              <button
                onClick={() => setSubscription(true)}
                className={`stitch px-3 py-2 text-left text-[12px] font-bold transition-colors ${
                  subscription
                    ? "bg-brand-gold text-brand-coffee"
                    : "bg-brand-cream text-brand-coffee"
                }`}
              >
                Abonnement −15%
              </button>
            </div>
          </div>

          {(roasts.length > 0 || brews.length > 0) && (
            <button
              onClick={() => {
                setRoasts([]);
                setBrews([]);
              }}
              className="self-start text-[11px] font-bold uppercase tracking-[0.14em] text-brand-terracotta-dark hover:text-brand-terracotta"
            >
              Nullstill filtre
            </button>
          )}
        </aside>

        {/* ── PRODUCT GRID ───────────────────────────────── */}
        <div>
          <p className="mb-4 text-[13px] text-brand-coffee/60">
            Viser {filtered.length} av {products.length}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product, i) => {
              const subPrice =
                product.priceNum - Math.round(product.priceNum * 0.15);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  headerClassName={HEADER_TONES[i % HEADER_TONES.length]}
                  displayPrice={
                    subscription ? `${subPrice} NOK` : undefined
                  }
                />
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="stitch bg-brand-cream px-6 py-16 text-center text-brand-coffee/50">
              Ingen kaffe matcher filtrene. Prøv en annen kombinasjon.
            </div>
          )}
        </div>
      </div>

      {/* subscription promo */}
      <section className="container-page pb-14">
        <div className="stitch pop flex flex-col gap-5 bg-brand-vichy px-7 py-8 text-brand-cream sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h3 className="font-heading text-2xl font-extrabold">
              Kan ikke velge? Ta hele teppet.
            </h3>
            <p className="mt-2 text-sm text-brand-cream/90">
              Smakspakke med alle {products.length} partier, 100 g hver.
            </p>
          </div>
          <Link
            href="/shop"
            className="stitch shrink-0 self-start bg-brand-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-coffee sm:self-auto"
          >
            Se smakspakke →
          </Link>
        </div>
      </section>
    </div>
  );
}
