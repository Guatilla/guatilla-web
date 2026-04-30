"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ShopClient() {
  const [roastFilter, setRoastFilter] = useState("Alle brenninger");
  const [originFilter, setOriginFilter] = useState("Alle opprinnelser");
  const [tasteFilter, setTasteFilter] = useState("Alle smaker");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchRoast = roastFilter === "Alle brenninger" || p.roast === roastFilter;
      const matchOrigin = originFilter === "Alle opprinnelser" || p.origin === originFilter;
      const matchTaste = tasteFilter === "Alle smaker" || p.smaksprofil.includes(tasteFilter);
      return matchRoast && matchOrigin && matchTaste;
    });
  }, [roastFilter, originFilter, tasteFilter]);

  return (
    <div className="min-h-screen bg-brand-linen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-brand-coffee mb-6">
            Våre <em className="italic font-light">kaffer</em>
          </h1>
          <p className="text-xl md:text-2xl text-brand-coffee/70 font-light max-w-2xl mx-auto leading-relaxed">
            Hver kopp forteller en historie fra Perijá — om jord, kultur og håndverk.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-brand-cream/40 backdrop-blur-md rounded-3xl p-10 md:p-14 mb-16 border border-brand-coffee/5 shadow-sm">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-coffee mb-12">
            Filtrer kaffe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-brand-coffee">Brenningsgrad</label>
              <select
                value={roastFilter}
                onChange={(e) => setRoastFilter(e.target.value)}
                className="w-full h-14 bg-brand-cream border border-brand-coffee/10 rounded-full px-6 text-base text-brand-coffee outline-none focus:border-brand-terracotta/40 transition-all appearance-none cursor-pointer hover:border-brand-coffee/20"
              >
                <option>Alle brenninger</option>
                <option>Lys</option>
                <option>Medium</option>
                <option>Medium-mørk</option>
                <option>Mørk</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-brand-coffee">Opprinnelse</label>
              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full h-14 bg-brand-cream border border-brand-coffee/10 rounded-full px-6 text-base text-brand-coffee outline-none focus:border-brand-terracotta/40 transition-all appearance-none cursor-pointer hover:border-brand-coffee/20"
              >
                <option>Alle opprinnelser</option>
                <option>Serranía del Perijá</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-brand-coffee">Smaksprofil</label>
              <select
                value={tasteFilter}
                onChange={(e) => setTasteFilter(e.target.value)}
                className="w-full h-14 bg-brand-cream border border-brand-coffee/10 rounded-full px-6 text-base text-brand-coffee outline-none focus:border-brand-terracotta/40 transition-all appearance-none cursor-pointer hover:border-brand-coffee/20"
              >
                <option>Alle smaker</option>
                <option>Kakao</option>
                <option>Karamell</option>
                <option>Honning</option>
                <option>Fruktig</option>
                <option>Floral</option>
                <option>Krydret</option>
              </select>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-8 px-2">
          <p className="text-sm font-medium text-brand-coffee/50">
            Viser {filteredProducts.length} {filteredProducts.length === 1 ? "kaffe" : "kaffer"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-brand-cream border border-brand-coffee/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] flex flex-col md:flex-row h-full"
            >
              <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden bg-brand-linen/30 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 z-20 bg-brand-coffee/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                  {product.roast}
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                <div>
                  <div className="mb-6">
                    <h3 className="text-3xl font-heading font-bold text-brand-coffee mb-1 group-hover:text-brand-terracotta transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-coffee/40">
                      {product.origin}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-brand-coffee/5 pb-2">
                      <span className="text-xs font-medium text-brand-coffee/40 uppercase tracking-wider">Høyde:</span>
                      <span className="text-sm font-bold text-brand-coffee/80">{product.altitude}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-coffee/5 pb-2">
                      <span className="text-xs font-medium text-brand-coffee/40 uppercase tracking-wider">Prosess:</span>
                      <span className="text-sm font-bold text-brand-coffee/80">{product.process}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs font-medium text-brand-coffee/40 uppercase tracking-wider">Noter:</span>
                      <span className="text-sm font-light text-brand-coffee/70 italic">{product.notes}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/shop/${product.slug}`}
                  className="inline-flex items-center space-x-2 text-brand-coffee font-bold uppercase tracking-widest text-xs group/btn hover:text-brand-terracotta transition-colors pt-4"
                >
                  <span>Utforsk kaffen</span>
                  <div className="w-8 h-px bg-brand-coffee group-hover/btn:bg-brand-terracotta group-hover/btn:w-12 transition-all duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-brand-coffee/10 rounded-3xl">
            <p className="text-xl text-brand-coffee/40 font-light italic">
              Ingen kaffe matcher filtrene dine. Prøv en annen kombinasjon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
