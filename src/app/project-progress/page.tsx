import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import ProgressCard from "@/components/ui/ProgressCard";
import TimelineProgress from "@/components/ui/TimelineProgress";
import { 
  Building2, 
  Users2, 
  Truck, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Prosjektfremdrift | Kaffe Guatilla",
  description: "Følg utviklingen av Kaffe Guatilla-prosjektet, og byggingen av en direkte forsyningskjede for kaffe mellom Colombia og Norge.",
};

export default function ProjectProgressPage() {
  return (
    <div className="flex flex-col w-full bg-brand-linen">
      {/* 1. HERO SECTION */}
      <section className="relative py-32 md:py-48 bg-brand-coffee text-white overflow-hidden">
        <div className="absolute inset-0 bg-vintage-pattern opacity-5 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-terracotta/10 -skew-x-12 translate-x-1/2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <span className="inline-block px-4 py-1.5 bg-brand-terracotta/20 border border-brand-terracotta/30 rounded-full text-brand-terracotta text-xs font-bold uppercase tracking-[0.2em]">
            Status: Under utvikling
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold max-w-4xl mx-auto leading-tight">
            Prosjektfremdrift
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto text-white/70 leading-relaxed">
            Vi utvikler det første partiet med KAFFE GUATILLA fra opprinnelse til Europa.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#timeline" className="btn-primary px-12 py-5 text-base">
              Se stadier
            </Link>
            <Link href="/origen" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:text-brand-terracotta transition-colors group">
              Utforsk opprinnelse <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT PROGRESS SUMMARY */}
      <SectionContainer bgClass="bg-brand-linen -mt-12 md:-mt-20 relative z-20 pt-0 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard 
            title="Valg av produsenter"
            description="Direkte kobling til gårder i Perijá."
            status="Pågående"
            icon={<Users2 size={24} />}
          />
          <ProgressCard 
            title="Utvikling av første parti"
            description="Definering av prosesser og innhøsting."
            status="Pågående"
            icon={<Building2 size={24} />}
          />
          <ProgressCard 
            title="Kvalitets- og profiltesting"
            description="Sensorisk og fysisk evaluering av kaffen."
            status="Pågående"
            icon={<ShieldCheck size={24} />}
          />
          <ProgressCard 
            title="Kaffeprosessering"
            description="Forberedelse for eksportstandard."
            status="Under forberedelse"
            icon={<Truck size={24} />}
          />
        </div>
      </SectionContainer>

      {/* 3. PRODUCT JOURNEY TIMELINE */}
      <SectionContainer id="timeline" bgClass="bg-brand-linen py-32 border-t border-brand-coffee/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Produktets reise</h2>
            <p className="text-brand-coffee/60 max-w-2xl mx-auto">Sporbarhet for det første partiet med KAFFE GUATILLA.</p>
          </div>
          
          <TimelineProgress items={[
            {
              title: "Valg av produsenter",
              description: "Direkte avtaler ved opprinnelsen.",
              status: "Pågående"
            },
            {
              title: "Utvikling av første parti",
              description: "Kontroll av innhøsting og fermentering.",
              status: "Pågående"
            },
            {
              title: "Kvalitets- og profiltesting",
              description: "Smaking og fysisk analyse.",
              status: "Pågående"
            },
            {
              title: "Kaffeprosessering",
              description: "Sortering og valg av bønner.",
              status: "Under forberedelse"
            },
            {
              title: "Eksportlogistikk",
              description: "Forberedelse av forsendelse.",
              status: "Under forberedelse"
            },
            {
              title: "Første import",
              description: "Transport til Norge.",
              status: "Kommer snart"
            },
            {
              title: "Forhåndssalg",
              description: "Offisiell lansering.",
              status: "Kommer snart"
            }
          ]} />
        </div>
      </SectionContainer>

      {/* 4. EVIDENCE SECTION */}
      <SectionContainer bgClass="bg-brand-coffee text-white overflow-hidden relative py-32">
        <div className="absolute top-0 left-0 w-full h-full bg-vintage-pattern opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading font-bold">Prosessfremdrift</h2>
            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
              Vi deler ekte fremgang i utviklingen av kaffen uten å eksponere sensitiv informasjon.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 text-left">
              <CheckCircle2 className="text-brand-terracotta mb-6" size={32} />
              <h3 className="text-2xl font-heading font-bold mb-4">Opprinnelse og gårder</h3>
              <p className="text-white/60 font-light leading-relaxed">Visuell dokumentasjon fra dyrkingsområdene.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 text-left">
              <CheckCircle2 className="text-brand-terracotta mb-6" size={32} />
              <h3 className="text-2xl font-heading font-bold mb-4">Testing og kvalitet</h3>
              <p className="text-white/60 font-light leading-relaxed">Resultater fra smaking og koppprofiler.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 text-left">
              <CheckCircle2 className="text-brand-terracotta mb-6" size={32} />
              <h3 className="text-2xl font-heading font-bold mb-4">Produktutvikling</h3>
              <p className="text-white/60 font-light leading-relaxed">Siste trinn i forberedelse og pakking.</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 5. CTA SECTION */}
      <SectionContainer bgClass="bg-brand-linen py-32">
        <div className="max-w-4xl mx-auto rounded-3xl bg-brand-cream border border-brand-coffee/5 p-12 md:p-20 text-center space-y-8 shadow-sm">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Bli med på ventelisten</h2>
          <p className="text-lg text-brand-coffee/60 max-w-2xl mx-auto font-light leading-relaxed">
            Bli den første som får vite om lanseringen av det første partiet med KAFFE GUATILLA.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/contacto" className="btn-primary px-16 py-5 text-base w-full sm:w-auto">
              Bli med
            </Link>
            <Link href="/origen" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
              Se opprinnelse <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
