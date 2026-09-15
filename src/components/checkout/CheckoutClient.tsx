"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/components/CartProvider";
import { COMMERCE_CONFIG } from "@/config/commerce";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeCatalogCartLine, localizeVariantName } from "@/i18n/products";
import { formatNok } from "@/lib/money";
import type { PublicOrderResult } from "@/types/commerce";
import type { StorefrontCartLine } from "@/types/catalog";

const COPY = {
  no: {
    eyebrow: "Sikker bestilling",
    title: "Fullfør bestillingen",
    back: "Tilbake til kurven",
    contact: "Kontaktinformasjon",
    delivery: "Leveringsadresse",
    fullName: "Fullt navn",
    email: "E-post",
    phone: "Telefon",
    address1: "Adresse",
    address2: "Adresselinje 2 (valgfritt)",
    postal: "Postnummer",
    city: "Sted",
    country: "Landkode",
    note: "Merknad (valgfritt)",
    summary: "Bestillingen",
    total: "Totalt",
    submit: "Opprett bestilling",
    submitting: "Oppretter …",
    empty: "Handlekurven er tom.",
    loading: "Laster handlekurven …",
    unavailable: "Pris eller tilgjengelighet er endret. Handlekurven er oppdatert; kontroller den før du prøver igjen.",
    failed: "Bestillingen kunne ikke opprettes. Prøv igjen med samme informasjon.",
    created: (number: string) => `Bestilling ${number} er opprettet.`,
    openVipps: (number: string) => `Åpne Vipps og betal til nummer ${number} — ${COMMERCE_CONFIG.vipps.merchantName}.`,
    reference: (number: string) => `Skriv ${number} som betalingsreferanse.`,
    pending: "Bestillingen din står som ventende til vi har bekreftet betalingen.",
    status: "Venter på betaling",
    mobile: `På mobil: åpne Vipps og søk etter ${COMMERCE_CONFIG.vipps.number}. Beløpet fylles ikke ut automatisk.`,
    qrMissing: "Det offisielle Vipps-QR-bildet blir tilgjengelig her. Bruk Vipps-nummeret inntil videre.",
  },
  en: {
    eyebrow: "Secure order",
    title: "Complete your order",
    back: "Back to cart",
    contact: "Contact information",
    delivery: "Delivery address",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    address1: "Address",
    address2: "Address line 2 (optional)",
    postal: "Postal code",
    city: "City",
    country: "Country code",
    note: "Buyer note (optional)",
    summary: "Your order",
    total: "Total",
    submit: "Create order",
    submitting: "Creating …",
    empty: "Your cart is empty.",
    loading: "Loading your cart …",
    unavailable: "A price or availability changed. Your cart has been refreshed; review it before trying again.",
    failed: "The order could not be created. Try again with the same information.",
    created: (number: string) => `Order ${number} created.`,
    openVipps: (number: string) => `Open Vipps and pay number ${number} — ${COMMERCE_CONFIG.vipps.merchantName}.`,
    reference: (number: string) => `Enter ${number} as the payment reference.`,
    pending: "Your order will remain pending until we confirm the payment.",
    status: "Payment pending",
    mobile: `On mobile: open Vipps and search for ${COMMERCE_CONFIG.vipps.number}. The amount will not be filled automatically.`,
    qrMissing: "The official Vipps QR image will be shown here. Use the Vipps number in the meantime.",
  },
  es: {
    eyebrow: "Pedido seguro",
    title: "Finaliza tu compra",
    back: "Volver al carrito",
    contact: "Información de contacto",
    delivery: "Dirección de entrega",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    address1: "Dirección",
    address2: "Dirección adicional (opcional)",
    postal: "Código postal",
    city: "Ciudad",
    country: "Código de país",
    note: "Nota del comprador (opcional)",
    summary: "Tu pedido",
    total: "Total",
    submit: "Crear pedido",
    submitting: "Creando…",
    empty: "El carrito está vacío.",
    loading: "Cargando tu carrito…",
    unavailable: "Cambió un precio o la disponibilidad. El carrito se actualizó; revísalo antes de intentarlo de nuevo.",
    failed: "No se pudo crear el pedido. Inténtalo de nuevo con la misma información.",
    created: (number: string) => `Pedido ${number} creado.`,
    openVipps: (number: string) => `Abre Vipps y paga al número ${number} — ${COMMERCE_CONFIG.vipps.merchantName}.`,
    reference: (number: string) => `Escribe ${number} como referencia del pago.`,
    pending: "Tu pedido permanecerá pendiente hasta que confirmemos el pago.",
    status: "Pendiente de pago",
    mobile: `En móvil: abre Vipps y busca ${COMMERCE_CONFIG.vipps.number}. El importe no aparecerá rellenado automáticamente.`,
    qrMissing: "El QR oficial de Vipps aparecerá aquí. Mientras tanto, utiliza el Número Vipps.",
  },
} as const;

