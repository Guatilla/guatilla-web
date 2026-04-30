import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import { Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Kontakt | Kaffe Guatilla",
  description: "Har du spørsmål eller ønsker å samarbeide? Ta kontakt med Kaffe Guatilla.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-brand-linen min-h-screen">

      {/* HERO */}
      <section className="relative py-32 md:py-48 bg-brand-coffee text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-terracotta/10 -skew-x-12 translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold max-w-3xl mx-auto leading-tight">
            Kontakt
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-white/70 leading-relaxed">
            Har du spørsmål, samarbeid eller interesse i å jobbe med oss? Vi hører gjerne fra deg.
          </p>
        </div>
      </section>

      {/* EMAIL SECTION */}
      <SectionContainer bgClass="bg-brand-linen -mt-12 md:-mt-20 relative z-20 pt-0 pb-32">
        <div className="max-w-2xl mx-auto rounded-3xl bg-brand-cream border border-brand-coffee/5 p-12 md:p-20 text-center space-y-12 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-coffee/10 flex items-center justify-center">
              <Mail size={28} className="text-brand-coffee" />
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-coffee/40">Email</p>
              <a
                href="mailto:kontakt@kaffeguatilla.com"
                className="text-2xl md:text-3xl font-heading font-bold text-brand-coffee hover:text-brand-terracotta transition-colors"
              >
                kontakt@kaffeguatilla.com
              </a>
            </div>
            <p className="text-sm text-brand-coffee/50 font-light">
              Vi svarer vanligvis innen 24–48 timer.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* BRAND CONTEXT */}
      <SectionContainer bgClass="bg-brand-linen py-32 border-t border-brand-coffee/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee">Om oss</h2>
          <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
            Kaffe Guatilla opererer mellom Colombia og Norge. Vi jobber direkte med produsenter i Serranía del Perijá for å bringe spesialkaffe av høyeste kvalitet til Europa.
          </p>
        </div>
      </SectionContainer>

      {/* WAITLIST CTA */}
      <SectionContainer bgClass="bg-brand-coffee text-white overflow-hidden relative py-32">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Følg reisen</h2>
          <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
            Meld deg på ventelisten og vær den første som får vite om lanseringen av vårt første parti.
          </p>
          <Link
            href="/project-progress"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-brand-coffee rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-terracotta hover:text-white transition-colors"
          >
            Meld deg på ventelisten <ArrowRight size={18} />
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
