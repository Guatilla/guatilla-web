"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeCatalogCartLine, localizeVariantName } from "@/i18n/products";
import { formatNok } from "@/lib/money";
import type { StorefrontCartLine } from "@/types/catalog";

const COPY = {
  no: {
    eyebrow: "Handlekurv",
    title: "Din kaffe",
    clear: "Tøm kurven",
    empty: "Kurven er tom",
    emptyBody: "Utforsk den publiserte katalogen for å finne kaffen din.",
    shop: "Se butikken",
    remove: "Fjern",
    less: "Reduser antall",
    more: "Øk antall",
    unavailable: "Denne varianten er ikke lenger tilgjengelig.",
    loading: "Oppdaterer priser og lagerstatus …",
    failed: "Katalogen er midlertidig utilgjengelig. Prøv igjen senere.",
    soldOut: "Utsolgt",
    summary: "Oppsummering",
    subtotal: "Delsum",
    total: "Totalt",
    checkout: "Kassen åpner snart",
    checkoutBody: "Checkout er deaktivert til bestilling og betaling er klare.",
  },
  en: {
    eyebrow: "Shopping cart",
    title: "Your coffee",
    clear: "Clear cart",
    empty: "Your cart is empty",
    emptyBody: "Explore the published catalogue to find your coffee.",
    shop: "View the shop",
    remove: "Remove",
    less: "Decrease quantity",
    more: "Increase quantity",
    unavailable: "This variant is no longer available.",
    loading: "Updating prices and stock …",
    failed: "The catalogue is temporarily unavailable. Please try again later.",
    soldOut: "Sold out",
    summary: "Summary",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Checkout coming soon",
    checkoutBody: "Checkout is disabled until ordering and payment are ready.",
  },
  es: {
    eyebrow: "Carrito",
    title: "Tu café",
    clear: "Vaciar carrito",
    empty: "El carrito está vacío",
    emptyBody: "Explora el catálogo publicado para encontrar tu café.",
    shop: "Ver la tienda",
    remove: "Eliminar",
    less: "Reducir cantidad",
    more: "Aumentar cantidad",
    unavailable: "Esta variante ya no está disponible.",
    loading: "Actualizando precios e inventario…",
    failed: "El catálogo no está disponible temporalmente. Inténtalo más tarde.",
    soldOut: "Agotado",
    summary: "Resumen",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Venta próximamente",
    checkoutBody: "El checkout está desactivado hasta que pedidos y pagos estén listos.",
  },
} as const;

const CHECKOUT_COPY = {
  no: {
    checkout: "Gå til checkout",
    checkoutBody: "Etter at bestillingen er opprettet, sender vi en betalingsforespørsel i Vipps. Bestillingen godkjennes etter betaling.",
  },
  en: {
    checkout: "Continue to checkout",
    checkoutBody: "After you place the order, we will send you a Vipps payment request. The order is approved after payment.",
  },
  es: {
    checkout: "Finalizar compra",
    checkoutBody: "Después de crear el pedido, te enviaremos una solicitud de pago en Vipps. La compra se aprobará después del pago.",
  },
} as const;

