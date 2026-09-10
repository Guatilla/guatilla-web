import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Vår Historie | Kaffe Guatilla",
  description:
    "Oppdag historien bak Kaffe Guatilla – fra de colombianske fjellene til kaffekulturen i Stavanger.",
};

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Seam({
  label,
  rotate,
}: {
  label: string;
  rotate: string;
}) {
  return (
    <div className="relative border-t-[2.5px] border-dashed border-[color:rgba(60,42,33,0.32)]">
      <span
        className="stitch pop-sm absolute -top-[26px] left-6 whitespace-nowrap bg-brand-cream px-6 py-[11px] font-heading text-[20px] font-bold tracking-[-0.015em] text-brand-coffee sm:text-[23px] lg:left-11"
        style={{ transform: `rotate(${rotate})` }}
      >
        {label}
      </span>
    </div>
  );
}

const BRIDGE: { color: string; label: string }[] = [
  { color: "bg-brand-terracotta", label: "Mellom territorier" },
  { color: "bg-brand-gold", label: "Mellom kulturer" },
  { color: "bg-brand-forest", label: "Mellom produsenten og din kopp" },
];

export default function AboutPage() {
  return (
    <div
      className="w-full bg-brand-linen"
      style={{ backgroundImage: NOISE_BG }}
    >
      <div className="container-page">
        {/* HERO */}
        <section className="pt-12 lg:pt-[72px]">
          <div className="stitch pop bg-brand-cream p-8 sm:p-12 lg:px-[58px] lg:py-[54px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-coffee/50">
              Vår historie
            </span>
            <h1 className="mt-5 font-heading text-[42px] font-extrabold leading-[1.04] tracking-[-0.025em] sm:text-[58px] lg:text-[78px]">
              Fra Perijá til
              <br />
              <span className="font-normal italic text-brand-terracotta">
                Stavanger.
              </span>
            </h1>
            <p className="mt-7 max-w-[640px] font-heading text-[17px] leading-[1.62] text-brand-coffee/70 lg:text-[20px]">
              Vår historie begynner i den majestetiske Serranía del Perijá i
              Colombia, men den finner sitt sanne hjem i Stavanger og den
              europeiske kaffekulturen.
            </p>
            <div className="mt-[30px] flex flex-wrap items-center gap-4">
              <span className="h-[11px] w-[11px] bg-brand-terracotta" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-coffee/60">
                Colombia
              </span>
              <span className="h-px w-[52px] bg-brand-coffee/25" />
              <span className="h-[11px] w-[11px] bg-brand-teal" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-coffee/60">
                Stavanger
              </span>
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="pt-10 pb-12 lg:pb-14">
          <div className="stitch pop relative h-[280px] w-full rotate-[0.7deg] overflow-hidden bg-brand-coffee sm:h-[360px] lg:h-[430px]">
            <Image
              src="/assets/perija-hero.jpg"
              alt="Serranía del Perijá"
              fill
              className="object-cover object-[center_40%]"
              sizes="100vw"
            />
          </div>
        </section>

        {/* NAVNET */}
        <section className="pb-10 pt-12">
          <Seam label="Navnet" rotate="-1.6deg" />
          <div className="mt-[60px] max-w-[820px]">
            <p className="font-heading text-[19px] leading-[1.58] text-brand-coffee lg:text-[22px]">
              Guatilla var et begrep brukt av urfolkssamfunnene i Serranía del
              Perijá for å referere til de utenfor deres fellesskap – et ord som
              en gang markerte avstand og ulikhet.
            </p>
            <p className="mt-[22px] text-[15.5px] leading-[1.9] text-brand-coffee/[0.74]">
              For oss betyr Guatilla ikke lenger splittelse, men forbindelse. Det
              er et møtepunkt mellom kulturer, en bro mellom opprinnelse og
              destinasjon.
            </p>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="pb-12 pt-10 lg:pb-14">
          <div className="stitch pop -rotate-[0.6deg] bg-brand-cream px-8 py-12 text-center lg:px-16 lg:py-14">
            <p className="mx-auto max-w-[900px] font-heading text-[26px] font-normal italic leading-[1.32] text-brand-coffee lg:text-[42px]">
              «I dag tolker vi dette navnet på nytt.»
            </p>
          </div>
        </section>

        {/* SYMBOLET */}
        <section className="pb-10 pt-12">
          <Seam label="Symbolet" rotate="1.4deg" />
          <div className="mt-[60px] grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-14">
            <div className="max-w-[620px]">
              <p className="text-[15.5px] leading-[1.9] text-brand-coffee/[0.74]">
                Symbolet til Guatilla ble unnfanget ved et utsiktspunkt høyt oppe
                i Serranía del Perijá. Det som startet som en visuell opplevelse
                av landskapet og fargene, har blitt retolket som en bro.
              </p>
              <div className="mt-[26px] flex flex-col">
                {BRIDGE.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-3.5 border-t border-brand-coffee/[0.14] py-[13px] last:border-b"
                  >
                    <span className={`h-3 w-3 shrink-0 ${b.color}`} />
                    <span className="text-[15px] text-brand-coffee/80">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[15.5px] leading-[1.9] text-brand-coffee/[0.74]">
                Den sirkulære formen representerer en fullstendig syklus – fra den
                colombianske jorden til Europa.
              </p>
            </div>
            <div className="stitch pop relative h-[380px] w-full -rotate-[1.5deg] overflow-hidden bg-brand-coffee lg:w-[340px]">
              <Image
                src="/assets/about-circle.jpg"
                alt="Guatilla sirkulær skulptur"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 340px"
              />
            </div>
          </div>
        </section>

        {/* ANSVARET */}
        <section className="pb-10 pt-12">
          <Seam label="Ansvaret" rotate="-1.2deg" />
          <div className="mt-[60px] max-w-[860px]">
            <p className="font-heading text-[19px] leading-[1.58] text-brand-coffee lg:text-[22px]">
              For oss er ikke kvalitet bare en teknisk poengsum; det er et løfte.
              Ved å samarbeide direkte med våre produsenter, sikrer vi rettferdige
              vilkår og bærekraftig utvikling for lokalsamfunnene i Colombia.
            </p>
            <div className="mt-[30px] grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="stitch bg-brand-cream px-7 py-[26px]">
                <span className="mb-3.5 block h-3.5 w-3.5 bg-brand-olive" />
                <h3 className="font-heading text-[18px] font-bold tracking-[-0.015em]">
                  Full åpenhet
                </h3>
                <p className="mt-2 text-[14px] leading-[1.9] text-brand-coffee/[0.74]">
                  Ærlighet i hvert eneste ledd av prosessen.
                </p>
              </div>
              <div className="stitch bg-brand-cream px-7 py-[26px]">
                <span className="mb-3.5 block h-3.5 w-3.5 bg-brand-gold" />
                <h3 className="font-heading text-[18px] font-bold tracking-[-0.015em]">
                  Direkte relasjoner
                </h3>
                <p className="mt-2 text-[14px] leading-[1.9] text-brand-coffee/[0.74]">
                  Langsiktig tillit bygget på felles vekst.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ETT SYSTEM */}
        <section className="pb-10 pt-12">
          <div className="stitch-light pop -rotate-[0.5deg] bg-brand-coffee px-8 py-14 text-center text-brand-cream lg:px-16 lg:py-[72px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Én identitet
            </span>
            <h2 className="mt-[18px] font-heading text-[32px] font-extrabold leading-[1.14] tracking-[-0.015em] text-brand-cream lg:text-[46px]">
              Ett system,
              <br />
              <span className="font-normal italic text-brand-gold">
                en felles historie.
              </span>
            </h2>
            <p className="mx-auto mt-[22px] max-w-[680px] text-[16px] leading-[1.85] text-brand-cream/80">
              Navnet, symbolet og kaffen er deler av den samme identiteten. Ved å
              forene meningen bak navnet med kraften i symbolet, skaper vi en
              opplevelse som starter i Perijá og fullføres i din hverdag.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-14 pt-12">
          <div className="stitch pop flex flex-col items-start justify-between gap-8 bg-brand-gold px-8 py-11 text-brand-coffee md:flex-row md:items-center md:gap-10 lg:px-[52px] lg:py-[44px]">
            <div>
              <h2 className="font-heading text-[28px] font-extrabold leading-[1.1] tracking-[-0.015em] lg:text-[36px]">
                Bli en del av{" "}
                <span className="font-normal italic">vår historie.</span>
              </h2>
              <p className="mt-2.5 text-[14px] text-brand-coffee/75">
                Utforsk partiene fra Perijá, eller ta kontakt med oss direkte.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3.5">
              <Link
                href="/shop"
                className="stitch inline-flex items-center gap-[9px] border-[color:rgba(60,42,33,0.35)] bg-brand-coffee px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-cream"
              >
                Utforsk kaffen
              </Link>
              <Link
                href="/contact"
                className="stitch inline-flex items-center gap-[9px] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-coffee"
              >
                Kontakt oss
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
