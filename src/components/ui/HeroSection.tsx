import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-linen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.png"
          alt="Colombian Coffee Farm"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-coffee/40 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
            Direkte handel med colombiansk kaffe til Europa
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-10 leading-relaxed">
            Fra colombianske gårder til Oslo — uten mellomledd, full åpenhet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="bg-brand-terracotta text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-brand-terracotta/90 transition-all text-center"
            >
              Handle kaffe
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white/20 transition-all text-center"
            >
              Om oss
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
