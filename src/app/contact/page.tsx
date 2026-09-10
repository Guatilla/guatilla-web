import React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import Seam from "@/components/ui/Seam";

export const metadata = {
  title: "Kontakt | Kaffe Guatilla",
  description:
    "Har du spørsmål eller ønsker å samarbeide? Ta kontakt med Kaffe Guatilla.",
};

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

const CHANNELS = [
  { label: "Generelt", color: "bg-brand-forest" },
  { label: "Samarbeid", color: "bg-brand-gold" },
  { label: "Presse", color: "bg-brand-teal" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-linen" style={{ backgroundImage: NOISE_BG }}>
      {/* HERO */}
      <section className="container-page pb-10 pt-16 lg:pt-[72px]">
        <div className="stitch pop bg-brand-cream p-8 sm:p-12 lg:px-14 lg:py-[52px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-coffee/45">
            Kontakt &amp; samarbeid
          </span>
          <h1 className="mt-4 font-heading text-[52px] font-extrabold leading-[1] tracking-tight text-brand-coffee sm:text-[66px] lg:text-[78px]">
            Kontakt
          </h1>
          <p className="mt-6 max-w-[620px] font-heading text-[18px] font-normal italic leading-[1.5] text-brand-coffee/[0.66] lg:text-[21px]">
            Har du spørsmål, ønsker samarbeid eller vil jobbe med oss? Vi hører
            gjerne fra deg.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <span className="h-[11px] w-[11px] bg-brand-terracotta" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-coffee/60">
              Colombia
            </span>
            <span className="h-px w-[46px] bg-brand-coffee/25" />
            <span className="h-[11px] w-[11px] bg-brand-teal" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-coffee/60">
              Norge
            </span>
          </div>
        </div>
      </section>

      {/* EMAIL */}
      <section className="container-page pb-10 pt-12">
        <Seam label="Skriv til oss" />
        <div className="mt-10 flex flex-col items-start">
          <div className="stitch pop w-full max-w-[680px] -rotate-[0.4deg] bg-brand-cream px-8 py-10 sm:px-14 sm:py-11">
            <span className="stitch inline-flex h-[54px] w-[54px] items-center justify-center text-brand-terracotta">
              <Mail size={26} strokeWidth={1.7} />
            </span>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-coffee/45">
              E-post
            </p>
            <a
              href="mailto:kontakt@kaffeguatilla.com"
              className="mt-2.5 inline-block break-all font-heading text-[19px] font-extrabold tracking-tight text-brand-coffee transition-colors hover:text-brand-terracotta sm:text-[26px] lg:text-[30px]"
            >
              kontakt@kaffeguatilla.com
            </a>
            <p className="mt-3.5 text-[14px] font-light text-brand-coffee/60">
              Vi svarer vanligvis innen 24–48 timer.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {CHANNELS.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                <span className={`h-[10px] w-[10px] ${c.color}`} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-coffee/55">
                  {c.label}
                </span>
              </span>
            ))}
            <span className="text-[13px] font-light text-brand-coffee/70">
              — alt til samme adresse.
            </span>
          </div>
        </div>
      </section>

      {/* HVEM VI ER */}
      <section className="container-page pb-10 pt-12">
        <Seam label="Hvem vi er" />
        <div className="mt-14 max-w-[760px]">
          <h2 className="font-heading text-[30px] font-extrabold leading-[1.08] tracking-tight text-brand-coffee sm:text-[38px]">
            Mellom Colombia og Norge
          </h2>
          <p className="mt-4 text-[15.5px] font-light leading-[1.85] text-brand-coffee/70">
            Kaffe Guatilla opererer mellom Colombia og Norge. Vi jobber direkte med
            produsenter i Serranía del Perijá for å bringe spesialkaffe av høyeste
            kvalitet til Europa.
          </p>
          <Link
            href="/about"
            className="mt-[18px] inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
          >
            Les vår historie <ArrowRight size={13} strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-14 pt-12">
        <div className="stitch-light pop flex flex-col items-start justify-between gap-8 bg-brand-forest px-8 py-11 text-brand-cream md:flex-row md:items-center md:gap-10 lg:px-[52px]">
          <div>
            <h2 className="font-heading text-[28px] font-extrabold leading-[1.1] tracking-tight text-brand-cream sm:text-[34px]">
              Følg reisen
            </h2>
            <p className="mt-3 max-w-[560px] text-[15px] font-light leading-[1.75] text-brand-cream/85">
              Vi dokumenterer arbeidet fra Serranía del Perijá — mennesker,
              prosesser og territorium — mens vi bygger det første partiet.
            </p>
          </div>
          <Link
            href="/journal"
            className="stitch-light inline-flex shrink-0 items-center gap-2.5 bg-brand-gold px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-coffee"
          >
            Les feltjournalen <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    </div>
  );
}
