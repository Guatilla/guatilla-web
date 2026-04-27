"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  origin: string;
  notes: string;
  image: string;
  alt: string;
  featured?: boolean;
}

const products = [
  {
    id: "product_origin",
    slug: "origen",
    name: "Origen",
    origin: "Serranía del Perijá",
    notes: "Noter av kakao, panela og røde bær",
    image: "/assets/coffee_bag_1.png",
    alt: "Origen - Serranía del Perijá",
    featured: true,
  },
  {
    id: "product_mestizaje",
    slug: "mestizaje",
    name: "Mestizaje",
    origin: "Serranía del Perijá",
    notes: "Noter av karamell, mandel og sitrus",
    image: "/assets/coffee_bag_2.png",
    alt: "Mestizaje - Serranía del Perijá",
  },
  {
    id: "product_encuentro",
    slug: "encuentro",
    name: "Encuentro",
    origin: "Serranía del Perijá",
    notes: "Noter av honning, nøtter og krydder",
    image: "/assets/coffee_bag_3.png",
    alt: "Encuentro - Serranía del Perijá",
  },
  {
    id: "product_territorio",
    slug: "territorio",
    name: "Territorio",
    origin: "Serranía del Perijá",
    notes: "Noter av mørk sjokolade, kirsebær og florale toner",
    image: "/assets/coffee_bag_4.png",
    alt: "Territorio - Serranía del Perijá",
  }
];

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-brand-linen py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-coffee mb-4">
              Vår <em className="italic font-light">kaffe</em>
            </h2>
            <p className="text-lg md:text-xl text-brand-coffee/70 font-light">
              Hver blend forteller en historie fra Perijá
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full border border-brand-coffee/20 flex items-center justify-center text-brand-coffee hover:bg-brand-terracotta hover:border-brand-terracotta hover:text-white transition-colors duration-300"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full border border-brand-coffee/20 flex items-center justify-center text-brand-coffee hover:bg-brand-terracotta hover:border-brand-terracotta hover:text-white transition-colors duration-300"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-visible">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-visible snap-x snap-mandatory gap-6 md:gap-8 pt-10 pb-20 px-6 md:px-12 scroll-px-6 md:scroll-px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Spacer for proper alignment in max-w container */}
          {/* Left padding space managed by px-6 md:px-12 */}

          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/shop/${product.slug}`}
              className={`flex-none snap-center group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] rounded-2xl overflow-hidden border border-brand-coffee/15 bg-brand-cream shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] p-4 md:p-6 lg:p-8 ${
                product.featured 
                  ? "w-[85vw] md:w-[45vw] lg:w-[38vw]" 
                  : "w-[75vw] md:w-[32vw] lg:w-[26vw]"
              }`}
            >
              {/* Image Container */}
              <div 
                className={`relative w-full overflow-hidden rounded-2xl bg-brand-cream/50 mb-6 transition-all duration-500 ${
                  product.featured ? "aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                {product.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-brand-coffee text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    Utvalgt
                  </div>
                )}
                
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover grayscale opacity-90 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-heading font-bold text-brand-coffee transition-colors group-hover:text-brand-terracotta">
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-brand-coffee/60 uppercase tracking-widest">
                  {product.origin}
                </p>
                <p className="text-brand-coffee/70 font-light mt-2">
                  {product.notes}
                </p>
              </div>
            </Link>
          ))}

          {/* Right Spacer */}
          <div className="shrink-0 w-4 md:w-8" />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 flex justify-center px-4">
        <Link 
          href="/shop" 
          className="inline-flex items-center space-x-2 text-brand-coffee font-bold uppercase tracking-widest text-sm group hover:text-brand-terracotta transition-colors"
        >
          <span>Se alle produkter</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
