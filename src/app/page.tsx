import Image from "next/image";
import Link from "next/link";
import DirectTrade from "@/components/sections/DirectTrade";
import SeasonalClosing from "@/components/sections/SeasonalClosing";

export const metadata = {
  title: "Kaffe Guatilla | Fra våre egne fjell i Colombia til din kopp i Norge",
  description:
    "Spesialkaffe dyrket av oss i Serranía del Perijá og håndristet i små partier i Stavanger. Null mellomledd, 100 % direkte sporbarhet.",
};

const PILLARS = [
  {
    n: "01",
    tone: "bg-brand-terracotta text-brand-cream",
    title: "Dyrket av oss",
    body: "Vi kjøper ikke anonyme lot. Vi steller hvert kaffetre på våre egne fincas i Agustín Codazzi, mellom 1 400 og 2 000 moh.",
  },
  {
    n: "02",
    tone: "bg-brand-gold text-brand-coffee",
    title: "Nordisk presisjonsbrenning",
    body: "Vi rister lokalt i Stavanger i mikropartier, med lyse og mellomlyse kurver som løfter den naturlige sødmen og de florale tonene.",
  },
  {
    n: "03",
    tone: "bg-brand-forest text-brand-cream",
    title: "Garantert ferskhet",
    body: "Vi rister og pakker på bestilling, så bønnen når deg i sitt beste avgassings­vindu.",
  },
];

const CATALOG = [
  {
    tag: "Klassiker",
    tagTone: "bg-brand-gold text-brand-coffee",
    name: "Guatilla Signature",
    variant: "Vasket Excelso",
    notes: "Mørk sjokolade, panela, rund kropp og en lys, tydelig sitrussyre.",
    origin: "Agustín Codazzi, Cesar · 100 % Arabica",
    price: "Fra 189 NOK",
    cta: "Kjøp Signature",
    href: "/shop/origen",
  },
  {
    tag: "Begrenset · micro-parti",
    tagTone: "bg-brand-olive text-brand-cream",
    name: "Serranía Microlot",
    variant: "Rosa Bourbon",
    notes: "Jasmin, kaffeblomst, modne røde bær og en silkeaktig, langvarig sødme.",
    origin: "Familiegård · nummerert lot",
    price: "Fra 215 NOK",
    cta: "Kjøp microlot",
    href: "/shop/heritage",
  },
  {
    tag: "Gave",
    tagTone: "bg-brand-vichy text-brand-cream",
    name: "Smakspakke",
    variant: "2–3 varianter",
    notes: "Et sett for å oppdage de ulike tonene fra Perijá hjemme — i grov eller fin maling.",
    origin: "Gave · smaksreise",
    price: "Sett sammen selv",
    cta: "Se pakker",
    href: "/shop",
  },
];

const BTN_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coffee";