export default function CheckoutClient() {
  const locale = useLocale();
  const copy = COPY[locale];
  const { items, clearCart, removeItem, isHydrated } = useCart();
  const [lines, setLines] = useState<StorefrontCartLine[]>([]);
  const [catalogVersion, setCatalogVersion] = useState<string | null>(null);
  const [loadedVariantKey, setLoadedVariantKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<PublicOrderResult | null>(null);
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  const variantKey = JSON.stringify(items);

  async function refreshLines(signal?: AbortSignal) {
    const response = await fetch("/api/catalog/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
      signal,
    });
    if (!response.ok) throw new Error("catalog");
    const data = await response.json() as { lines: StorefrontCartLine[]; catalogVersion?: string };
    if (!data.catalogVersion || !/^[a-f0-9]{64}$/.test(data.catalogVersion)) {
      throw new Error("catalog-version");
    }
    setLines(data.lines);
    setCatalogVersion(data.catalogVersion);
    setLoadedVariantKey(variantKey);
    const validIds = new Set(data.lines.map((line) => line.variantId));
    items.forEach((item) => { if (!validIds.has(item.variantId)) removeItem(item.variantId); });
    return data.lines;
  }

  useEffect(() => {
    if (!isHydrated) return;

    const controller = new AbortController();
    Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return [];
        setLoading(true);
        setError(null);
        setCatalogVersion(null);
        setLoadedVariantKey(null);
        return refreshLines(controller.signal);
      })
      .catch(() => { if (!controller.signal.aborted) setError(copy.failed); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
    // item IDs are deliberately represented by variantKey for stable reloads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantKey, locale, isHydrated]);

  const localized = useMemo(
    () => lines.map((line) => localizeCatalogCartLine(line, locale)),
    [lines, locale],
  );
  const quantities = new Map(items.map((item) => [item.variantId, item.quantity]));
  const totalOre = localized.reduce((sum, line) => sum + line.priceOre * (quantities.get(line.variantId) ?? 0), 0);
  const canSubmit = isHydrated && !loading && loadedVariantKey === variantKey && Boolean(catalogVersion) && items.length > 0 && localized.length === items.length && localized.every((line) => line.inStock);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || busy || !catalogVersion) return;
    const form = new FormData(event.currentTarget);
    const customer = {
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      addressLine1: String(form.get("addressLine1") ?? ""),
      addressLine2: String(form.get("addressLine2") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      city: String(form.get("city") ?? ""),
      countryCode: String(form.get("countryCode") ?? "NO"),
    };
    const note = String(form.get("note") ?? "");
    const fingerprint = JSON.stringify({ items, customer, locale, note });
    if (!requestRef.current || requestRef.current.fingerprint !== fingerprint) {
      requestRef.current = { fingerprint, id: crypto.randomUUID() };
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", "If-Match": catalogVersion },
        body: JSON.stringify({ items, customer, locale, note, clientRequestId: requestRef.current.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          await refreshLines();
          setError(copy.unavailable);
        } else {
          setError(copy.failed);
        }
        return;
      }
      setConfirmation(data as PublicOrderResult);
      clearCart();
    } catch {
      setError(copy.failed);
    } finally {
      setBusy(false);
    }
  }

  if (confirmation) return <OrderConfirmation order={confirmation} />;

  return <main className="checkout"><style>{`
    .checkout{background:#fdf1e5;color:#2e2018;min-height:72vh;padding:clamp(30px,5vw,64px) 0 80px}.checkout *{box-sizing:border-box}.checkout__back{color:#a94b2f;font:700 10px var(--font-space-mono);text-transform:uppercase;letter-spacing:.1em;text-decoration:none}.checkout h1{font:800 clamp(38px,6vw,60px)/1 var(--font-bitter);margin:14px 0 30px}.checkout__layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(290px,.7fr);gap:30px;align-items:start}.checkout__form,.checkout__summary{border:2px solid #2e2018;background:#fff7ef}.checkout__section{padding:22px;border-bottom:2px solid #2e2018}.checkout__section:last-child{border-bottom:0}.checkout h2{font:800 23px var(--font-bitter);margin:0 0 17px}.checkout__grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.checkout label{display:grid;gap:6px;font:700 10px var(--font-space-mono);letter-spacing:.06em;text-transform:uppercase}.checkout label.full{grid-column:1/-1}.checkout input,.checkout textarea{width:100%;border:1.5px solid #6b5a4e;background:#fff;padding:11px;color:#2e2018;font:400 15px var(--font-karla)}.checkout textarea{min-height:90px;resize:vertical}.checkout__submit{width:100%;border:0;background:#2e2018;color:#fff7ef;padding:18px;font:700 11px var(--font-space-mono);letter-spacing:.12em;text-transform:uppercase}.checkout__submit:disabled{opacity:.5}.checkout__summary{position:sticky;top:24px}.checkout__summary-body{padding:22px}.checkout__line{padding:12px 0;border-bottom:1px solid #d8c8b6}.checkout__line strong{display:block}.checkout__meta{font-size:12px;color:#6b5a4e}.checkout__price{float:right;font:700 12px var(--font-space-mono)}.checkout__total{display:flex;justify-content:space-between;border-top:2px solid #2e2018;padding-top:16px;margin-top:16px;font:800 21px var(--font-bitter)}.checkout__error{border:2px solid #2e2018;background:#a94b2f;color:#fff7ef;padding:13px;margin:0 0 18px}.checkout__empty{border:2px solid #2e2018;background:#f2e6d8;padding:35px}.checkout__empty a{color:#a94b2f}.confirm{background:#fdf1e5;color:#2e2018;min-height:72vh;padding:clamp(36px,7vw,80px) 0}.confirm__card{max-width:800px;margin:auto;border:2px solid #2e2018;background:#fff7ef;box-shadow:10px 10px 0 #dda83a}.confirm__head{background:#5c7148;color:#fff7ef;padding:26px}.confirm__head h1{font:800 clamp(32px,5vw,48px) var(--font-bitter);margin:8px 0}.confirm__status{display:inline-block;background:#dda83a;color:#2e2018;padding:7px 10px;font:700 10px var(--font-space-mono);text-transform:uppercase}.confirm__body{padding:26px;display:grid;gap:16px}.confirm__number{font:800 30px var(--font-bitter)}.confirm__total{font:800 28px var(--font-bitter)}.confirm__vipps{border:2px solid #2e2018;background:#f2e6d8;padding:20px}.confirm__vipps strong{font-size:24px}.confirm__qr{min-height:190px;border:2px dashed #6b5a4e;display:grid;place-items:center;text-align:center;padding:18px}.confirm__qr img{max-width:220px;height:auto}.confirm__body p{margin:0;line-height:1.6}@media(max-width:760px){.checkout__layout{grid-template-columns:1fr}.checkout__summary{position:static}.checkout__grid{grid-template-columns:1fr}.checkout label.full{grid-column:auto}}
  `}</style><div className="container-page"><Link className="checkout__back" href="/cart">← {copy.back}</Link><span className="block mt-5 font-mono text-[10px] uppercase tracking-[.16em] text-[#A94B2F]">{copy.eyebrow}</span><h1>{copy.title}</h1>{error && <p className="checkout__error" role="alert">{error}</p>}{!isHydrated ? <div className="checkout__empty"><p role="status">{copy.loading}</p></div> : items.length === 0 ? <div className="checkout__empty"><p>{copy.empty}</p><Link href="/shop">{copy.back}</Link></div> : <form onSubmit={submit} className="checkout__layout"><div className="checkout__form"><section className="checkout__section"><h2>{copy.contact}</h2><div className="checkout__grid"><Field name="fullName" label={copy.fullName} autoComplete="name" /><Field name="email" label={copy.email} type="email" autoComplete="email" /><Field name="phone" label={copy.phone} type="tel" autoComplete="tel" placeholder="+4791234567" /></div></section><section className="checkout__section"><h2>{copy.delivery}</h2><div className="checkout__grid"><Field name="addressLine1" label={copy.address1} autoComplete="address-line1" full /><Field name="addressLine2" label={copy.address2} autoComplete="address-line2" required={false} full /><Field name="postalCode" label={copy.postal} autoComplete="postal-code" /><Field name="city" label={copy.city} autoComplete="address-level2" /><Field name="countryCode" label={copy.country} autoComplete="country" defaultValue="NO" maxLength={2} /><label className="full">{copy.note}<textarea name="note" maxLength={1000} /></label></div></section></div><aside className="checkout__summary"><div className="checkout__summary-body"><h2>{copy.summary}</h2>{localized.map((line) => { const quantity = quantities.get(line.variantId) ?? 0; return <div className="checkout__line" key={line.variantId}><span className="checkout__price">{formatNok(line.priceOre * quantity, locale)}</span><strong>{quantity} × {line.productName}</strong><span className="checkout__meta">{localizeVariantName(line, locale)}</span></div>; })}<div className="checkout__total"><span>{copy.total}</span><span>{formatNok(totalOre, locale)}</span></div></div><button className="checkout__submit" type="submit" disabled={!canSubmit || busy}>{busy ? copy.submitting : copy.submit}</button></aside></form>}</div></main>;
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "required">;

function Field({ name, label, type = "text", required = true, full = false, ...props }: FieldProps) {
  return <label className={full ? "full" : undefined}>{label}<input name={name} type={type} required={required} {...props} /></label>;
}

function OrderConfirmation({ order }: { order: PublicOrderResult }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const qrPath = COMMERCE_CONFIG.vipps.officialQrPath;
  return <main className="confirm"><style>{`
    .confirm{background:#fdf1e5;color:#2e2018;min-height:72vh;padding:clamp(36px,7vw,80px) 0}.confirm__card{max-width:800px;margin:auto;border:2px solid #2e2018;background:#fff7ef;box-shadow:10px 10px 0 #dda83a}.confirm__head{background:#5c7148;color:#fff7ef;padding:26px}.confirm__head h1{font:800 clamp(32px,5vw,48px) var(--font-bitter);margin:8px 0}.confirm__status{display:inline-block;background:#dda83a;color:#2e2018;padding:7px 10px;font:700 10px var(--font-space-mono);text-transform:uppercase}.confirm__body{padding:26px;display:grid;gap:16px}.confirm__number{font:800 30px var(--font-bitter)}.confirm__total{font:800 28px var(--font-bitter)}.confirm__vipps{border:2px solid #2e2018;background:#f2e6d8;padding:20px}.confirm__vipps strong{font-size:24px}.confirm__qr{min-height:190px;border:2px dashed #6b5a4e;display:grid;place-items:center;text-align:center;padding:18px}.confirm__qr img{max-width:220px;height:auto}.confirm__body p{margin:0;line-height:1.6}
  `}</style><div className="container-page"><article className="confirm__card"><header className="confirm__head"><span className="confirm__status">{copy.status}</span><h1>{copy.created(order.orderNumber)}</h1></header><div className="confirm__body"><p className="confirm__number">{order.orderNumber}</p><p className="confirm__total">{copy.total}: {formatNok(order.totalOre, locale)}</p><div className="confirm__vipps"><p>{copy.openVipps(COMMERCE_CONFIG.vipps.number)}</p><p><strong>{COMMERCE_CONFIG.vipps.number}</strong> · {COMMERCE_CONFIG.vipps.merchantName}</p><p>{copy.reference(order.orderNumber)}</p></div><p>{copy.pending}</p><p>{copy.mobile}</p><div className="confirm__qr">{qrPath ? <Image src={qrPath} alt={`Vipps QR ${COMMERCE_CONFIG.vipps.number}`} width={260} height={260} unoptimized /> : <p>{copy.qrMissing}</p>}</div></div></article></div></main>;
}
