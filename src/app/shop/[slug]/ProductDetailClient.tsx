"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Coffee, 
  ChevronRight, 
  Sprout, 
  Settings, 
  Sun, 
  Truck, 
  MapPin 
} from "lucide-react";
import { Product, products } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Get 3 related products (randomly for now, excluding current)
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const traceabilitySteps = [
    { 
      label: "Gård", 
      icon: Sprout, 
      description: "Små produsenter i Serranía del Perijá." 
    },
    { 
      label: "Prosess", 
      icon: Settings, 
      description: "Naturlig eller vasket behandling." 
    },
    { 
      label: "Tørking", 
      icon: Sun, 
      description: "Kontrollert tørking før videre behandling." 
    },
    { 
      label: "Eksport", 
      icon: Truck, 
      description: "Direkte handel med færre mellomledd." 
    },
    { 
      label: "Norge", 
      icon: MapPin, 
      description: "Importeres og klargjøres for markedet." 
    },
    { 
      label: "Kopp", 
      icon: Coffee, 
      description: "Et sporbar parti, klart til brygging." 
    },
  ];

  return (
    <div className="min-h-screen bg-brand-linen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs / Back button */}
        <div className="mb-12">
          <Link 
            href="/shop"
            className="inline-flex items-center space-x-2 text-brand-coffee/60 hover:text-brand-terracotta transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Tilbake til butikken</span>
          </Link>
        </div>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32">
          {/* Left: Image Container */}
          <div className="group rounded-2xl border border-brand-coffee/10 overflow-hidden bg-brand-cream shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] transition-all duration-500 ease-out hover:scale-[1.02]">
            <div className="relative aspect-square overflow-hidden bg-brand-linen/30">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                priority
              />
              <div className="absolute top-6 right-6 z-20 bg-brand-coffee/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                {product.roast}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col h-full pt-4">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-terracotta mb-4">
                {product.origin}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-coffee mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-brand-coffee/70 font-light leading-relaxed mb-8">
                {product.description}
              </p>
              <div className="text-3xl font-heading font-bold text-brand-coffee">
                {product.price}
              </div>
            </div>

            <div className="mt-auto space-y-6 pt-10 border-t border-brand-coffee/10">
              <button className="w-full bg-brand-coffee text-white py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-terracotta transition-colors shadow-lg shadow-brand-coffee/10 flex items-center justify-center space-x-3 group">
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                <span>Legg i handlekurv</span>
              </button>
              <p className="text-center text-xs text-brand-coffee/40 font-medium italic">
                * Fri frakt på bestillinger over 500 NOK
              </p>
            </div>
          </div>
        </div>

        {/* Coffee Details (Specifications) */}
        <div className="mb-32">
          <div className="max-w-3xl mx-auto bg-brand-cream/40 backdrop-blur-sm rounded-3xl p-10 md:p-16 border border-brand-coffee/5 shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-brand-coffee mb-10 text-center">Spesifikasjoner</h2>
            <div className="space-y-6">
              {[
                { label: "Opprinnelse", value: product.origin },
                { label: "Brenningsgrad", value: product.roast },
                { label: "Prosess", value: product.process },
                { label: "Høyde", value: product.altitude },
                { label: "Smaksnoter", value: product.notes },
                { label: "Vekt", value: product.weight },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center border-b border-brand-coffee/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-coffee/40">{spec.label}</span>
                  <span className="text-lg font-medium text-brand-coffee/80">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Origin Story */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee mb-8">Fra opprinnelsen</h2>
            <p className="text-lg text-brand-coffee/70 font-light leading-relaxed mb-6">
              Denne kaffen er resultatet av et nært samarbeid med produsenter i Serranía del Perijá. Her, i det unike mikroklimaet mellom Colombia og Venezuela, vokser kaffetrærne under ideelle forhold i skyggen av det rike naturmangfoldet.
            </p>
            <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
              Ved å kontrollere hele forsyningskjeden — fra trilling i Colombia til brenning i Europa — sikrer vi at historien til fjellet og håndverket til bonden forblir intakt i hver kopp.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-coffee/10 grayscale shadow-sm">
             <Image 
               src="/assets/perija-hero.jpg" 
               alt="Serranía del Perijá" 
               fill 
               className="object-cover opacity-80"
             />
          </div>
        </div>

        {/* Traceability */}
        <div className="mb-40 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee mb-4">Sporbarhet</h2>
            <p className="text-brand-coffee/60 font-light italic">Fra gårdene i Serranía del Perijá til koppen din.</p>
          </div>
          
          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-4 relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-10 left-12 right-12 h-px bg-brand-coffee/10 z-0" />
            
            {traceabilitySteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-brand-cream border border-brand-coffee/10 rounded-full flex items-center justify-center text-brand-coffee mb-6 shadow-sm transition-all duration-500 group-hover:bg-brand-coffee group-hover:text-white group-hover:scale-110 group-hover:border-brand-coffee">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>
                
                {/* Text Content */}
                <div className="space-y-2 max-w-[200px]">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-coffee">
                    {step.label}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-brand-coffee/60 font-light">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector Line */}
                {i < traceabilitySteps.length - 1 && (
                  <div className="md:hidden w-px h-10 bg-brand-coffee/10 my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-brand-coffee/10 pt-24">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee mb-12 text-center">Andre kaffer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <Link 
                key={p.id} 
                href={`/shop/${p.slug}`}
                className="group bg-brand-cream border border-brand-coffee/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen/30">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-brand-coffee/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {p.roast}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-brand-coffee mb-1 group-hover:text-brand-terracotta transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-coffee/40 mb-3">
                    {p.origin}
                  </p>
                  <p className="text-sm text-brand-coffee/70 font-light line-clamp-2 italic">
                    {p.notes}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