export default function Home() {
  return (
    <div className="bg-brand-linen">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-brand-linen">
        <div className="container-page pb-12 pt-16 lg:pb-14 lg:pt-[72px]">
          <div className="grid gap-8 min-[880px]:grid-cols-[1.12fr_0.88fr] min-[880px]:gap-10">
            {/* left column */}
            <div className="flex flex-col">
              <span className="self-start bg-brand-gold px-3.5 py-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-coffee">
                Dyrket av oss · Ristet i Stavanger
              </span>
              <h1 className="mt-6 font-heading text-[38px] font-extrabold leading-[0.98] tracking-[-0.035em] text-brand-coffee [text-wrap:balance] min-[560px]:text-[48px] min-[900px]:text-[56px] min-[1100px]:text-[68px]">
                Fra våre{" "}
                <span className="inline-block -rotate-[1.2deg] bg-brand-terracotta-dark px-3 pb-1 italic text-brand-cream">
                  egne
                </span>{" "}
                fjell i Colombia til din kopp i Norge
              </h1>
              <p className="mt-6 max-w-[46ch] font-sans text-[16px] leading-[1.6] text-brand-coffee/[0.78] min-[900px]:text-[17px]">
                Spesialkaffe dyrket av oss i Serranía del Perijá og håndristet i
                små partier i Stavanger. Null mellomledd — 100 % direkte
                sporbarhet.
              </p>
              <div className="min-[880px]:flex-1" />
              <div className="mt-8 flex flex-col self-start border-2 border-brand-coffee min-[480px]:flex-row lg:mt-10">
                <Link
                  href="/shop"
                  className={`bg-brand-coffee px-7 py-[18px] text-center font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-cream transition-colors hover:bg-brand-coffee/90 ${BTN_FOCUS}`}
                >
                  Utforsk kaffen vår
                </Link>
                <Link
                  href="/kaffe"
                  className={`border-t-2 border-brand-coffee bg-brand-linen px-7 py-[18px] text-center font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-coffee transition-colors hover:bg-brand-cream min-[480px]:border-l-2 min-[480px]:border-t-0 ${BTN_FOCUS}`}
                >
                  Slik jobber vi →
                </Link>
              </div>
            </div>

            {/* right column — two-patch stack, ink seam */}
            <div className="flex flex-col gap-[2px] border-2 border-brand-coffee bg-brand-coffee">
              <div className="relative min-h-[260px] flex-1 overflow-hidden min-[880px]:min-h-[330px]">
                <Image
                  src="/assets/hero-coffee.jpg"
                  alt="Grønne kaffesekker, Serranía del Perijá"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 880px) 100vw, 40vw"
                />
              </div>
              <div className="bg-brand-olive px-6 py-[22px] text-brand-cream">
                <p className="font-heading text-[26px] font-extrabold italic leading-none">
                  Egne fincas
                </p>
                <p className="mt-1.5 font-sans text-[13.5px] leading-[1.45]">
                  Agustín Codazzi · 1 400–2 000 moh · 100 % Arabica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────── */}
      <section className="container-page pb-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta">
          Slik gjør vi det
        </span>
        <h2 className="mt-2 max-w-[18ch] font-heading text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[44px]">
          Fra frø til kopp — uten mellomledd
        </h2>

        <div className="mt-7 flex flex-col gap-[2px] border-2 border-brand-coffee bg-brand-coffee min-[760px]:flex-row">
          {PILLARS.map((p) => (
            <div key={p.n} className="flex flex-1 flex-col bg-brand-cream p-7 lg:p-8">
              <span
                className={`inline-flex w-fit items-center px-2.5 py-1.5 font-heading text-[15px] font-extrabold italic leading-none ${p.tone}`}
              >
                {p.n}
              </span>
              <h3 className="mt-4 font-heading text-[21px] font-extrabold leading-[1.15] text-brand-coffee">
                {p.title}
              </h3>
              <p className="mt-2.5 font-sans text-[14px] leading-[1.6] text-brand-coffee/[0.75]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATALOG ──────────────────────────────────────── */}
      <section className="container-page pb-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta">
              Kolleksjonen
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl lg:text-[44px]">
              Utvalgte partier
            </h2>
          </div>
          <Link
            href="/shop"
            className={`border-2 border-brand-coffee bg-brand-cream px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-coffee transition-colors hover:bg-brand-linen ${BTN_FOCUS}`}
          >
            Se hele butikken →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOG.map((c) => (
            <article
              key={c.name}
              className="flex flex-col border-2 border-brand-coffee bg-brand-cream"
            >
              <span
                className={`px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] ${c.tagTone}`}
              >
                {c.tag}
              </span>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-[26px] font-extrabold leading-none text-brand-coffee">
                  {c.name}
                </h3>
                <p className="mt-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-coffee/55">
                  {c.variant}
                </p>
                <p className="mt-3.5 font-sans text-[14px] leading-[1.6] text-brand-coffee/[0.78]">
                  {c.notes}
                </p>
                <p className="mt-2.5 font-sans text-[12.5px] leading-[1.5] text-brand-coffee/55">
                  {c.origin}
                </p>
                <div className="flex-1" />
                <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-brand-coffee pt-4">
                  <span className="font-heading text-[16px] font-extrabold text-brand-coffee">
                    {c.price}
                  </span>
                  <Link
                    href={c.href}
                    className={`bg-brand-coffee px-4 py-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-cream transition-colors hover:bg-brand-coffee/90 ${BTN_FOCUS}`}
                  >
                    {c.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── DIRECT TRADE ─────────────────────────────────── */}
      <DirectTrade />

      {/* ── SEASONAL CLOSING ─────────────────────────────── */}
      <SeasonalClosing />
    </div>
  );
}
