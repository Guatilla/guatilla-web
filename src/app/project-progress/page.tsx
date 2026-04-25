import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import ProgressCard from "@/components/ui/ProgressCard";
import MilestoneItem from "@/components/ui/MilestoneItem";
import TimelineProgress from "@/components/ui/TimelineProgress";
import { 
  Building2, 
  Globe2, 
  Users2, 
  Truck, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Flag,
} from "lucide-react";

export const metadata = {
  title: "Project Progress | KAFFE GUATILLA",
  description: "Track the development of Guatilla AS and the KAFFE GUATILLA project, building a direct coffee supply chain between Colombia and Norway.",
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
            Company Status: Active & Building
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold max-w-4xl mx-auto leading-tight">
            Building a transparent coffee bridge between Colombia and Norway
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto text-white/70 leading-relaxed">
            Follow the progress of Guatilla AS as we build a direct-trade specialty coffee operation with legal structure, producer partnerships, processing capacity, and export readiness.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#timeline" className="btn-primary px-12 py-5 text-base">
              View Milestones
            </Link>
            <Link href="/origen" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:text-brand-terracotta transition-colors group">
              Explore Origin <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CURRENT STATUS SUMMARY */}
      <SectionContainer bgClass="bg-brand-linen -mt-12 md:-mt-20 relative z-20 pt-0 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard 
            title="Guatilla AS Legally Registered"
            description="Established as a Norwegian private limited company (Aksjeselskap) to handle all European operations."
            status="Completed"
            icon={<Building2 size={24} />}
          />
          <ProgressCard 
            title="KAFFE GUATILLA Trademark"
            description="Brand identity and name legally protected and registered for the European market."
            status="Completed"
            icon={<ShieldCheck size={24} />}
          />
          <ProgressCard 
            title="Supplier Network"
            description="Developing direct relationships with producers in the Serranía del Perijá, Colombia."
            status="In Progress"
            icon={<Users2 size={24} />}
          />
          <ProgressCard 
            title="Export Infrastructure"
            description="Organizing export logistics and processing capacity with local Colombian partners."
            status="In Progress"
            icon={<Truck size={24} />}
          />
        </div>
      </SectionContainer>

      {/* 3 & 4. REGIONAL PROGRESS */}
      <SectionContainer bgClass="bg-brand-cream border-y border-brand-coffee/5 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Norway Progress */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                 <Flag className="text-blue-600" size={24} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-brand-coffee">Norway: Legal and Commercial Foundation</h2>
            </div>
            <div className="grid gap-4">
              <MilestoneItem title="Guatilla AS registered in Norway" status="Completed" />
              <MilestoneItem title="Corporate bank account opened" status="Completed" />
              <MilestoneItem title="Initial share capital completed" status="Completed" />
              <MilestoneItem title="KAFFE GUATILLA trademark registered" status="Completed" />
              <MilestoneItem title="Relationship with FNC in progress" status="In Progress" />
            </div>
          </div>

          {/* Colombia Progress */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-terracotta/10 rounded-xl flex items-center justify-center">
                 <Globe2 className="text-brand-terracotta" size={24} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-brand-coffee">Colombia: Origin, Processing and Export Network</h2>
            </div>
            <div className="grid gap-4">
              <MilestoneItem title="Direct producer and partner network" status="Completed" />
              <MilestoneItem title="Main export partner identified" status="Completed" />
              <MilestoneItem title="Additional export partners in registration" status="In Progress" />
              <MilestoneItem title="Trilladora infrastructure in development" status="In Progress" />
              <MilestoneItem title="Export logistics being organized" status="In Progress" />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 5. TIMELINE SECTION */}
      <SectionContainer id="timeline" bgClass="bg-brand-linen py-32">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Project Timeline</h2>
            <p className="text-brand-coffee/60 max-w-2xl mx-auto">The journey of building Guatilla AS, from the first legal document to the first coffee import.</p>
          </div>
          
          <TimelineProgress items={[
            {
              title: "Company registration",
              description: "Official registration of Guatilla AS in the Norwegian Brønnøysund Register Centre.",
              status: "Completed"
            },
            {
              title: "Trademark registration",
              description: "Legal protection of the KAFFE GUATILLA brand and identity across target markets.",
              status: "Completed"
            },
            {
              title: "Banking and capital setup",
              description: "Opening of corporate accounts and full payment of required share capital.",
              status: "Completed"
            },
            {
              title: "FNC client process",
              description: "Registration and certification process with the National Federation of Coffee Growers of Colombia.",
              status: "In Progress"
            },
            {
              title: "Supplier network development",
              description: "Finalizing direct trade agreements with producers in the Perijá region.",
              status: "In Progress"
            },
            {
              title: "Trilladora setup",
              description: "Securing and preparing the processing facility for export-ready coffee.",
              status: "In Progress"
            },
            {
              title: "Export logistics",
              description: "Organizing the shipping and customs bridge between Colombia and Europe.",
              status: "Upcoming"
            },
            {
              title: "First import to Norway",
              description: "Arrival of the first batch of KAFFE GUATILLA specialty coffee in Norway.",
              status: "Upcoming"
            }
          ]} />
        </div>
      </SectionContainer>

      {/* 6. TRANSPARENCY STATEMENT */}
      <SectionContainer bgClass="bg-brand-coffee text-white overflow-hidden relative py-32">
        <div className="absolute top-0 left-0 w-full h-full bg-vintage-pattern opacity-5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <CheckCircle2 className="text-brand-terracotta" size={32} />
          </div>
          <h2 className="text-4xl font-heading font-bold">Why we share our progress</h2>
          <p className="text-xl text-white/70 font-light leading-relaxed">
            We believe trust begins before the first cup. By sharing our progress, we show the real work behind every bag of coffee: legal structure, origin relationships, processing, logistics, and accountability.
          </p>
        </div>
      </SectionContainer>

      {/* 7. FINAL CTA */}
      <SectionContainer bgClass="bg-brand-linen py-32">
        <div className="max-w-4xl mx-auto rounded-3xl bg-brand-cream border border-brand-coffee/5 p-12 md:p-20 text-center space-y-8 shadow-sm">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Follow the journey from origin to Europe</h2>
          <p className="text-lg text-brand-coffee/60 max-w-2xl mx-auto font-light leading-relaxed">
            As we continue to build our supply chain, we invite you to learn more about our roots and the people who make this project possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/origen" className="btn-primary px-12 py-5 text-base w-full sm:w-auto">
              Explore Origin
            </Link>
            <Link href="/contact" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