export default function CartPage() {
  const locale = useLocale();
  const copy = COPY[locale];
  const checkoutCopy = CHECKOUT_COPY[locale];
  const { items, removeItem, updateQuantity, clearCart, isHydrated } = useCart();
  const [lines, setLines] = useState<StorefrontCartLine[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const variantKey = JSON.stringify(items);

  useEffect(() => {
    if (!isHydrated) return;

    const controller = new AbortController();
    const requestedItems = JSON.parse(variantKey) as Array<{ variantId: string; quantity: number }>;
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) setState("loading");
    });
    fetch("/api/catalog/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: requestedItems }),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("catalog-unavailable");
        return response.json() as Promise<{ lines: StorefrontCartLine[] }>;
      })
      .then((data) => {
        setLines(Array.isArray(data.lines) ? data.lines : []);
        setState("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLines([]);
        setState("error");
      });
    return () => controller.abort();
  }, [variantKey, isHydrated]);

  const localizedLines = useMemo(
    () => new Map(lines.map((line) => {
      const localized = localizeCatalogCartLine(line, locale);
      return [localized.variantId, localized] as const;
    })),
    [lines, locale],
  );
  const totalOre = items.reduce((sum, item) => {
    const line = localizedLines.get(item.variantId);
    return sum + (line ? line.priceOre * item.quantity : 0);
  }, 0);
  const checkoutReady =
    state === "ready" &&
    items.length > 0 &&
    lines.length === items.length &&
    lines.every((line) => line.inStock);

  return (
    <main className="cart-db">
      <style>{`
        .cart-db{background:#fdf1e5;color:#4a382c;min-height:72vh;padding:clamp(34px,6vw,72px) 0;font-family:var(--font-karla),sans-serif}.cart-db *{box-sizing:border-box}
        .cart-db__head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:30px}.cart-db__eyebrow{font:700 10px var(--font-space-mono);letter-spacing:.16em;text-transform:uppercase;color:#a94b2f}.cart-db h1{font:800 clamp(40px,7vw,64px)/.95 var(--font-bitter);color:#2e2018;margin:8px 0 0}.cart-db__clear{border:0;background:none;color:#a94b2f;text-decoration:underline;font-weight:700}
        .cart-db__layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(290px,.65fr);gap:32px;align-items:start}.cart-db__lines{display:grid;gap:2px;border:2px solid #2e2018;background:#2e2018}.cart-db__line{display:grid;grid-template-columns:110px 1fr;gap:18px;background:#fdf1e5;padding:16px}.cart-db__image{width:110px;aspect-ratio:1;background:#f2e6d8;overflow:hidden;border:1px solid #6b5a4e}.cart-db__image img{width:100%;height:100%;object-fit:cover}.cart-db__placeholder{height:100%;display:grid;place-items:center;font:700 9px var(--font-space-mono);text-transform:uppercase}
        .cart-db__linehead{display:flex;gap:12px;align-items:baseline}.cart-db__line h2{font:800 23px var(--font-bitter);color:#2e2018;margin:0}.cart-db__price{margin-left:auto;font:800 18px var(--font-bitter);white-space:nowrap}.cart-db__meta{margin:6px 0 12px;font:700 10px var(--font-space-mono);letter-spacing:.07em;text-transform:uppercase;color:#6b5a4e}.cart-db__controls{display:flex;align-items:center;gap:10px}.cart-db__controls button{border:2px solid #2e2018;background:#fdf1e5;width:38px;height:38px;font-weight:800}.cart-db__qty{font:700 13px var(--font-space-mono);min-width:24px;text-align:center}.cart-db__remove{margin-left:auto!important;width:auto!important;border:0!important;color:#a94b2f!important;text-decoration:underline}.cart-db__warning{color:#a94b2f;margin:6px 0 12px}
        .cart-db__summary{position:sticky;top:24px;border:2px solid #2e2018}.cart-db__summary-main{background:#5c7148;color:#fff7ef;padding:25px}.cart-db__summary h2{font:800 27px var(--font-bitter);margin:0 0 20px}.cart-db__row{display:flex;justify-content:space-between;gap:12px;padding:8px 0}.cart-db__total{border-top:2px solid #fff7ef;margin-top:8px;padding-top:16px;font:800 22px var(--font-bitter)}.cart-db__checkout{display:block;box-sizing:border-box;width:100%;border:0;background:#2e2018;color:#fff7ef;padding:18px;text-align:center;text-decoration:none;font:700 11px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}.cart-db__checkout:disabled{opacity:.5}.cart-db__checkout-note{background:#f2e6d8;padding:15px;margin:0;font-size:13px;line-height:1.5}
        .cart-db__empty{border:2px solid #2e2018;background:#f2e6d8;padding:clamp(32px,6vw,64px);text-align:center}.cart-db__empty h2{font:800 30px var(--font-bitter);color:#2e2018;margin:0 0 8px}.cart-db__empty p{margin:0 0 22px}.cart-db__link{display:inline-block;background:#2e2018;color:#fff7ef;padding:13px 18px;text-decoration:none;font:700 10px var(--font-space-mono);letter-spacing:.1em;text-transform:uppercase}.cart-db__state{margin:0 0 12px;color:#6b5a4e}
        @media(max-width:760px){.cart-db__layout{grid-template-columns:1fr}.cart-db__summary{position:static}.cart-db__line{grid-template-columns:72px 1fr;gap:12px}.cart-db__image{width:72px}.cart-db__linehead{flex-wrap:wrap}.cart-db__price{width:100%;margin:0}.cart-db__head{align-items:start}}
      `}</style>
      <div className="container-page">
        <header className="cart-db__head"><div><span className="cart-db__eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1></div>{items.length > 0 && <button className="cart-db__clear" type="button" onClick={clearCart}>{copy.clear}</button>}</header>
        {!isHydrated ? <section className="cart-db__empty"><p role="status">{copy.loading}</p></section> : items.length === 0 ? <section className="cart-db__empty"><h2>{copy.empty}</h2><p>{copy.emptyBody}</p><Link className="cart-db__link" href="/shop">{copy.shop}</Link></section> : <div className="cart-db__layout">
          <section>
            {state === "loading" && <p className="cart-db__state" role="status">{copy.loading}</p>}
            {state === "error" && <p className="cart-db__state" role="alert">{copy.failed}</p>}
            <div className="cart-db__lines">{items.map((item) => {
              const line = localizedLines.get(item.variantId);
              return <article className="cart-db__line" key={item.variantId}>
                <div className="cart-db__image">{line?.image ? <Image src={line.image} alt="" width={110} height={110} unoptimized /> : <div className="cart-db__placeholder">Kaffe Guatilla</div>}</div>
                <div><div className="cart-db__linehead"><h2>{line ? line.productName : copy.unavailable}</h2>{line && <span className="cart-db__price">{formatNok(line.priceOre * item.quantity, locale)}</span>}</div>
                {line ? <><p className="cart-db__meta">{localizeVariantName(line, locale)}</p>{!line.inStock && <p className="cart-db__warning">{copy.soldOut}</p>}</> : <p className="cart-db__warning">{copy.unavailable}</p>}
                <div className="cart-db__controls"><button type="button" aria-label={copy.less} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>−</button><span className="cart-db__qty">{item.quantity}</span><button type="button" aria-label={copy.more} disabled={item.quantity >= 99} onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button><button className="cart-db__remove" type="button" onClick={() => removeItem(item.variantId)}>{copy.remove}</button></div></div>
              </article>;
            })}</div>
          </section>
          <aside className="cart-db__summary"><div className="cart-db__summary-main"><h2>{copy.summary}</h2><div className="cart-db__row"><span>{copy.subtotal}</span><strong>{formatNok(totalOre, locale)}</strong></div><div className="cart-db__row cart-db__total"><span>{copy.total}</span><span>{formatNok(totalOre, locale)}</span></div></div>{checkoutReady ? <Link className="cart-db__checkout" href="/checkout">{checkoutCopy.checkout}</Link> : <button className="cart-db__checkout" type="button" disabled>{checkoutCopy.checkout}</button>}<p className="cart-db__checkout-note">{checkoutCopy.checkoutBody}</p></aside>
        </div>}
      </div>
    </main>
  );
}
